import { ReactNode } from 'react';
import classnames from 'classnames';
import boxStyles from './Box.css';
import boxWhitespaceStyles from './boxWhitespace.css';
import labelStyles from './Label/InternalLabel.css';
import formStyles from './sharedSubcomponents/FormElement.css';
import FormErrorMessage from './sharedSubcomponents/FormErrorMessage';
import FormHelperText from './sharedSubcomponents/FormHelperText';
import formLabelStyles from './sharedSubcomponents/FormLabel.css';
import Text from './Text';
import useInExperiment from './useInExperiment';
import whitespaceStyles from './Whitespace.css';

type Props = {
  /**
   * The content of Fieldset, typically [RadioButtons](https://gestalt.pinterest.systems/web/radiobutton), [Checkboxes](https://gestalt.pinterest.systems/web/checkbox) or [TextFields](https://gestalt.pinterest.systems/web/textfield).
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
  helperText?: string;
};

/**
 * [Fieldset](https://gestalt.pinterest.systems/web/fieldset) creates a fieldset and legend for a group of related form items, like [RadioButtons](https://gestalt.pinterest.systems/web/radiobutton) or [CheckBoxes](https://gestalt.pinterest.systems/web/checkbox), in order to clearly indicate related form items."
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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  if (errorMessage && id === '') {
    // eslint-disable-next-line no-console
    console.error('Please provide an id property to <Fieldset />');
  }

  return (
    <fieldset
      aria-describedby={errorMessage ? `${id}-error` : undefined}
      className={classnames(formStyles.unstyled, whitespaceStyles.p0, whitespaceStyles.m0)}
    >
      <legend
        className={classnames(
          labelStyles.label,
          boxWhitespaceStyles.paddingX0, // Needed to remove the default legend  padding
          {
            [boxStyles.visuallyHidden]: legendDisplay === 'hidden',
            [formLabelStyles.formLabel]: !isInVRExperiment,
            [formLabelStyles.vrFormLabel]: isInVRExperiment,
          },
        )}
      >
        <Text size="100">{legend}</Text>
      </legend>
      {children}

      {helperText && (
        <FormHelperText
          disabled={false}
          id={`${id}-helperText`}
          marginTop
          noPadding
          text={helperText}
        />
      )}

      {errorMessage && (
        <FormErrorMessage id={`${id}-error`} marginTop={isInVRExperiment} text={errorMessage} />
      )}
    </fieldset>
  );
}

Fieldset.displayName = 'Fieldset';
