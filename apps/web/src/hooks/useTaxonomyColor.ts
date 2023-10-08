import { taxonomy, IOKey } from '#taxonomy';

export const useTaxonomyColor = (type: IOKey) => {
  return taxonomy[type].colors;
};
