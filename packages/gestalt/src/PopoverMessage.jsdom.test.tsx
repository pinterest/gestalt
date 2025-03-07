import { render } from '@testing-library/react';
import PopoveMessage from './PopoveMessage';

test('PopoveMessage renders', () => {
  const element = document.createElement('div');
  const { container } = render(
    <PopoveMessage
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
