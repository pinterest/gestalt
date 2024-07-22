import { render, screen } from '@testing-library/react';
import PopoverEducational from './PopoverEducational';

test('PopoverEducational renders', () => {
  const element = document.createElement('div');
  const { container } = render(
    <PopoverEducational
      accessibilityLabel="test"
      anchor={element}
      message="text"
      onDismiss={jest.fn()}
      primaryAction={{ text: 'next', role: 'button', onClick: () => {} }}
      size="sm"
    />,
  );

  expect(container).toMatchSnapshot();
});

test('PopoverEducational renders with dataTestId', () => {
  const element = document.createElement('div');
  render(
    <PopoverEducational
      accessibilityLabel="test"
      anchor={element}
      dataTestId="some-test-id"
      message="text"
      onDismiss={jest.fn()}
      primaryAction={{ text: 'next', role: 'button', onClick: () => {} }}
      size="sm"
    />,
  );
  const popoverEducationalElement = screen.getByTestId('some-test-id');
  expect(popoverEducationalElement).toBeInTheDocument();
});
