import { create } from 'react-test-renderer';
import IconButton from './IconButton';

describe('IconButton', () => {
  it('accessibilityControls', () => {
    const instance = create(
      <IconButton accessibilityControls="another-element" accessibilityLabel="" />,
    ).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-controls'],
    ).toContain('another-element');
  });

  it('accessibilityExpanded', () => {
    const instance = create(<IconButton accessibilityExpanded accessibilityLabel="" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-expanded']).toBe(
      true,
    );
  });

  it('accessibilityHaspopup', () => {
    const instance = create(<IconButton accessibilityHaspopup accessibilityLabel="" />).root;
    expect(instance.find((element: any) => element.type === 'button').props['aria-haspopup']).toBe(
      true,
    );
  });

  it('accessibilityLabel', () => {
    const instance = create(<IconButton accessibilityLabel="hello" />).root;
    expect(
      instance.find((element: any) => element.type === 'button').props['aria-label'],
    ).toContain('hello');
  });
});
