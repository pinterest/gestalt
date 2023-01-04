// @flow strict
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Link from './Link.js';
import Toast from './Toast.js';
import Text from './Text.js';

describe('<Toast />', () => {
  test('Text Only', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Error Toast', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" variant="error" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image', () => {
    const tree = create(
      <Toast
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
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
        thumbnail={
          <img
            alt=""
            src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
          />
        }
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
        primaryAction={{ accessibilityLabel: 'Test', label: 'Undo', size: 'lg' }}
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
