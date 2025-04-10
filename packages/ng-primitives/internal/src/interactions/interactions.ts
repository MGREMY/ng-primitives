/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { signal, Signal } from '@angular/core';
import { setupFocusVisible } from './focus-visible';
import { setupHover } from './hover';
import { setupPress } from './press';

export interface NgpInteractionOptions {
  disabled?: Signal<boolean>;
}

/**
 * Setup the interactions without relying on HostDirectives.
 */
export function setupInteractions({ disabled = signal(false) }: NgpInteractionOptions): void {
  setupHover({ disabled });
  setupPress({ disabled });
  setupFocusVisible({ disabled });
}
