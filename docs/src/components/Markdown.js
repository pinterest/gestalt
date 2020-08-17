// @flow strict
import React, { useEffect, useState } from 'react';
import { Text } from 'gestalt';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import './Markdown.css';

type Props = {|
  fetchFile?: boolean,
  text: string,
  size?: 'md' | 'lg',
|};

// Source: https://github.com/Thinkmill/react-markings/blob/master/index.js
// which originally got it from https://github.com/sindresorhus/strip-indent
const stripIndent = (str: string): string => {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  const indent = Math.min(...match.map(x => x.length));

  if (indent === 0) {
    return str;
  }

  const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  return str.replace(re, '');
};

export default function Markdown({
  fetchFile = false,
  text,
  size = 'lg',
}: Props) {
  const [fetchedText, setFetchedText] = useState(null);
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const highlight = highlightjs.highlight(language, code).value;
    return `<pre><code class="hljs ${language}">${highlight}</code></pre>`;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(text);
      const responseText = await response.text();
      setFetchedText(responseText);
    }
    if (fetchFile) {
      fetchData();
    }
  }, [fetchFile, setFetchedText, text]);

  const html = marked(stripIndent(fetchFile ? fetchedText || '' : text), {
    renderer,
  });

  return (
    <Text size={size}>
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
      />
    </Text>
  );
}
