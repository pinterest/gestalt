// @flow strict
import { createRef } from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import Box from './Box.js';

describe('Box', () => {
  it('renders', () => {
    const { container } = render(<Box />);
    expect(container).toMatchSnapshot();
  });

  it('has correct *-hide classes when display is false', () => {
    const { container } = render(
      <Box display="none" smDisplay="none" mdDisplay="none" lgDisplay="none" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('has correct classes when display is flex', () => {
    const { container } = render(<Box />);
    expect(container).toMatchSnapshot();
  });

  it('has correct *-flex-column classes when display is flexColumn', () => {
    const { container } = render(
      <Box direction="column" smDirection="column" mdDirection="column" lgDirection="column" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('has correct *-inline-block classes when display is inlineBlock', () => {
    const { container } = render(
      <Box
        display="inlineBlock"
        smDisplay="inlineBlock"
        mdDisplay="inlineBlock"
        lgDisplay="inlineBlock"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('allows zero values for whitespace', () => {
    const { container } = render(<Box padding={0} />);
    expect(container).toMatchSnapshot();
  });

  it('dangerouslySetInlineStyle', () => {
    expect(
      create(<Box dangerouslySetInlineStyle={{ __style: { width: 100 } }} />).toJSON(),
    ).toMatchSnapshot();
  });

  it('correctly sets visually hidden', () => {
    expect(create(<Box display="visuallyHidden" />)).toMatchSnapshot();
  });

  it('has correct marginStart and marginEnd when marginStart equals 1 and marginEnd equals 2', () => {
    expect(create(<Box marginStart={1} marginEnd={2} />)).toMatchSnapshot();
  });

  it('has correct marginStart and marginEnd when marginStart and marginEnd are negative', () => {
    expect(create(<Box marginStart={-1} marginEnd={-3} />)).toMatchSnapshot();
  });

  it('allows auto margin', () => {
    expect(create(<Box marginEnd="auto" />)).toMatchSnapshot();
  });

  it('has correct class when opacity is 0.5', () => {
    const { container } = render(<Box opacity={0.5} />);
    expect(container).toMatchSnapshot();
  });

  it('has correct class when opacity is 1', () => {
    const { container } = render(<Box opacity={1} />);
    expect(container).toMatchSnapshot();
  });

  it('has correct class when rounding is 1', () => {
    const { container } = render(<Box rounding={1} />);
    expect(container).toMatchSnapshot();
  });

  it('has correct class when rounding is circle', () => {
    const { container } = render(<Box rounding="circle" />);
    expect(container).toMatchSnapshot();
  });

  it('has correct classes when borderStyle is lg', () => {
    const { container } = render(<Box borderStyle="lg" />);
    expect(container).toMatchSnapshot();
  });

  it('has correct classes when borderStyle is shadow', () => {
    const { container } = render(<Box borderStyle="shadow" />);
    expect(container).toMatchSnapshot();
  });

  it('has correct classes when borderStyle is raisedTopShadow', () => {
    const { container } = render(<Box borderStyle="raisedTopShadow" />);
    expect(container).toMatchSnapshot();
  });

  it('has correct zIndex', () => {
    const zIndexStub = {
      index() {
        return 100;
      },
    };
    const { container } = render(<Box zIndex={zIndexStub} />);
    expect(container).toMatchSnapshot();
  });

  it('forwards a ref to the innermost div element', () => {
    const ref = createRef<HTMLElement>();
    render(<Box title="test" ref={ref} />);
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    expect(ref.current?.title).toEqual('test');
  });
});
