import type { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { boolean } from './operations/boolean';
import { comparison } from './operations/comparison';

export const operations: Operations = {
  ...arithmetic,
  ...boolean,
  ...comparison,
};
