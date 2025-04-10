/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InjectionToken, inject, Type, ExistingProvider } from '@angular/core';
import type { NgpMenu } from './menu';

export const NgpMenuToken = new InjectionToken<NgpMenu>('NgpMenuToken');

/**
 * Inject the Menu directive instance
 */
export function injectMenu(): NgpMenu {
  return inject(NgpMenuToken);
}

/**
 * Provide the Menu directive instance
 */
export function provideMenu(type: Type<NgpMenu>): ExistingProvider {
  return { provide: NgpMenuToken, useExisting: type };
}
