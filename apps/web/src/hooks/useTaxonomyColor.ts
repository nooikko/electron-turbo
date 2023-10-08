import { taxonomy, IOType } from '#taxonomy';

export const useTaxonomyColor = (type: IOType) => {
  return taxonomy[type].colors;
};
