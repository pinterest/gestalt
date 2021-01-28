// @flow strict
import React from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
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
      />,
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
      />,
    );
    expect(container.querySelector('.large')).toBeVisible();
  });

  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <SearchField
        accessibilityLabel="Demo Search Field"
        errorMessage="Error message"
        id="searchField"
        onChange={() => {}}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />,
    );
    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(
      <SearchField
        accessibilityLabel="Demo Search Field"
        id="searchField"
        onChange={() => {}}
        placeholder="Search and explore"
        size="lg"
        value="Search"
      />,
    );
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });
});
