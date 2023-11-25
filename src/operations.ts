import { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { array } from './operations/array';
import { boolean } from './operations/boolean';
import { comparison } from './operations/comparison';
import { conditional } from './operations/conditional';
import { string } from './operations/string';

export const operations: Operations = {
  ...arithmetic,
  ...array,
  ...boolean,
  ...comparison,
  ...conditional,
  ...string,
};
