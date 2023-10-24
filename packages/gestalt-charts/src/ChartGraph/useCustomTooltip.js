// @flow strict
import { type Node, useCallback } from 'react';
import { Box } from 'gestalt';

export default function useCustomTooltip({
  isDarkMode,
  renderTooltip,
}: {
  isDarkMode: boolean,
  renderTooltip?:
    | 'auto'
    | 'none'
    | (({
        active: ?boolean,
        payload: ?{ ... },
        label: string | number,
      }) => Node),
}): ({
  active: ?boolean,
  payload: ?{ ... },
  label: string | number,
}) => Node {
  return useCallback(
    ({
      active,
      payload,
      label,
    }: {
      active: ?boolean,
      payload: ?{ ... },
      label: string | number,
    }) => (
      <Box
        color={isDarkMode ? 'elevationFloating' : 'default'}
        borderStyle={isDarkMode ? undefined : 'shadow'}
        maxWidth={300}
        padding={4}
        rounding={4}
      >
        {renderTooltip !== 'none' &&
          renderTooltip !== 'auto' &&
          renderTooltip?.({ active, payload, label })}
      </Box>
    ),
    [isDarkMode, renderTooltip],
  );
}
