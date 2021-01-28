// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import RadioButton from './RadioButton.js';

const mockOnChange = jest.fn();

describe('RadioButton', () => {
  it('forwards a ref to <Box ref={ref}><input/></Box>', () => {
    const ref = React.createRef();
    render(
      <RadioButton value="test" checked id="testRadioButton" onChange={mockOnChange} ref={ref} />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });
});
