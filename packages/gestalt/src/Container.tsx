import { ReactNode } from 'react';
import Box from './Box';

type Props = {
  /**
   *
   */
  children?: ReactNode;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
};

/**
 * [Containers](https://gestalt.pinterest.systems/web/container ) are useful in responsively laying out content on different screens.
 *
 * ![Container light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Container.spec.ts-snapshots/Container-chromium-darwin.png)
 *
 */
export default function Container({ children, dataTestId }: Props) {
  return (
    <Box data-test-id={dataTestId} display="flex" justifyContent="center">
      <Box maxWidth={800} width="100%">
        {children}
      </Box>
    </Box>
  );
}

Container.displayName = 'Container';
