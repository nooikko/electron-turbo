import { taxonomy, IOKey } from 'taxonomy/io';

export const useTaxonomyColor = (type: IOKey) => {
  return taxonomy[type].colors;
};
