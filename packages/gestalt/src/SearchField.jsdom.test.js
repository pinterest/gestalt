// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import SearchField from './SearchField.js';

describe('<SearchField />', () => {
  it('adds a "medium" classname by default', () => {
    const { container } = render(
      <SearchField
        accessibilityLabel="Demo Search Field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search and explore"
        value="Search"
      />
    );
    expect(container.querySelector('.medium')).toBeVisible();
  });

  it('adds a "large" classname when size is set to "lg"', () => {
    const { container } = render(
      <SearchField
        accessibilityLabel="Demo Search Field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />
    );
    expect(container.querySelector('.large')).toBeVisible();
  });
});
