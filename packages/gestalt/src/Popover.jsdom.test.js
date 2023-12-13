// @flow strict
import { create } from 'react-test-renderer';
import PopoverEducational from './PopoverEducational';
import Text from './Text';

describe('PopoverEducational', () => {
  it('renders correctly', () => {
    const element = document.createElement('div');
    const component = create(
      <PopoverEducational
        anchor={element}
        accessibilityLabel="text"
        onDismiss={jest.fn()}
        message="text"
        primaryAction={{ text: 'next', role: 'button' }}
      />,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with custom children', () => {
    const element = document.createElement('div');
    const component = create(
      <PopoverEducational accessibilityLabel="text" anchor={element} onDismiss={jest.fn()}>
        <Text>Custom children</Text>
      </PopoverEducational>,
      {
        createNodeMock: () => true,
      },
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('does not render when the anchor is null', () => {
    const tree = create(
      <PopoverEducational
        accessibilityLabel="text"
        anchor={null}
        onDismiss={() => {}}
        message="text"
        primaryAction={{ text: 'next', role: 'button' }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
