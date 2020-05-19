// @flow strict
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TextField from './TextField.js';

describe('TextField', () => {
  it('TextField with errorMessage prop change', () => {
    const { getByText, rerender } = render(
      <TextField
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
      <TextField
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
      <TextField
        id="test"
        onBlur={mockBlur}
        onChange={jest.fn()}
        value="TextField Text"
      />
    );

    fireEvent.blur(getByDisplayValue('TextField Text'));
    expect(mockBlur).toHaveBeenCalled();
  });
  it('handles change events', () => {
    const mockChange = jest.fn();
    const { container } = render(
      <TextField id="test" onChange={mockChange} value="TextField Text" />
    );

    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.change(input, {
        target: { value: 'panda' },
      });
      expect(mockChange).toHaveBeenCalled();
    }
  });
  it('handles focus events', () => {
    const mockFocus = jest.fn();
    const { getByDisplayValue } = render(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={mockFocus}
        value="TextField Text"
      />
    );

    fireEvent.focus(getByDisplayValue('TextField Text'));
    expect(mockFocus).toHaveBeenCalled();
  });
  it('handles key down events', () => {
    const mockKeyDown = jest.fn();
    const { container } = render(
      <TextField
        id="test"
        onChange={() => {}}
        onKeyDown={mockKeyDown}
        value="TextField Text"
      />
    );

    const input = container.querySelector('input');
    expect(input).not.toBe(null);

    if (input) {
      fireEvent.keyDown(input, {
        target: { value: 'panda' },
      });
      expect(mockKeyDown).toHaveBeenCalled();
    }
  });

  it('shows a label for the text field', () => {
    const { getByText } = render(
      <TextField
        id="test"
        label="Label for the text field"
        onChange={() => {}}
        value="TextField Text"
      />
    );
    expect(getByText('Label for the text field')).toBeVisible();
  });

  it('shows helper text for the text field', () => {
    const { getByText } = render(
      <TextField
        id="test"
        label="Label for the text field"
        helperText="Helper text for the text field"
        onChange={() => {}}
        value="TextField Text"
      />
    );
    expect(getByText('Helper text for the text field')).toBeVisible();
  });

  it('hides the helper text for the text field when an error message is shown', () => {
    const { getByText } = render(
      <TextField
        id="test"
        label="Label for the text field"
        helperText="Helper text for the text field"
        errorMessage="Error message for the text field"
        onChange={() => {}}
        value="TextField Text"
      />
    );
    expect(() => {
      getByText('Helper text for the text field');
    }).toThrow(
      'Unable to find an element with the text: Helper text for the text field'
    );
  });

  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <TextField id="test" onChange={() => {}} value="TextField Text" />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <TextField
        id="test"
        onChange={() => {}}
        value="TextField Text"
        size="lg"
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
