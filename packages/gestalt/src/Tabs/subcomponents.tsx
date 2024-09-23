import { TOKEN_ROUNDING_0 } from 'gestalt-design-tokens';
import Box from '../Box';
import Text from '../Text';
import useInExperiment from '../useInExperiment';

export function Notification() {
  return (
    <Box
      color="primary"
      dangerouslySetInlineStyle={{ __style: { marginTop: '1px' } }}
      height={6}
      rounding="circle"
      width={6}
    />
  );
}

export function Count({ count }: { count: number }) {
  const displayCount = count < 100 ? `${count}` : '99+';

  return (
    <Box
      color="primary"
      dangerouslySetInlineStyle={{
        __style: {
          padding: `0 ${displayCount.length > 1 ? 3 : 0}px`,
        },
      }}
      height={16}
      minWidth={16}
      rounding="pill"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { padding: '0 0 1px 1px' },
        }}
      >
        <Text align="center" color="light" size="100" weight="bold">
          {displayCount}
        </Text>
      </Box>
    </Box>
  );
}

export function Underline() {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <Box
      color="selected"
      dangerouslySetInlineStyle={{
        __style: {
          borderRadius: isInVRExperiment ? TOKEN_ROUNDING_0 : 1.5,
        },
      }}
      height={isInVRExperiment ? 2 : 3}
      width="100%"
    />
  );
}
