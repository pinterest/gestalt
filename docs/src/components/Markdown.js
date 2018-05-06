// @flow
import React from 'react';
import { Text } from 'gestalt';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import './AtomDark.css';
import './Markdown.css';

type Props = {|
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

export default function Markdown({ text, size = 'md' }: Props) {
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const highlight = highlightjs.highlight(language, code).value;
    return `<pre><code class="hljs ${language}">${highlight}</code></pre>`;
  };

  const html = marked(stripIndent(text), { renderer });

  return (
    <Text leading="tall" size={size}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="Markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </Text>
  );
}
