import { Component, computed } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeftMini, heroChevronRightMini } from '@ng-icons/heroicons/mini';
import {
  injectDatePickerState,
  NgpDatePicker,
  NgpDatePickerCell,
  NgpDatePickerCellRender,
  NgpDatePickerDateButton,
  NgpDatePickerGrid,
  NgpDatePickerLabel,
  NgpDatePickerNextMonth,
  NgpDatePickerPreviousMonth,
  NgpDatePickerRowRender,
} from 'ng-primitives/date-picker';
import { ChangeFn, provideValueAccessor, TouchedFn } from 'ng-primitives/utils';

@Component({
  selector: 'app-date-picker',
  hostDirectives: [
    {
      directive: NgpDatePicker,
      inputs: [
        'ngpDatePickerDate: date',
        'ngpDatePickerMin: min',
        'ngpDatePickerMax: max',
        'ngpDatePickerDisabled: disabled',
      ],
      outputs: ['ngpDatePickerDateChange: dateChange'],
    },
  ],
  imports: [
    NgIcon,
    NgpDatePickerLabel,
    NgpDatePickerNextMonth,
    NgpDatePickerPreviousMonth,
    NgpDatePickerGrid,
    NgpDatePickerCell,
    NgpDatePickerRowRender,
    NgpDatePickerCellRender,
    NgpDatePickerDateButton,
  ],
  providers: [
    provideIcons({ heroChevronRightMini, heroChevronLeftMini }),
    provideValueAccessor(DatePicker),
  ],
  template: `
    <div class="date-picker-header">
      <button ngpDatePickerPreviousMonth aria-label="previous month">
        <ng-icon name="heroChevronLeftMini" />
      </button>
      <h2 ngpDatePickerLabel>{{ label() }}</h2>
      <button ngpDatePickerNextMonth aria-label="next month">
        <ng-icon name="heroChevronRightMini" />
      </button>
    </div>
    <table ngpDatePickerGrid>
      <thead>
        <tr>
          <th scope="col" abbr="Sunday">S</th>
          <th scope="col" abbr="Monday">M</th>
          <th scope="col" abbr="Tuesday">T</th>
          <th scope="col" abbr="Wednesday">W</th>
          <th scope="col" abbr="Thursday">T</th>
          <th scope="col" abbr="Friday">F</th>
          <th scope="col" abbr="Saturday">S</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngpDatePickerRowRender>
          <td *ngpDatePickerCellRender="let date" ngpDatePickerCell>
            <button ngpDatePickerDateButton>{{ date.getDate() }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: `
    :host {
      display: inline-block;
      background-color: var(--ngp-background);
      border-radius: 12px;
      padding: 16px;
      box-shadow: var(--ngp-shadow);
      border: 1px solid var(--ngp-border);
    }

    .date-picker-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      margin-bottom: 16px;
    }

    th {
      font-size: 14px;
      font-weight: 500;
      width: 40px;
      height: 40px;
      text-align: center;
      color: var(--ngp-text-secondary);
    }

    [ngpDatePickerLabel] {
      font-size: 14px;
      font-weight: 500;
      color: var(--ngp-text-primary);
    }

    [ngpDatePickerPreviousMonth],
    [ngpDatePickerNextMonth] {
      all: unset;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      font-size: 20px;
      border: 1px solid var(--ngp-border);
      cursor: pointer;
    }

    [ngpDatePickerPreviousMonth][data-hover],
    [ngpDatePickerNextMonth][data-hover] {
      background-color: var(--ngp-background-hover);
    }

    [ngpDatePickerPreviousMonth][data-focus-visible],
    [ngpDatePickerNextMonth][data-focus-visible] {
      outline: 2px solid var(--ngp-focus-ring);
    }

    [ngpDatePickerPreviousMonth][data-press],
    [ngpDatePickerNextMonth][data-press] {
      background-color: var(--ngp-background-active);
    }

    [ngpDatePickerPreviousMonth][data-disabled],
    [ngpDatePickerNextMonth][data-disabled] {
      cursor: not-allowed;
      color: var(--ngp-text-disabled);
    }

    [ngpDatePickerDateButton] {
      all: unset;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: pointer;
    }

    [ngpDatePickerDateButton][data-today] {
      color: var(--ngp-text-blue);
    }

    [ngpDatePickerDateButton][data-hover] {
      background-color: var(--ngp-background-hover);
    }

    [ngpDatePickerDateButton][data-focus-visible] {
      outline: 2px solid var(--ngp-focus-ring);
      outline-offset: 2px;
    }

    [ngpDatePickerDateButton][data-press] {
      background-color: var(--ngp-background-active);
    }

    [ngpDatePickerDateButton][data-outside-month] {
      color: var(--ngp-text-disabled);
    }

    [ngpDatePickerDateButton][data-selected] {
      background-color: var(--ngp-background-inverse);
      color: var(--ngp-text-inverse);
    }

    [ngpDatePickerDateButton][data-selected][data-outside-month] {
      background-color: var(--ngp-background-disabled);
      color: var(--ngp-text-disabled);
    }

    [ngpDatePickerDateButton][data-disabled] {
      cursor: not-allowed;
      color: var(--ngp-text-disabled);
    }
  `,
  host: {
    '(focusout)': 'onTouched?.()',
  },
})
export class DatePicker implements ControlValueAccessor {
  /** Access the date picker host directive */
  private readonly state = injectDatePickerState<Date>();

  /**
   * Get the current focused date in string format.
   * @returns The focused date in "February 2024" format.
   */
  readonly label = computed(
    () =>
      `${this.state().focusedDate().toLocaleString('default', { month: 'long' })} ${this.state().focusedDate().getFullYear()}`,
  );

  /**
   * The onChange callback function for the date picker.
   */
  private onChange?: ChangeFn<Date | undefined>;

  /**
   * The onTouched callback function for the date picker.
   */
  protected onTouched?: TouchedFn;

  constructor() {
    // Whenever the user interacts with the date picker, call the onChange function with the new value.
    this.state().dateChange.subscribe(date => this.onChange?.(date));
  }

  writeValue(date: Date): void {
    this.state().date.set(date);
  }

  registerOnChange(fn: ChangeFn<Date | undefined>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: TouchedFn): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.state().disabled.set(isDisabled);
  }
}
