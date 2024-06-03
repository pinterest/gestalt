// @ts-expect-error - the path will be correct once the component is moved to the correct location.
import Box from './Box';
import styles from './ComponentName.css';

type Props = {
  /**
   * Prop description.
   */
  accessibilityLabel?: string;
};

/**
 * [ComponentName](https://gestalt.pinterest.systems/web/componentname) component should be used for ... on the page.
 * ![ComponentName light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComponentName.spec.ts-snapshots/ComponentName-chromium-darwin.png)
 * ![ComponentName dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComponentName-dark.spec.ts-snapshots/ComponentName-dark-chromium-darwin.png)
 */
export default function ComponentName({ accessibilityLabel }: Props) {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
