// @flow strict
import { createRef } from 'react';
import { render } from '@testing-library/react';
import Checkbox from './Checkbox.js';

const mockOnClick = jest.fn<
  [{| checked: boolean, event: SyntheticInputEvent<HTMLInputElement> |}],
  void,
>();
const mockOnChange = jest.fn<
  [{| checked: boolean, event: SyntheticInputEvent<HTMLInputElement> |}],
  void,
>();

describe('Checkbox', () => {
  it('Checkbox handles click', () => {
    const { getByLabelText } = render(
      <form>
        <label htmlFor="testcheckbox">Label</label>
        <Checkbox size="sm" id="testcheckbox" onChange={mockOnChange} onClick={mockOnClick} />
      </form>,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    getByLabelText('Label').click();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('forwards a ref to the innermost input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox checked id="testcheckbox" onChange={mockOnChange} ref={ref} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });

  it('sets the innermost input to indeterminate with ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox indeterminate id="testcheckbox" onChange={mockOnChange} ref={ref} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.indeterminate).toEqual(true);
  });

  it('sets the innermost input to indeterminate without ref', () => {
    const { container } = render(
      <Checkbox indeterminate id="testcheckbox" onChange={mockOnChange} />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input?.indeterminate).toBe(true);
  });
});
