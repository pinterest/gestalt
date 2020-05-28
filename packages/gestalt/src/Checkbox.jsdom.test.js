// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox.js';

test('Checkbox handles click', () => {
  const mockOnClick = jest.fn();
  const mockOnChange = jest.fn();
  const { getByLabelText } = render(
    <form>
      <label htmlFor="testcheckbox">Label</label>
      <Checkbox
        size="sm"
        id="testcheckbox"
        onChange={mockOnChange}
        onClick={mockOnClick}
      />
    </form>
  );
  getByLabelText('Label').click();
  expect(mockOnClick).toHaveBeenCalled();
  expect(mockOnChange).toHaveBeenCalled();
});
