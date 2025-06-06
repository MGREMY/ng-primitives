import { NumberInput } from '@angular/cdk/coercion';
import { Component, input, numberAttribute } from '@angular/core';
import {
  NgpMeter,
  NgpMeterIndicator,
  NgpMeterLabel,
  NgpMeterTrack,
  NgpMeterValue,
} from 'ng-primitives/meter';

@Component({
  selector: 'app-meter',
  hostDirectives: [
    { directive: NgpMeter, inputs: ['ngpMeterValue:value', 'ngpMeterMin:min', 'ngpMeterMax:max'] },
  ],
  imports: [NgpMeterIndicator, NgpMeterLabel, NgpMeterValue, NgpMeterTrack],
  template: `
    <span ngpMeterLabel>{{ label() }}</span>
    <span ngpMeterValue>{{ value() }}%</span>

    <div ngpMeterTrack>
      <div ngpMeterIndicator></div>
    </div>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-row-gap: 0.5rem;
      width: 200px;
      box-sizing: border-box;
      padding: 0.5rem;
    }

    [ngpMeterLabel] {
      color: var(--ngp-text-emphasis);
      font-size: 14px;
      font-weight: 600;
    }

    [ngpMeterValue] {
      color: var(--ngp-text-secondary);
      font-size: 14px;
      font-weight: 500;
      text-align: right;
      grid-column-start: 2;
      text-align: end;
    }

    [ngpMeterTrack] {
      grid-column: 1 / 3;
      overflow: hidden;
      background-color: var(--ngp-background);
      box-shadow: var(--ngp-shadow-border);
      border-radius: 4px;
      height: 8px;
    }

    [ngpMeterIndicator] {
      background-color: var(--ngp-background-success);
      height: 100%;
      transition: width 0.2s ease-in-out;
      inset-inline-start: 0px;
      border-radius: 4px;
    }
  `,
})
export class Meter {
  /** The value of the meter. */
  readonly value = input<number, NumberInput>(0, {
    transform: numberAttribute,
  });

  /** The label of the meter. */
  readonly label = input.required<string>();
}
