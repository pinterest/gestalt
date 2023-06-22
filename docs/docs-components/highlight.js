// @flow strict

import 'highlight.js/styles/a11y-light.css';
import { useEffect, useRef } from 'react';
import highlightjs from 'highlight.js';

type Props = {|
  children: string | null,
  classNames: $ReadOnlyArray<string>,
|};

export default function Highlighter({ children, classNames }: Props): React$Element<'pre'> {
  const node = useRef<?HTMLPreElement>();

  useEffect(() => {
    highlightjs.highlightBlock(node.current);
  }, []);

  return (
    <pre ref={node} className={classNames}>
      <code>{children}</code>
    </pre>
  );
}
