import React, { ReactElement, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNodeId, useUpdateNodeInternals } from 'reactflow';
import { useFlowState } from '#hooks';

interface AccordionProps {
  children: [ReactElement, ReactElement];
  handlePosition: 'left' | 'right';
}

export const Accordion: React.FC<AccordionProps> = ({ children, handlePosition }) => {
  const id = useNodeId();
  const [closedContent, openContent] = children;
  const updateNodeInternals = useUpdateNodeInternals();
  const [, setState] = useFlowState<{ open: boolean }>({ initialValue: { open: false } });

  return (
    <Disclosure as='div'>
      {({ open }) => {
        useEffect(() => {
          if (open) {
            updateNodeInternals(id as string);
          }

          setState({ open });
        }, [open]);

        return (
          <>
            <div className={`flex ${handlePosition === 'right' ? 'justify-end' : 'justify-start'} ${open ? 'items-start' : 'items-center'}`}>
              {handlePosition === 'right' && (
                <Disclosure.Button className={`rounded bg-transparent pr-1 text-xs font-bold ${open ? 'pt-0.5' : ''}`}>
                  {open ? <FaChevronUp /> : <FaChevronDown />}
                </Disclosure.Button>
              )}
              <div className={`transition-all duration-300 ${open ? 'block' : 'hidden'}`}>{openContent}</div>
              <div className={`transition-all duration-300 ${open ? 'hidden' : 'block'}`}>{closedContent}</div>
              {handlePosition === 'left' && (
                <Disclosure.Button className={`rounded bg-transparent pl-1 text-xs font-bold ${open ? 'pt-0.5' : ''}`}>
                  {open ? <FaChevronUp /> : <FaChevronDown />}
                </Disclosure.Button>
              )}
            </div>
          </>
        );
      }}
    </Disclosure>
  );
};
