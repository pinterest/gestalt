import { type ComponentProps, createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextArea from './TextArea';
import expectToThrow from './utils/testing/expectToThrow';

const LABEL = 'textfieldLabel';

const renderTextArea = ({
  // Cmp Props
  id = 'test',

  onChange = jest.fn(),
  onFocus = jest.fn(),
  onBlur = jest.fn(),
  maxLength,
}: {
  id?: ComponentProps<typeof TextArea>['id'];
  onChange?: ComponentProps<typeof TextArea>['onChange'];
  onFocus?: ComponentProps<typeof TextArea>['onFocus'];
  onBlur?: ComponentProps<typeof TextArea>['onBlur'];
  maxLength?: ComponentProps<typeof TextArea>['maxLength'];
}) =>
  render(
    <TextArea
      id={id}
      label={LABEL}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
    />,
  );

describe('TextArea', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('has an accessible maxLength', async () => {
    const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';

    renderTextArea({
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

    expect(screen.getByText('20/20', { ignore: '.warning' })).not.toBeVisible();

    expect(screen.getByText('20/20', { ignore: '.subtle' })).toBeVisible();

    expect(screen.getByText(errorAccessibilityLabel)).toBeVisible();
  });

  /* eslint-disable-next-line jest/expect-expect */
  it('throws error on invalid maxLength', async () => {
    const errorAccessibilityLabel = 'Limit reached. You can only use 20 characters in this field.';

    expectToThrow(() => {
      renderTextArea({
        maxLength: {
          characterCount: -20,
          errorAccessibilityLabel,
        },
      });
    }, '`maxLength` must be an integer value 0 or higher.');
  });

  it('TextArea with errorMessage prop change', () => {
    const { rerender } = render(
      <TextArea id="test" onBlur={jest.fn()} onChange={jest.fn()} onFocus={jest.fn()} />,
    );
    expect(() => {
      screen.getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');

    rerender(
      <TextArea
        errorMessage="Error message"
        id="test"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
      />,
    );
    expect(screen.getByText('Error message')).toBeVisible();
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn<
      [
        {
          event: React.FocusEvent<HTMLTextAreaElement>;
          value: string;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TextArea id="test" onBlur={mockBlur} onChange={jest.fn()} value="TextArea Text" />);

    fireEvent.blur(screen.getByDisplayValue('TextArea Text'));
    expect(mockBlur).toHaveBeenCalled();
  });

  it('handles change events', () => {
    const mockChange = jest.fn<
      [
        {
          event: React.ChangeEvent<HTMLTextAreaElement>;
          value: string;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const { container } = render(
      <TextArea id="test" onChange={mockChange} value="TextArea Text" />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBe(null);

    if (textarea) {
      fireEvent.change(textarea, {
        target: { value: 'panda' },
      });
    }
    expect(mockChange).toHaveBeenCalled();
  });

  it('handles focus events', () => {
    const mockFocus = jest.fn<
      [
        {
          event: React.FocusEvent<HTMLTextAreaElement>;
          value: string;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(<TextArea id="test" onChange={jest.fn()} onFocus={mockFocus} value="TextArea Text" />);

    fireEvent.focus(screen.getByDisplayValue('TextArea Text'));
    expect(mockFocus).toHaveBeenCalled();
  });

  it('handles key down events', () => {
    const mockKeyDown = jest.fn<
      [
        {
          event: React.KeyboardEvent<HTMLTextAreaElement>;
          value: string;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const { container } = render(
      <TextArea id="test" onChange={() => {}} onKeyDown={mockKeyDown} value="TextArea Text" />,
    );

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBe(null);

    if (textarea) {
      fireEvent.keyDown(textarea, {
        target: { value: 'panda' },
      });
    }
    expect(mockKeyDown).toHaveBeenCalled();
  });

  it('forwards a ref to <input />', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(
      <TextArea
        ref={ref}
        id="test"
        onBlur={jest.fn()}
        onChange={jest.fn()}
        onFocus={jest.fn()}
        value="TextArea Text"
      />,
    );
    expect(ref.current instanceof HTMLTextAreaElement).toEqual(true);
    expect(ref.current?.value).toEqual('TextArea Text');
  });

  it('shows a label for the text area', () => {
    render(
      <TextArea
        id="test"
        label="Label for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />,
    );
    expect(screen.getByText('Label for the text area')).toBeVisible();
  });

  it('shows helper text for the text area', () => {
    render(
      <TextArea
        helperText="Helper text for the text area"
        id="test"
        label="Label for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />,
    );
    expect(screen.getByText('Helper text for the text area')).toBeVisible();
  });

  it('hides the helper text for the text area when an error message is shown', () => {
    render(
      <TextArea
        errorMessage="Error message for the text area"
        helperText="Helper text for the text area"
        id="test"
        label="Label for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />,
    );
    expect(() => {
      screen.getByText('Helper text for the text area');
    }).toThrow('Unable to find an element with the text: Helper text for the text area');
  });
});
