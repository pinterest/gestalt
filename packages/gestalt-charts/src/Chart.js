// @flow strict
import { type Node } from 'react';
import { Text } from 'gestalt';

export type Props = {|
  id?: string,
|};

/**
 * [Chart](https://gestalt.pinterest.systems/web/chart) is UNDER DEVELOPMENT. STAY TUNNED!
 *
 * Chart is distributed in its own package and must be installed separately.
 *
 * ![Chart closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-closed.spec.mjs-snapshots/Chart-closed-chromium-darwin.png)
 * ![Chart closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Chart-closed-dark.spec.mjs-snapshots/Chart-closed-dark-chromium-darwin.png)
 */
function Chart({ id }: Props): Node {
  return <Text>{id}</Text>;
}

Chart.displayName = 'Chart';

export default Chart;
