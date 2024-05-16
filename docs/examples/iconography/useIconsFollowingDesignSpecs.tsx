import { Box, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Icon
        accessibilityLabel="pin code"
        color="default"
        dangerouslySetSvgPath={{
          __path:
            'M12 0a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 0M3.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14m8.5-4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m0 17a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m-17 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m-1-11A1.25 1.25 0 1 0 0 12a1.25 1.25 0 0 0 2.5 0m20.25-1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M12 24a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5',
        }}
        size={32}
      />
    </Box>
  );
}
