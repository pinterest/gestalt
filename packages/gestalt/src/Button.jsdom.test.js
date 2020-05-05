// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Button from './Button.js';

test('Button handles click', () => {
  const mockOnClick = jest.fn();
  const { getByText } = render(
    <Button text="ButtonText" onClick={mockOnClick} />
  );
  getByText('ButtonText').click();
  expect(mockOnClick).toHaveBeenCalled();
});
