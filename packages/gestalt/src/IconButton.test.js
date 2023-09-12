// @flow strict
import { create } from 'react-test-renderer';
import IconButton from './IconButton.js';

describe('IconButton', () => {
  it('accessibilityControls', () => {
    const instance = create(
      <IconButton accessibilityLabel="" accessibilityControls="another-element" />,
    ).root;
    expect(instance.find((element) => element.type === 'button').props['aria-controls']).toContain(
      'another-element',
    );
  });

  it('accessibilityExpanded', () => {
    const instance = create(<IconButton accessibilityLabel="" accessibilityExpanded />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-expanded']).toBe(true);
  });

  it('accessibilityHaspopup', () => {
    const instance = create(<IconButton accessibilityLabel="" accessibilityHaspopup />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-haspopup']).toBe(true);
  });

  it('accessibilityLabel', () => {
    const instance = create(<IconButton accessibilityLabel="hello" />).root;
    expect(instance.find((element) => element.type === 'button').props['aria-label']).toContain(
      'hello',
    );
  });
});
