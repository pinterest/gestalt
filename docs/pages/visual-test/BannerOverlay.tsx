import { BannerOverlay, FixedZIndex, Image, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <BannerOverlay
      message={
        <Text inline>
          Saved to{' '}
          <Link display="inlineBlock" href="https://www.pinterest.com/" target="blank">
            Sushi time
          </Link>
        </Text>
      }
      offset={{ top: 130, bottom: 24 }}
      onDismiss={() => {}}
      primaryAction={{
        role: 'link',
        accessibilityLabel: `Save to board`,
        label: 'Save to board',
        href: 'https://www.pinterest.com/',
      }}
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
      title="BannerOverlay"
      zIndex={new FixedZIndex(100)}
    />
  );
}
