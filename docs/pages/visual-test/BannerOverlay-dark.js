// @flow strict
import { type Node as ReactNode } from 'react';
import { BannerOverlay, ColorSchemeProvider, FixedZIndex, Image, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <BannerOverlay
        zIndex={new FixedZIndex(100)}
        offset={{ top: 130, bottom: 24 }}
        title="BannerOverlay"
        message={
          <Text inline>
            Saved to{' '}
            <Link display="inlineBlock" target="blank" href="https://www.pinterest.com/">
              Sushi time
            </Link>
          </Text>
        }
        primaryAction={{
          label: 'Save to board',
          href: 'https://www.pinterest.com/',
        }}
        onDismiss={() => {}}
        thumbnail={{
          image: (
            <Image
              alt="Vegan Teriyaki Sushi Burrito"
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/564x/ff/ee/52/ffee52eac6cd0f2f5dac8af3899a9f41.jpg"
            />
          ),
        }}
      />
    </ColorSchemeProvider>
  );
}
