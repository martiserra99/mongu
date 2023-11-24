import { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { boolean } from './operations/boolean';
import { comparison } from './operations/comparison';
import { conditional } from './operations/conditional';
import { string } from './operations/string';

export const operations: Operations = {
  ...arithmetic,
  ...boolean,
  ...comparison,
  ...conditional,
  ...string,
};
