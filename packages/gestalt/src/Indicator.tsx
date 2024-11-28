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
};

/**
 * [Indicator](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.ts-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.ts-snapshots/Badge-dark-chromium-darwin.png)
 *
 */
export default function Indicator({ accessibilityLabel, count, dataTestId }: Props) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  if (count === undefined) {
    return (
      <div
        aria-label={accessibilityLabel}
        className={classnames(styles.notification)}
        data-test-id={dataTestId}
        role="status"
      />
    );
  }

  const displayCount = count < 100 ? `${count}` : '99+';

  return (
    <div
      aria-label={accessibilityLabel}
      className={classnames(styles.counter, {[styles.marginTop]: !isInVRExperiment})}
      data-test-id={dataTestId}
      role="status"
    >
      <TextUI align="center" color="light" size="xs">
        {displayCount}
      </TextUI>
    </div>

  );


}
