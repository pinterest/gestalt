import { ReactNode } from 'react';
import InternalFieldset from './Fieldset/InternalFieldset';

type Props = {
  /**
   * The content of Fieldset, typically [Checkboxes](https://gestalt.pinterest.systems/web/checkbox) or [TextFields](https://gestalt.pinterest.systems/web/textfield).
   */
  children: ReactNode;
  /**
   * A unique identifier for this Fieldset. `id` must be specified when an errorMessage is added.
   */
  id?: string;
  /**
   * When needed, pass a string with a helpful error message (be sure to localize!).
   */
  errorMessage?: string;
  /**
   * Caption that clearly and concisely describes the form elements grouped in the fieldset.
   */
  legend: string;
  /**
   * Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually. See the [legend visibility variant](https://gestalt.pinterest.systems#Legend-visibility) for more info.
   */
  legendDisplay?: 'visible' | 'hidden';
  /**
   * Adds an help message below the group of radio buttons.
   *
   */
  helperText?: string;
};

/**
 * [Fieldset](https://gestalt.pinterest.systems/web/fieldset) creates a fieldset and legend for a group of related form items, like [CheckBoxes](https://gestalt.pinterest.systems/web/checkbox), in order to clearly indicate related form items."
 *
 * ![Fieldset light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Fieldset.spec.ts-snapshots/Fieldset-chromium-darwin.png)
 * ![Fieldset dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Fieldset-dark.spec.ts-snapshots/Fieldset-dark-chromium-darwin.png)
 *
 */
export default function Fieldset({
  id = '',
  errorMessage,
  legend,
  legendDisplay = 'visible',
  children,
  helperText,
}: Props) {
  if (errorMessage && id === '') {
    // eslint-disable-next-line no-console
    console.error('Please provide an id property to <Fieldset />');
  }

  return (
    <InternalFieldset
      errorMessage={errorMessage}
      helperText={helperText}
      id={id}
      legend={legend}
      legendDisplay={legendDisplay}
    >
      {children}
    </InternalFieldset>
  );
}

Fieldset.displayName = 'Fieldset';
