import type { Operations } from './index';

import { arithmetic } from './operations/arithmetic';

export const operations: Operations = {
  ...arithmetic,
};
