import { render } from '@testing-library/react';
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
