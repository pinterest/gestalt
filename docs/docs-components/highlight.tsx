import 'highlight.js/styles/a11y-light.css';
import { useEffect, useRef } from 'react';
import highlightjs from 'highlight.js';

type Props = {
  children: string | null;
  classNames: ReadonlyArray<string>;
};

export default function Highlighter({
  children,
  classNames,
}: Props): React.ReactElement<React.ComponentProps<'pre'>> {
  const node = useRef<HTMLPreElement | null | undefined>();

  useEffect(() => {
    highlightjs.highlightBlock(node.current);
  }, []);

  return (
    <pre ref={node} className={classNames}>
      <code>{children}</code>
    </pre>
  );
}
