// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextArea from './TextArea.js';

describe('TextArea', () => {
  it('TextArea with errorMessage prop change', () => {
    const { getByText, rerender } = render(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(() => {
      getByText('Error message');
    }).toThrow('Unable to find an element with the text: Error message');

    rerender(
      <TextArea
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(getByText('Error message')).toBeVisible();
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn();
    const { getByDisplayValue } = render(
      <TextArea
        id="test"
        onBlur={mockBlur}
        onChange={jest.fn()}
        value="TextArea Text"
      />
    );

    fireEvent.blur(getByDisplayValue('TextArea Text'));
    expect(mockBlur).toHaveBeenCalled();
  });
  it('handles change events', () => {
    const mockChange = jest.fn();
    const { container } = render(
      <TextArea id="test" onChange={mockChange} value="TextArea Text" />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBe(null);

    if (textarea) {
      fireEvent.change(textarea, {
        target: { value: 'panda' },
      });
      expect(mockChange).toHaveBeenCalled();
    }
  });
  it('handles focus events', () => {
    const mockFocus = jest.fn();
    const { getByDisplayValue } = render(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={mockFocus}
        value="TextArea Text"
      />
    );

    fireEvent.focus(getByDisplayValue('TextArea Text'));
    expect(mockFocus).toHaveBeenCalled();
  });
  it('handles key down events', () => {
    const mockKeyDown = jest.fn();
    const { container } = render(
      <TextArea
        id="test"
        onChange={() => {}}
        onKeyDown={mockKeyDown}
        value="TextArea Text"
      />
    );

    const textarea = container.querySelector('textarea');
    expect(textarea).not.toBe(null);

    if (textarea) {
      fireEvent.keyDown(textarea, {
        target: { value: 'panda' },
      });
      expect(mockKeyDown).toHaveBeenCalled();
    }
  });

  it('shows a label for the text area', () => {
    const { getByText } = render(
      <TextArea
        id="test"
        label="Label for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />
    );
    expect(getByText('Label for the text area')).toBeVisible();
  });

  it('shows helper text for the text area', () => {
    const { getByText } = render(
      <TextArea
        id="test"
        label="Label for the text area"
        helperText="Helper text for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />
    );
    expect(getByText('Helper text for the text area')).toBeVisible();
  });

  it('hides the helper text for the text area when an error message is shown', () => {
    const { getByText } = render(
      <TextArea
        id="test"
        label="Label for the text area"
        helperText="Helper text for the text area"
        errorMessage="Error message for the text area"
        onChange={() => {}}
        value="TextArea Text"
      />
    );
    expect(() => {
      getByText('Helper text for the text area');
    }).toThrow(
      'Unable to find an element with the text: Helper text for the text area'
    );
  });
});
