import classnames from 'classnames';
import styles from './Divider.css';
import useInExperiment from './useInExperiment';

/**
 * [Divider](https://gestalt.pinterest.systems/web/divider) is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.
 *
 * ![Divider light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Divider.spec.ts-snapshots/Divider-chromium-darwin.png)
 * ![Divider dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Divider-dark.spec.ts-snapshots/Divider-dark-chromium-darwin.png)
 *
 */
// eslint-disable-next-line no-empty-pattern
export default function Divider({}: Record<any, any>) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <hr
      className={classnames(
        styles.divider,
        isInVRExperiment ? styles.VRborderColor : styles.borderColor,
      )}
    />
  );
}

Divider.displayName = 'Divider';
