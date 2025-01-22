import classnames from 'classnames';
import styles from './Indicator.css';
import TextUI from './TextUI';
import useInExperiment from './useInExperiment';

type Props = {
  /**
   * Label for screen readers to announce Button. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/button#ARIA-attributes) for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * When supplied, will display a numeric counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more. Above three digits, the only option to display is "99+".
   */
  count?: number;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * Indicator position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/indicator#Positioning) variant to learn more.
   */
  position?: 'middle' | 'top';
};

/**
 * [Indicator](https://gestalt.pinterest.systems/web/indicator) displays a visual affordance that something has been updated (either with a quantitative number or not)
 *
 * ![Indicator light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Indicator.spec.ts-snapshots/Indicator-chromium-darwin.png)
 * ![Indicator dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Indicator-dark.spec.ts-snapshots/Indicator-dark-chromium-darwin.png)
 *
 */
export default function Indicator({
  accessibilityLabel,
  count,
  dataTestId,
  position = 'middle',
}: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  if (count === undefined) {
    return (
      <div
        aria-label={accessibilityLabel}
        className={classnames(
          styles.notification,
          position === 'middle' ? styles.placementMiddle : styles.placementTop,
        )}
        data-test-id={dataTestId}
        role="status"
      />
    );
  }

  const displayCount = count < 100 ? `${count}` : '99+';

  return (
    <div
      aria-label={accessibilityLabel}
      className={classnames(position === 'middle' ? styles.placementMiddle : styles.placementTop)}
      data-test-id={dataTestId}
      role="status"
    >
      <div
        className={classnames(styles.counter, {
          [styles.marginTop]: !isInVRExperiment,
          [styles.border]: isInVRExperiment,
        })}
      >
        <TextUI align="center" color="light" size="xs">
          {displayCount}
        </TextUI>
      </div>
    </div>
  );
}
