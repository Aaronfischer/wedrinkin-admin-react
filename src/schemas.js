import { schema } from 'normalizr';

export const drinkSchema = new schema.Entity(
  'drinks',
  {},
  { idAttribute: '_id' }
);
