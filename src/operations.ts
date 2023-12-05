import { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { array } from './operations/array';
import { boolean } from './operations/boolean';
import { comparison } from './operations/comparison';
import { conditional } from './operations/conditional';
import { object } from './operations/object';
import { string } from './operations/string';
import { type } from './operations/type';
import { variable } from './operations/variable';

export const operations: Operations = {
  ...arithmetic,
  ...array,
  ...boolean,
  ...comparison,
  ...conditional,
  ...object,
  ...string,
  ...type,
  ...variable,
};
