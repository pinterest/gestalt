import { BannerUpsell, Box, Image } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: (
            <Image
              alt=""
              color="rgb(231, 186, 176)"
              naturalHeight={751}
              naturalWidth={564}
              src="https://i.ibb.co/7bQQYkX/stock2.jpg"
            />
          ),
          // @ts-expect-error - TS2741 - Property 'wash' is missing in type '{ rounding: 4; }' but required in type '{ rounding: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle"; wash: boolean; }'.
          mask: { rounding: 4 },
          width: 128,
        }}
        message="Check out our resources for adapting to these times."
        primaryAction={{
          href: 'https://pinterest.com',
          label: 'Visit',
          accessibilityLabel: 'Visit our Stay Safe resources',
          target: 'blank',
          role: 'link',
        }}
        title="Stay healthy and safe"
      />
    </Box>
  );
}
