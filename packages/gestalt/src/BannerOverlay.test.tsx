import { create } from 'react-test-renderer';
import BannerOverlay from './BannerOverlay';
import DeviceTypeProvider from './contexts/DeviceTypeProvider';
import Image from './Image';
import Link from './Link';
import Text from './Text';

describe('BannerOverlay', () => {
  test('renders Text only', () => {
    const tree = create(
      <BannerOverlay
        message="Same great profile, slightly new look. Learn more?"
        title="Profile"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders in desktop device', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="desktop">
        <BannerOverlay
          message="A description"
          offset={{ bottom: 10, top: 15 }}
          title="Text and Image"
        />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders in mobile device', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <BannerOverlay
          message="A description"
          offset={{ bottom: 10, top: 15 }}
          title="Text and Image"
        />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders in mobile device with reversed offset', () => {
    const tree = create(
      <DeviceTypeProvider deviceType="mobile">
        <BannerOverlay
          message="A description"
          offset={{ bottom: 10, top: 15, reverseOffset: true }}
          title="Text and Image"
        />
      </DeviceTypeProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Text + Image', () => {
    const tree = create(
      <BannerOverlay
        message={
          <Text inline weight="bold">
            Saved to{' '}
            <Link
              display="inlineBlock"
              href="https://www.pinterest.com/search/pins/?q=home%20decor"
              underline="hover"
            >
              Home decor
            </Link>
          </Text>
        }
        thumbnail={{
          image: (
            <Image
              alt=""
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
            />
          ),
        }}
        title="Text and Image"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders Text + Image + Button', () => {
    const tree = create(
      <BannerOverlay
        message={
          <Text inline weight="bold">
            Saved to{' '}
            <Link
              display="inlineBlock"
              href="https://www.pinterest.com/search/pins/?q=home%20decor"
              underline="hover"
            >
              Home decor
            </Link>
          </Text>
        }
        thumbnail={{
          image: (
            <Image
              alt=""
              naturalHeight={1}
              naturalWidth={1}
              src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
            />
          ),
        }}
        title="Text, image and button"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
