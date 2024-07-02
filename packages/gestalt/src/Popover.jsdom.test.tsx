import { render } from '@testing-library/react';
import Popover from './Popover';
import Text from './Text';

describe('Popover', () => {
  it('renders correctly', () => {
    const element = document.createElement('div');
    const { container } = render(
      <Popover accessibilityLabel="text" anchor={element} onDismiss={jest.fn()}>
        <Text>Custom children</Text>
      </Popover>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with portal', () => {
    const element = document.createElement('div');
    const { baseElement } = render(
      <Popover
        accessibilityLabel="text"
        anchor={element}
        onDismiss={jest.fn()}
        disablePortal={false}
      >
        <Text>Children</Text>
      </Popover>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('does not render when the anchor is null', () => {
    const { container } = render(
      <Popover accessibilityLabel="text" anchor={null} onDismiss={() => {}}>
        <Text>Children</Text>
      </Popover>,
    );

    expect(container).toMatchSnapshot();
  });
});
