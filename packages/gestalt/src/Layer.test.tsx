import { create } from 'react-test-renderer';
import Layer from './Layer';

describe('Layer in server render', () => {
  it('does not use createPortal or render content', () => {
    // Only run test in server context
    if (typeof document !== 'undefined') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(true).toEqual(true);
      return;
    }

    const tree = create(<Layer>content</Layer>).toJSON();
    // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'ReactTestRendererJSON | ReactTestRendererJSON[]'.
    expect(tree?.type).toBe('div');
  });
});
