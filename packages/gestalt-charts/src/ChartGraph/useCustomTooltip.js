// @flow strict
import { type Node as ReactNode, useCallback } from 'react';
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
      }) => ReactNode),
}): ({
  active: ?boolean,
  payload: ?{ ... },
  label: string | number,
}) => ReactNode {
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
        borderStyle={isDarkMode ? undefined : 'shadow'}
        color={isDarkMode ? 'elevationFloating' : 'default'}
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
