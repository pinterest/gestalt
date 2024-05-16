import {createRef} from 'react';
import { render } from '@testing-library/react';
import Box from './Box';

describe('Box', () => {
  it('forwards a ref to the innermost div element', () => {
    const ref = createRef<HTMLElement>();
    render(<Box ref={ref} title="test" />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current?.title).toEqual('test');
  });
});
