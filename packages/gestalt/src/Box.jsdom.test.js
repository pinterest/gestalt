// @flow strict
import { createRef } from 'react';
import { render } from '@testing-library/react';
import Box from './Box.js';

describe('Box', () => {
  it('forwards a ref to the innermost div element', () => {
    const ref = createRef<HTMLElement>();
    render(<Box title="test" ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current?.title).toEqual('test');
  });
});
