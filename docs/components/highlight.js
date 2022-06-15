// @flow strict

import React, { useEffect, useRef } from 'react';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';

export default function Highlighter({
  children,
  classNames,
}: {|
  children: string | null,
  classNames: string[],
|}): React$Element<'pre'> {
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
