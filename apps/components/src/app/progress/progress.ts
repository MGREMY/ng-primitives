import { Component } from '@angular/core';
import { injectProgressState, NgpProgress, NgpProgressIndicator } from 'ng-primitives/progress';

@Component({
  selector: 'app-progress',
  hostDirectives: [
    {
      directive: NgpProgress,
      inputs: ['ngpProgressValue:value', 'ngpProgressMax:max', 'ngpProgressValueLabel:valueLabel'],
    },
  ],
  imports: [NgpProgressIndicator],
  template: `
    <div [style.width.%]="state().value()" ngpProgressIndicator></div>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      height: 12px;
      width: 100%;
      max-width: 320px;
      overflow: hidden;
      border-radius: 0.5rem;
      border: 1px solid var(--ngp-border);
      background-color: var(--ngp-background);
    }

    [ngpProgressIndicator] {
      height: 100%;
      border-radius: 0.5rem;
      background-color: var(--ngp-background-inverse);
      transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  `,
})
export class Progress {
  /** Access the progress state */
  protected readonly state = injectProgressState();
}
