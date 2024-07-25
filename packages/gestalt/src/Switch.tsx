import classnames from 'classnames';
import focusStyles from './Focus.css';
import styles from './Switch.css';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
import useInteractiveStates from './utils/useInteractiveStates';

type Props = {
  /**
   * Indicates if the input is currently disabled. See [Switch combinations](https://gestalt.pinterest.systems/web/switch#Disabled-and-switched-combinations) for more details.
   */
  disabled?: boolean;
  /**
   * A unique identifier for the element.
   */
  id: string;
  /**
   * A unique name for the element.
   */
  name?: string;
  /**
   * Callback triggered when the user interacts with the input.
   */
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: boolean }) => void;
  /**
   * Indicates the current value of the input. See [Switch combinations](https://gestalt.pinterest.systems/web/switch#Disabled-and-switched-combinations) for more details.
   */
  switched?: boolean;
};

/**
 * Use [Switch](https://gestalt.pinterest.systems/web/switch) for single cell options that can be turned on and off only. If you have a cell with multiple options that can activated, consider using [Checkbox](https://gestalt.pinterest.systems/web/checkbox).
 *
 * Switch supports right-to-left(RTL) language locales layout (auto flip on RTL locales like Arabic).
 *
 * ![Switch light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Switch.spec.ts-snapshots/Switch-chromium-darwin.png)
 * ![Switch dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Switch-dark.spec.ts-snapshots/Switch-dark-chromium-darwin.png)
 *
 */
export default function Switch({ disabled = false, id, name, onChange, switched = false }: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = event.target;
    onChange({ event, value: checked });
  };

  const { handleOnFocus, handleOnBlur, isFocused } = useInteractiveStates();
  const { isFocusVisible } = useFocusVisible();

  const switchStyles = classnames(styles.switch, {
    [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible && !isInVRExperiment,
    [styles.focus]: isFocused && isFocusVisible && isInVRExperiment,
    [styles.disabledSelected]: disabled && switched,
    [styles.disabledUnselected]: disabled && !switched,
    [styles.enabledSelected]: !disabled && switched,
    [styles.enabledUnselected]:
      !disabled && !switched && !(isFocused && isFocusVisible && isInVRExperiment),
    [styles.borderColorTransition]: !isInVRExperiment,
  });

  const sliderStyles = classnames(
    styles.slider,
    switched ? styles.sliderRight : styles.sliderLeft,
    !disabled ? styles.sliderDark : styles.sliderLight,
  );

  const sliderVrStyles = classnames(
    {
      [styles.sliderVrRight]: switched,
      [styles.sliderVrLeft]: !switched,
      [styles.disabledSlider]: disabled && !switched,
    },
    sliderStyles,
  );

  const inputStyles = classnames(styles.checkbox, {
    [styles.checkboxEnabled]: !disabled,
  });

  return (
    <div className={switchStyles}>
      <input
        checked={switched}
        className={inputStyles}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={handleOnBlur}
        onChange={handleChange}
        onFocus={handleOnFocus}
        type="checkbox"
      />
      <div className={isInVRExperiment ? sliderVrStyles : sliderStyles} />
    </div>
  );
}

Switch.displayName = 'Switch';
