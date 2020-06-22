// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import InputField from './TypeaheadInputField.js';

describe('<InputField />', () => {
  const onClearMock = jest.fn();
  const onChangeMock = jest.fn();
  const setContainerMock = jest.fn();
  const onFocusMock = jest.fn();
  const onKeyNavigationMock = jest.fn();
  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <InputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        setContainer={setContainerMock}
        onFocus={onFocusMock}
        onKeyNavigation={onKeyNavigationMock}
        placeholder="Search and explore"
        value="Search"
      />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <InputField
        label="Demo Search Field"
        id="InputField"
        onChange={onChangeMock}
        onClear={onClearMock}
        setContainer={setContainerMock}
        onFocus={onFocusMock}
        onKeyNavigation={onKeyNavigationMock}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
