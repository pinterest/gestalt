import { render, screen } from '@testing-library/react';
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
        disablePortal={false}
        onDismiss={jest.fn()}
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

  it('renders correctly with dataTestId', () => {
    const element = document.createElement('div');
    render(
      <Popover
        accessibilityLabel="text"
        anchor={element}
        onDismiss={jest.fn()}
        dataTestId="some-test-id"
      >
        <Text>Custom children</Text>
      </Popover>,
    );
    const component = screen.getByTestId('some-test-id');
    expect(component).toBeInTheDocument();
  });
});
