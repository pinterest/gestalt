// @flow
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

    fireEvent.change(container.querySelector('input'), {
      target: { value: 'panda' },
    });
    expect(mockChange).toHaveBeenCalled();
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

    fireEvent.keyDown(container.querySelector('input'), {
      target: { value: 'panda' },
    });
    expect(mockKeyDown).toHaveBeenCalled();
  });
});
