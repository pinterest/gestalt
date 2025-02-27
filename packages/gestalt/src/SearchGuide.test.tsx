import { create } from 'react-test-renderer';
import IconCompact from './IconCompact';
import SearchGuide from './SearchGuide';

describe('<SearchGuide />', () => {
  test('expandable', () => {
    const instance = create(<SearchGuide expandable text="Menu" />).root;
    // eslint-disable-next-line testing-library/await-async-query -- Please fix the next time this file is touched!
    expect(instance.findByType(IconCompact).props.icon).toBe('compact-chevron-down');
  });

  test('accessibilityControls', () => {
    const instance = create(
      <SearchGuide accessibilityControls="another-element" text="Hello World" />,
    ).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-controls'],
    ).toContain('another-element');
  });

  test('accessibilityExpanded', () => {
    const instance = create(<SearchGuide accessibilityExpanded text="Hello World" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-expanded']).toBe(
      true,
    );
  });

  test('accessibilityHaspopup', () => {
    const instance = create(<SearchGuide accessibilityHaspopup text="Hello World" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-haspopup']).toBe(
      true,
    );
  });

  test('accessibilityLabel', () => {
    const instance = create(<SearchGuide accessibilityLabel="hello" text="Hello World" />).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-label'],
    ).toContain('hello');
  });
});
