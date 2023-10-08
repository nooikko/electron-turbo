import React, { useRef } from 'react';
import { NodeCard } from '#ui/NodeCard';
import { NodeHeader } from '#ui/NodeHeader';
import { v4 as uuid } from 'uuid';
import { AiOutlineUpload } from 'react-icons/ai';
import { useFlowState, useTaxonomyColor } from '#hooks';
import { Handle } from '#components/Handle';
import { IOType } from '#taxonomy';

interface ImageNodeProps {}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const ImageNode: React.FC<ImageNodeProps> = ({}) => {
  const id = useRef(uuid());
  const [, setFlowFile] = useFlowState<string | null>(null);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const base64File = await fileToBase64(event.target.files[0]);
      setFlowFile(base64File);
    }
  };

  return (
    <NodeCard>
      <NodeHeader className={useTaxonomyColor(IOType.Screenshot)?.class}>Screenshot</NodeHeader>
      <div className='p-1.5 pr-2.5'>
        <label
          htmlFor={id?.current}
          className='dark:hover:bg-bray-800 flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
        >
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            <AiOutlineUpload className='h-8 w-8 text-gray-400' />
            <p className='text-xs text-gray-500 dark:text-gray-400'>JPG or PNG</p>
          </div>
          <input type='file' id={id?.current} className='hidden' onChange={onImageChange} />
        </label>
        <Handle io={IOType.Screenshot} type='source' position='right' />
      </div>
    </NodeCard>
  );
};
