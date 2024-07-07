import { type Logger, Slot } from '@maxiee/block_global/utils';
import { isEqual } from '@maxiee/block_global/utils';
import type { Doc } from 'yjs';
import {
  applyUpdate,
  encodeStateAsUpdate,
  encodeStateVector,
  mergeUpdates,
} from 'yjs';

import {
  PriorityAsyncQueue,
  SharedPriorityTarget,
} from '../utils/async-queue.js';
import { MANUALLY_STOP, throwIfAborted } from '../utils/throw-if-aborted.js';
import { DocPeerStep } from './consts.js';
import type { DocSource } from './source.js';


