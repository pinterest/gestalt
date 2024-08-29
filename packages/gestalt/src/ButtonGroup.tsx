import { Children, type ReactNode } from 'react';
import Box from './Box';

type Props = {
  /**
   * One or more Buttons and/or IconButtons.
   */
  children?: ReactNode;
};

/**
 * [ButtonGroup](https://gestalt.pinterest.systems/web/buttongroup) is used to display a series of buttons.
 *
 * ![ButtonGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup.spec.ts-snapshots/ButtonGroup-chromium-darwin.png)
 * ![ButtonGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup-dark.spec.ts-snapshots/ButtonGroup-dark-chromium-darwin.png)
 *
 */
function ButtonGroup({ children }: Props) {
  if (Children.count(children) === 0) {
    return null;
  }

  return (
    <Box display="flex" margin={-1} wrap>
      {Children.map(children, (child) =>
        child !== null && child !== undefined ? <Box padding={1}>{child}</Box> : null,
      )}
    </Box>
  );
}

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
