import { screenshot } from './Screenshot';

interface Buttons {
  [key: string]: {
    [key: string]: JSX.Element;
  };
}

export const buttons: Buttons = {
  screenshot,
};
