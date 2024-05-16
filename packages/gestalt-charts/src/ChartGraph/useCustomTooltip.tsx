import {ReactNode, useCallback} from 'react';
import { Box } from 'gestalt';

export default function useCustomTooltip(
  {
    isDarkMode,
    renderTooltip,
  }: {
    isDarkMode: boolean,
    renderTooltip?: "auto" | "none" | ((
      arg1: {
        active: boolean | null | undefined,
        payload: Record<any, any> | null | undefined,
        label: string | number
      },
    ) => ReactNode)
  },
): (
  arg1: {
    active: boolean | null | undefined,
    payload: Record<any, any> | null | undefined,
    label: string | number
  },
) => ReactNode {
  return useCallback(
    ({
      active,
      payload,
      label,
    }: {
      active: boolean | null | undefined,
      payload: Record<any, any> | null | undefined,
      label: string | number
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
