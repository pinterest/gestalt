// @flow strict
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Image from './Image.js';
import Link from './Link.js';
import Text from './Text.js';
import Toast from './Toast.js';

describe('<Toast />', () => {
  test('Text Only', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Error Toast', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" type="error" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image', () => {
    const tree = create(
      <Toast
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
        text={
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
      <Toast
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
        text={
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
        primaryAction={{
          accessibilityLabel: 'Undo undo action',
          label: 'Undo',
          size: 'lg',
          role: 'button',
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + _dangerouslySetPrimaryAction', () => {
    const tree = create(
      <Toast
        text={
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
        _dangerouslySetPrimaryAction={<Button accessibilityLabel="test" size="lg" text="Undo" />}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
