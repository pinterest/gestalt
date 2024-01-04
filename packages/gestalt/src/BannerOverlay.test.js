// @flow strict
import { create } from 'react-test-renderer';
import BannerOverlay from './BannerOverlay';
import Image from './Image';
import Link from './Link';
import Text from './Text';

describe('<BannerOverlay />', () => {
  test('Text Only', () => {
    const tree = create(
      <BannerOverlay
        title="Profile"
        message="Same great profile, slightly new look. Learn more?"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image', () => {
    const tree = create(
      <BannerOverlay
        title="Text and Image"
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
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image + Button', () => {
    const tree = create(
      <BannerOverlay
        title="Text, image and button"
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
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
