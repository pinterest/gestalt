import 'highlight.js/styles/a11y-light.css';
import { type ReactElement, useEffect, useRef } from 'react';
import highlightjs from 'highlight.js';

type Props = {
  children: string | null;
  classNames: ReadonlyArray<string>;
};

export default function Highlighter({ children, classNames }: Props): ReactElement {
  const node = useRef<HTMLPreElement | null | undefined>();

  useEffect(() => {
    // @ts-expect-error - TS2345 - Argument of type 'HTMLPreElement | null | undefined' is not assignable to parameter of type 'HTMLElement'.
    highlightjs.highlightBlock(node.current);
  }, []);

  return (
    // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLPreElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLPreElement> | undefined'. | TS2322 - Type 'readonly string[]' is not assignable to type 'string'.
    <pre ref={node} className={classNames}>
      <code>{children}</code>
    </pre>
  );
}
