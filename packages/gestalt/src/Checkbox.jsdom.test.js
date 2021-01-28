// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox.js';

const mockOnClick = jest.fn();
const mockOnChange = jest.fn();

describe('Checkbox', () => {
  it('Checkbox handles click', () => {
    const { getByLabelText } = render(
      <form>
        <label htmlFor="testcheckbox">Label</label>
        <Checkbox size="sm" id="testcheckbox" onChange={mockOnChange} onClick={mockOnClick} />
      </form>,
    );
    getByLabelText('Label').click();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('forwards a ref to the innermost input element', () => {
    const ref = React.createRef();
    render(<Checkbox checked id="testcheckbox" onChange={mockOnChange} ref={ref} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });

  it('sets the innermost input to indeterminate with ref', () => {
    const ref = React.createRef();
    render(<Checkbox indeterminate id="testcheckbox" onChange={mockOnChange} ref={ref} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.indeterminate).toEqual(true);
  });

  it('sets the innermost input to indeterminate without ref', () => {
    const { container } = render(
      <Checkbox indeterminate id="testcheckbox" onChange={mockOnChange} />,
    );
    const input = container.querySelector('input');
    expect(input?.indeterminate).toBe(true);
  });
});
