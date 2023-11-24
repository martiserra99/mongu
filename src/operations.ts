import type { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { boolean } from './operations/boolean';
import { comparison } from './operations/comparison';
import { string } from './operations/string';

export const operations: Operations = {
  ...arithmetic,
  ...boolean,
  ...comparison,
  ...string,
};
