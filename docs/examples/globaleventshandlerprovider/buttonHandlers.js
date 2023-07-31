// @flow strict
import { type Node, useCallback, useMemo } from 'react';
import { Box, Button, GlobalEventsHandlerProvider } from 'gestalt';

export default function Example(): Node {
  const onClick = useCallback(
    // eslint-disable-next-line no-console
    ({ name, surface }: { [string]: string | number }) => console.log(name, surface),
    [],
  );

  const buttonHandlers = useMemo(
    () => ({
      onClick,
    }),
    [onClick],
  );

  return (
    <GlobalEventsHandlerProvider buttonHandlers={buttonHandlers}>
      <Box padding={2}>
        <Button
          providerAuxData={{ name: 'form-button', surface: 'campaign-edit' }}
          color="red"
          text="Apply"
          size="lg"
        />
      </Box>
    </GlobalEventsHandlerProvider>
  );
}
