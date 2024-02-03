// @flow strict

import { render } from '@testing-library/react';
import PopoverEducational from './PopoverEducational';
import Text from './Text';

describe('PopoverEducational', () => {
  it('renders correctly', () => {
    const element = document.createElement('div');
    const { container } = render(
      <PopoverEducational
        anchor={element}
        accessibilityLabel="text"
        onDismiss={jest.fn()}
        message="text"
        primaryAction={{ text: 'next', role: 'button' }}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with custom children', () => {
    const element = document.createElement('div');
    const { container } = render(
      <PopoverEducational accessibilityLabel="text" anchor={element} onDismiss={jest.fn()}>
        <Text>Custom children</Text>
      </PopoverEducational>,
    );

    expect(container).toMatchSnapshot();
  });

  it('does not render when the anchor is null', () => {
    const { container } = render(
      <PopoverEducational
        accessibilityLabel="text"
        anchor={null}
        onDismiss={() => {}}
        message="text"
        primaryAction={{ text: 'next', role: 'button' }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
