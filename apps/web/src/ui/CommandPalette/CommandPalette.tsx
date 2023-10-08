// CommandPalette.tsx
import { Combobox, Dialog, Transition } from '@headlessui/react';
import Fuse from 'fuse.js'; // Import Fuse
import { FC, Fragment, useEffect, useState, useContext } from 'react';
import { FaFrown, FaSearch } from 'react-icons/fa';
import { CommandPaletteContext } from './CommandPaletteContext';

export interface PaletteItem {
  id: string;
  name: string;
  category: string;
  onItemClick: () => void;
}

interface CommandPaletteProps {
  items: PaletteItem[];
  loading?: boolean;
  error?: string | undefined;
  placeholder?: string;
  onClearError?: () => void;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const highlightMatches = (name: string, matches: Fuse.FuseResultMatch[] | undefined) => {
  if (!matches) {
    return name;
  }
  let highlightedName = '';
  let currentIndex = 0;
  matches.forEach((match) => {
    match.indices.forEach(([start, end]) => {
      highlightedName += name.slice(currentIndex, start);
      highlightedName += `<b>${name.slice(start, end + 1)}</b>`;
      currentIndex = end + 1;
    });
  });
  highlightedName += name.slice(currentIndex);
  return highlightedName;
};

export const CommandPalette: FC<CommandPaletteProps> = ({ items, loading, error, placeholder = 'Search...', onClearError }) => {
  const [query, setQuery] = useState('');
  const { isOpen, closePalette } = useContext(CommandPaletteContext);
  const [filteredItems, setFilteredItems] = useState<(PaletteItem & { matches?: Fuse.FuseResultMatch[] })[]>([]);

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(items, { keys: ['name'], includeMatches: true });
      setFilteredItems(
        fuse.search(query).map((result) => ({
          ...result.item,
          matches: result.matches ? result.matches.slice() : undefined,
        })),
      );
    } else {
      setFilteredItems(items.map((item) => ({ ...item, matches: undefined })));
    }
  }, [query, items]);

  const groups = filteredItems.reduce<Record<string, (PaletteItem & { matches?: Fuse.FuseResultMatch[] })[]>>((groups, item) => {
    return { ...groups, [item.category]: [...(groups[item.category] || []), item] };
  }, {});

  return (
    <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')} appear>
      <Dialog as='div' className='relative z-10' onClose={closePalette} static>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all'>
              <Combobox>
                <div className='relative'>
                  <FaSearch
                    className='pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400'
                    aria-label='Search icon' // Accessibility improvement
                  />
                  <Combobox.Input
                    className='input h-12 w-full rounded-b-none border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm'
                    placeholder={placeholder}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label='Search' // Accessibility improvement
                  />
                </div>

                {loading && (
                  <div className='border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14'>
                    <div className='loader mx-auto'></div>
                    <p className='mt-4 font-semibold text-gray-900'>Loading...</p>
                  </div>
                )}

                {error && (
                  <div className='border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14'>
                    <p className='mt-4 font-semibold text-gray-900'>Error: {error}</p>
                    <button className='mt-4 text-indigo-600 hover:text-indigo-900' onClick={onClearError}>
                      Clear Error
                    </button>
                  </div>
                )}

                {!loading && !error && (
                  <Combobox.Options static className='max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2'>
                    {Object.entries(groups).map(([category, items]) => (
                      <li key={category}>
                        <h2 className='bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900' id={category}>
                          {category}
                        </h2>
                        <ul className='mt-2 text-sm text-gray-800' aria-labelledby={category}>
                          {items.map((item: PaletteItem & { matches?: Fuse.FuseResultMatch[] }) => (
                            <Combobox.Option
                              key={item.id}
                              value={item}
                              className={({ active }) => classNames('cursor-pointer select-none px-4 py-2', active ? 'bg-indigo-600 text-white' : '')}
                              onClick={item.onItemClick}
                            >
                              <span dangerouslySetInnerHTML={{ __html: highlightMatches(item.name, item.matches) }} />
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' && filteredItems.length === 0 && (
                  <div className='border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14'>
                    <FaFrown className='mx-auto h-6 w-6 text-gray-400' aria-hidden='true' />
                    <p className='mt-4 font-semibold text-gray-900'>No results found</p>
                    <p className='mt-2 text-gray-500'>We couldn’t find anything with that term. Please try again.</p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
