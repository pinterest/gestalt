// @flow strict
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './TextField.js';
import expectToThrow from './utils/testing/expectToThrow.js';

const LABEL = 'textfieldLabel';

const renderTextField = ({
  // Cmp Props
  id = 'test',
  onChange = jest.fn(),
  onFocus = jest.fn(),
  onBlur = jest.fn(),
  maxLength,
}: {|
  id?: $ElementType<React$ElementConfig<typeof TextField>, 'id'>,
  onChange?: $ElementType<React$ElementConfig<typeof TextField>, 'onChange'>,
  onFocus?: $ElementType<React$ElementConfig<typeof TextField>, 'onFocus'>,
  onBlur?: $ElementType<React$ElementConfig<typeof TextField>, 'onBlur'>,
  maxLength?: $ElementType<React$ElementConfig<typeof TextField>, 'maxLength'>,
|}) =>
  render(
    <TextField
      id={id}
      label={LABEL}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
    />,
  );

describe('TextField', () => {
  it('has an accessible maxLength', async () => {
    const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';

    renderTextField({
      maxLength: {
        characterCount: 20,
        errorAccessibilityLabel,
      },
    });

    const userInput = 'text';
    const userInput2 = 'very, very long text!';

    expect(screen.getByText('0/20')).toBeVisible();

    await userEvent.type(screen.getByLabelText(LABEL), userInput);

    expect(screen.getByText('4/20')).toBeVisible();

    await userEvent.type(screen.getByLabelText(LABEL), userInput2);

    expect(screen.getByText('20/20', { ignore: '.warningText' })).not.toBeVisible();

    expect(screen.getByText('20/20', { ignore: '.subtleText' })).toBeVisible();

    expect(screen.getByText(errorAccessibilityLabel)).toBeVisible();
  });

  /* eslint-disable-next-line jest/expect-expect */
  it('throws error on invalid maxLength', async () => {
    const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';
    expectToThrow(() => {
      renderTextField({
        maxLength: {
          characterCount: -20,
          errorAccessibilityLabel,
        },
      });
    }, '`maxLength` must be an integer value 0 or higher.');
  });

  it('renders error message on errorMessage prop change', () => {
    const { rerender } = render(
      <TextField id="test" onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
    );
    expect(() => {
      screen.getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');

    rerender(
      <TextField
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
      <TextField
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        value="TextField Text"
      />,
    );

    fireEvent.focus(screen.getByDisplayValue('TextField Text'));
    expect(screen.getByDisplayValue('TextField Text')).toHaveAccessibleDescription('Error message');
  });

  it('forwards a ref to <input />', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        value="TextField Text"
        ref={ref}
      />,
    );
    expect(ref.current instanceof HTMLInputElement).toEqual(true);
    expect(ref.current?.value).toEqual('TextField Text');
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn<
      [{| event: SyntheticFocusEvent<HTMLInputElement>, value: string |}],
      void,
    >();
    render(<TextField id="test" onBlur={mockBlur} onChange={jest.fn()} value="TextField Text" />);

    fireEvent.blur(screen.getByDisplayValue('TextField Text'));
    expect(mockBlur).toHaveBeenCalled();
  });

  it('handles change events', () => {
    const mockChange = jest.fn<
      [{| event: SyntheticInputEvent<HTMLInputElement>, value: string |}],
      void,
    >();
    const { container } = render(
      <TextField id="test" onChange={mockChange} value="TextField Text" />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.change(input, {
        target: { value: 'panda' },
      });
    }
    expect(mockChange).toHaveBeenCalled();
  });

  it('handles focus events', () => {
    const mockFocus = jest.fn<
      [{| event: SyntheticFocusEvent<HTMLInputElement>, value: string |}],
      void,
    >();
    render(<TextField id="test" onChange={jest.fn()} onFocus={mockFocus} value="TextField Text" />);

    fireEvent.focus(screen.getByDisplayValue('TextField Text'));
    expect(mockFocus).toHaveBeenCalled();
  });

  it('handles key down events', () => {
    const mockKeyDown = jest.fn<
      [{| event: SyntheticKeyboardEvent<HTMLInputElement>, value: string |}],
      void,
    >();
    const { container } = render(
      <TextField id="test" onChange={() => {}} onKeyDown={mockKeyDown} value="TextField Text" />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.keyDown(input, {
        target: { value: 'panda' },
      });
    }
    expect(mockKeyDown).toHaveBeenCalled();
  });

  it('shows a label for the text field', () => {
    render(
      <TextField
        id="test"
        label="Label for the text field"
        onChange={() => {}}
        value="TextField Text"
      />,
    );
    expect(screen.getByText('Label for the text field')).toBeVisible();
  });

  it('shows helper text for the text field', () => {
    render(
      <TextField
        id="test"
        label="Label for the text field"
        helperText="Helper text for the text field"
        onChange={() => {}}
        value="TextField Text"
      />,
    );
    expect(screen.getByText('Helper text for the text field')).toBeVisible();
  });

  it('hides the helper text for the text field when an error message is shown', () => {
    render(
      <TextField
        id="test"
        label="Label for the text field"
        helperText="Helper text for the text field"
        errorMessage="Error message for the text field"
        onChange={() => {}}
        value="TextField Text"
      />,
    );
    expect(() => {
      screen.getByText('Helper text for the text field');
    }).toThrow('Unable to find an element with the text: Helper text for the text field');
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <TextField id="test" onChange={() => {}} value="TextField Text" />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <TextField id="test" onChange={() => {}} value="TextField Text" size="lg" />,
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    expect(container.querySelector('.large')).toBeVisible();
  });
});
