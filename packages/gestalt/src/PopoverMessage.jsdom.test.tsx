import { render } from '@testing-library/react';
import PopoverMessage from './PopoverMessage';

test('PopoverMessage renders', () => {
  const element = document.createElement('div');
  const { container } = render(
    <PopoverMessage
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
