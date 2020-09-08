// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import WrapperLink from './WrapperLink.js';

test('WrapperLink handles onClick callback', () => {
  const mockOnClick = jest.fn();
  const { getByText } = render(
    <WrapperLink
      wrappedComponent="button"
      href="https://example.com"
      onClick={mockOnClick}
    >
      WrapperLink
    </WrapperLink>
  );
  getByText('WrapperLink').click();
  expect(mockOnClick).toHaveBeenCalled();
});
