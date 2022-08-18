// @flow strict

import { useEffect, useRef } from 'react';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';

type Props = {|
  children: string | null,
  classNames: Array<string>,
|};

export default function Highlighter({ children, classNames }: Props): React$Element<'pre'> {
  const node = useRef();

  useEffect(() => {
    highlightjs.highlightBlock(node.current);
  }, []);

  return (
    <pre ref={node} className={classNames}>
      <code>{children}</code>
    </pre>
  );
}
