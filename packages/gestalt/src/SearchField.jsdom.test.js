// @flow strict
import { create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
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
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access -- Please fix the next time this file is touched!
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

  it('should call onKeyDown callback when keyboard input is entered', () =>
    new Promise((resolve) => {
      const { getByRole } = render(
        <SearchField
          accessibilityLabel="Demo Search Field"
          id="searchField"
          onChange={() => {}}
          onKeyDown={({ event, value }) => {
            expect(value).toEqual('Search');
            expect(event.key).toEqual('a');
            resolve();
          }}
          placeholder="Search and explore"
          size="lg"
          value="Search"
        />,
      );
      // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
      fireEvent.keyDown(getByRole('searchbox'), { key: 'a' });
    }));
});
