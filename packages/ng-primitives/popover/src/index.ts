/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { NgpPopoverConfig, providePopoverConfig } from './config/popover-config';
export { NgpPopoverTrigger } from './popover-trigger/popover-trigger';
export {
  injectPopoverTriggerState,
  providePopoverTriggerState,
} from './popover-trigger/popover-trigger-state';
export {
  injectPopoverTrigger,
  NgpPopoverTriggerToken,
  providePopoverTrigger,
} from './popover-trigger/popover-trigger-token';
export { NgpPopover } from './popover/popover';
export { injectPopover, NgpPopoverToken } from './popover/popover-token';
export { getTransformOrigin } from './utils/transform-origin';
