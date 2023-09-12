// @flow strict
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NumberField from './NumberField.js';

describe('NumberField', () => {
  it('renders error message on errorMessage prop change', () => {
    const { rerender } = render(
      <NumberField id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    );
    expect(() => {
      screen.getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');

    rerender(
      <NumberField
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />,
    );
    expect(screen.getByText('Error message')).toBeVisible();
  });

  it('reads the error message on focus', () => {
    render(
      <NumberField
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        value={42}
      />,
    );
    fireEvent.focus(screen.getByDisplayValue('42'));
    expect(screen.getByDisplayValue('42')).toHaveAccessibleDescription('Error message');
  });

  it('forwards a ref to <input />', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <NumberField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        value={42}
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.value).toEqual('42');
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn<
      [{| event: SyntheticFocusEvent<HTMLInputElement>, value: number | void |}],
      void,
    >();
    render(<NumberField id="test" onBlur={mockBlur} onChange={jest.fn()} value={42} />);

    fireEvent.blur(screen.getByDisplayValue('42'));
    expect(mockBlur).toHaveBeenCalled();
  });

  it('handles change events', () => {
    const mockChange = jest.fn<
      [{| event: SyntheticInputEvent<HTMLInputElement>, value: number | void |}],
      void,
    >();
    const { container } = render(<NumberField id="test" onChange={mockChange} value={42} />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.change(input, {
        target: { value: 43 },
      });
    }
    expect(mockChange).toHaveBeenCalled();
  });

  it('handles focus events', () => {
    const mockFocus = jest.fn<
      [{| event: SyntheticFocusEvent<HTMLInputElement>, value: number | void |}],
      void,
    >();
    render(<NumberField id="test" onChange={jest.fn()} onFocus={mockFocus} value={42} />);

    fireEvent.focus(screen.getByDisplayValue('42'));
    expect(mockFocus).toHaveBeenCalled();
  });

  it('handles key down events', () => {
    const mockKeyDown = jest.fn<
      [{| event: SyntheticKeyboardEvent<HTMLInputElement>, value: number | void |}],
      void,
    >();
    const { container } = render(
      <NumberField id="test" onChange={() => {}} onKeyDown={mockKeyDown} value={42} />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.keyDown(input, {
        target: { value: 43 },
      });
    }
    expect(mockKeyDown).toHaveBeenCalled();
  });

  it('shows a label for the number field', () => {
    render(
      <NumberField id="test" label="Label for the number field" onChange={() => {}} value={42} />,
    );
    expect(screen.getByText('Label for the number field')).toBeVisible();
  });

  it('shows helper text for the number field', () => {
    render(
      <NumberField
        id="test"
        label="Label for the number field"
        helperText="Helper text for the number field"
        onChange={() => {}}
        value={42}
      />,
    );
    expect(screen.getByText('Helper text for the number field')).toBeVisible();
  });

  it('hides the helper text for the number field when an error message is shown', () => {
    render(
      <NumberField
        id="test"
        label="Label for the number field"
        helperText="Helper text for the number field"
        errorMessage="Error message for the number field"
        onChange={() => {}}
        value={42}
      />,
    );
    expect(() => {
      screen.getByText('Helper text for the number field');
    }).toThrow('Unable to find an element with the text: Helper text for the number field');
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(<NumberField id="test" onChange={() => {}} value={42} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <NumberField id="test" onChange={() => {}} value={42} size="lg" />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.large')).toBeVisible();
  });
});
