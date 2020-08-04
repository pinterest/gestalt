// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Switch from './Switch.js';

const mockOnChange = jest.fn();

describe('Switch', () => {
  it('forwards a ref to innermost input', () => {
    const ref = React.createRef();
    render(<Switch id="test" onChange={mockOnChange} ref={ref} switched />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });
});
