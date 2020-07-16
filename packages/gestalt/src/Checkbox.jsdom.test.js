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

  it('forwards a ref to <Box ref={ref}><input/></Box>', () => {
    const ref = React.createRef();
    render(<Checkbox id="testcheckbox" onChange={mockOnChange} ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
  });
});
