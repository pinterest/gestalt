// @flow strict

import { render } from '@testing-library/react';
import PopoverEducational from './PopoverEducational';

test('PopoverEducational renders', () => {
  const element = document.createElement('div');
  const { container } = render(
    <PopoverEducational
      accessibilityLabel="test"
      anchor={element}
      onDismiss={jest.fn()}
      size="sm"
      message="text"
      primaryAction={{ text: 'next', role: 'button', onClick: () => {} }}
    />,
  );

  expect(container).toMatchSnapshot();
});
