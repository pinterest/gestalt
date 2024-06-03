import { ReactNode } from 'react';
import Box from './Box';

type Props = {
  /**
   *
   */
  children?: ReactNode;
};

/**
 * [Containers](https://gestalt.pinterest.systems/web/container ) are useful in responsively laying out content on different screens.
 *
 * ![Container light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Container.spec.ts-snapshots/Container-chromium-darwin.png)
 *
 */
export default function Container({ children }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}

Container.displayName = 'Container';
