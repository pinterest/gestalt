import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './Checkbox';

const mockOnClick = jest.fn<
  [
    {
      checked: boolean;
      event: React.ChangeEvent<HTMLInputElement>;
    },
  ],
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  undefined
>();
const mockOnChange = jest.fn<
  [
    {
      checked: boolean;
      event: React.ChangeEvent<HTMLInputElement>;
    },
  ],
  // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
  undefined
>();

describe('Checkbox', () => {
  it('Checkbox handles click', () => {
    render(
      <form>
        <label htmlFor="testcheckbox">Label</label>
        <Checkbox id="testcheckbox" onChange={mockOnChange} onClick={mockOnClick} size="sm" />
      </form>,
    );
    screen.getByLabelText('Label').click();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('forwards a ref to the innermost input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} checked id="testcheckbox" onChange={mockOnChange} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.checked).toEqual(true);
  });

  it('sets the innermost input to indeterminate with ref', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} id="testcheckbox" indeterminate onChange={mockOnChange} />);
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.indeterminate).toEqual(true);
  });

  it('sets the innermost input to indeterminate without ref', () => {
    const { container } = render(
      <Checkbox id="testcheckbox" indeterminate onChange={mockOnChange} />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input?.indeterminate).toBe(true);
  });

  it('validate data test id for checkbox', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox
        ref={ref}
        dataTestId="test-checkbox"
        errorMessage="test error"
        helperText="test checkbox"
        id="id"
        label="Name"
        onChange={mockOnChange}
        onClick={mockOnClick}
        size="sm"
      />,
    );
    expect(screen.getAllByTestId('test-checkbox').length).toBe(1);
    expect(screen.getAllByTestId('test-checkbox-label').length).toBe(1);
    expect(screen.getAllByTestId('test-checkbox-helper-text').length).toBe(1);
    expect(screen.getAllByTestId('test-checkbox-error-icon').length).toBe(1);
    expect(screen.getAllByTestId('test-checkbox-label').length).toBe(1);
    screen.getByTestId('test-checkbox').click();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalled();
    expect(screen.getAllByTestId('test-checkbox-error-icon').length).toBe(1);
  });
});
