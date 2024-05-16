import { createRef } from 'react';
import { render } from '@testing-library/react';
import Box from './Box';

describe('Box', () => {
  it('forwards a ref to the innermost div element', () => {
    const ref = createRef<HTMLElement>();
    // @ts-expect-error - TS2322 - Type '{ ref: RefObject<HTMLElement>; title: string; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'.
    render(<Box ref={ref} title="test" />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current?.title).toEqual('test');
  });
});
