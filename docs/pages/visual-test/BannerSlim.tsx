import { BannerSlim, Box, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 1,
        }}
        width={400}
      >
        <BannerSlim message="Your total audience includes all users who have seen your Pins." />
        {[
          'error',
          'success',
          'warning',
          'info',
          'recommendation',
          'errorBare',
          'successBare',
          'warningBare',
          'infoBare',
          'recommendationBare',
        ].map((type) => (
          <BannerSlim
            key={type}
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more Pinterest.com',
              href: 'http://www.pinterest.com',
              onClick: () => {},
            }}
            iconAccessibilityLabel="test"
            message={`This is a/an ${type} message.`}
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"warning" | "info" | "error" | "success" | "recommendation" | "neutral" | "warningBare" | "errorBare" | "infoBare" | "successBare" | "recommendationBare" | undefined'.
            type={type}
          />
        ))}
      </Flex>
    </Box>
  );
}
