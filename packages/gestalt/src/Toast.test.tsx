import { create } from 'react-test-renderer';
import Button from './Button';
import Image from './Image';
import Link from './Link';
import Text from './Text';
import Toast from './Toast';

describe('<Toast />', () => {
  test('Text Only', () => {
    const tree = create(
      <Toast text="Same great profile, slightly new look. Learn more?" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('DataTestId', () => {
    const component = create(
      <Toast text="Same great profile, slightly new look. Learn more?" dataTestId="some-test-id" />,
    );
    const testInstance = component.root;
    const tooltipElement = testInstance.find((instance:any) => instance.props['data-test-id'] === 'some-test-id');
    expect(tooltipElement).not.toBeNull();
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
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + Image + Button', () => {
    const tree = create(
      <Toast
        primaryAction={{
          accessibilityLabel: 'Undo undo action',
          label: 'Undo',
          size: 'lg',
          role: 'button',
          onClick: () => {},
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
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Text + _dangerouslySetPrimaryAction', () => {
    const tree = create(
      <Toast
        _dangerouslySetPrimaryAction={<Button accessibilityLabel="test" size="lg" text="Undo" />}
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
});
