import { BooleanInput, NumberInput } from '@angular/cdk/coercion';
import {
  Directive,
  booleanAttribute,
  computed,
  input,
  numberAttribute,
  output,
  signal,
} from '@angular/core';
import { NgpOrientation } from 'ng-primitives/common';
import { setupFormControl } from 'ng-primitives/form-field';
import { uniqueId } from 'ng-primitives/utils';
import type { NgpSliderTrack } from '../slider-track/slider-track';
import { provideSliderState, sliderState } from './slider-state';

/**
 * Apply the `ngpSlider` directive to an element that represents the slider and contains the track, range, and thumb.
 */
@Directive({
  selector: '[ngpSlider]',
  exportAs: 'ngpSlider',
  providers: [provideSliderState()],
  host: {
    '[id]': 'id()',
    '[attr.data-orientation]': 'state.orientation()',
  },
})
export class NgpSlider {
  /**
   * The id of the slider. If not provided, a unique id will be generated.
   */
  readonly id = input<string>(uniqueId('ngp-slider'));

  /**
   * The value of the slider.
   */
  readonly value = input<number, NumberInput>(0, {
    alias: 'ngpSliderValue',
    transform: numberAttribute,
  });

  /**
   * Emits when the value changes.
   */
  readonly valueChange = output<number>({
    alias: 'ngpSliderValueChange',
  });

  /**
   * The minimum value of the slider.
   */
  readonly min = input<number, NumberInput>(0, {
    alias: 'ngpSliderMin',
    transform: numberAttribute,
  });

  /**
   * The maximum value of the slider.
   */
  readonly max = input<number, NumberInput>(100, {
    alias: 'ngpSliderMax',
    transform: numberAttribute,
  });

  /**
   * The step value of the slider.
   */
  readonly step = input<number, NumberInput>(1, {
    alias: 'ngpSliderStep',
    transform: numberAttribute,
  });

  /**
   * The orientation of the slider.
   */
  readonly orientation = input<NgpOrientation>('horizontal', {
    alias: 'ngpSliderOrientation',
  });

  /**
   * The disabled state of the slider.
   */
  readonly disabled = input<boolean, BooleanInput>(false, {
    alias: 'ngpSliderDisabled',
    transform: booleanAttribute,
  });

  /**
   * Access the slider track.
   * @internal
   */
  readonly track = signal<NgpSliderTrack | undefined>(undefined);

  /**
   * The value as a percentage based on the min and max values.
   */
  protected readonly percentage = computed(
    () => ((this.state.value() - this.state.min()) / (this.state.max() - this.state.min())) * 100,
  );

  /**
   * The state of the slider. We use this for the slider state rather than relying on the inputs.
   * @internal
   */
  protected readonly state = sliderState<NgpSlider>(this);

  constructor() {
    setupFormControl({ id: this.state.id, disabled: this.state.disabled });
  }
}
