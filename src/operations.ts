import type { Operations } from './index';

import { arithmetic } from './operations/arithmetic';
import { boolean } from './operations/boolean';

export const operations: Operations = {
  ...arithmetic,
  ...boolean,
};
