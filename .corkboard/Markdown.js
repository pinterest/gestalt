// @flow
import React from 'react';
import Text from '../src/Text/Text';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import '!style!css!./AtomDark.css';

type Props = {|
  text: string,
|};

// Source: https://github.com/Thinkmill/react-markings/blob/master/index.js
// which originally got it from https://github.com/sindresorhus/strip-indent
const stripIndent = (str: string): string => {
  var match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  var indent = Math.min.apply(
    Math,
    match.map(function(x) {
      return x.length;
    })
  );

  if (indent === 0) {
    return str;
  }

  var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  return str.replace(re, '');
};

export default ({ text }: Props) => {
  const renderer = new Renderer();

  renderer.code = (code, language) => {
    const highlight = highlightjs.highlight(language, code).value;
    return `<pre><code class="hljs ${language}">${highlight}</code></pre>`;
  };

  const html = marked(stripIndent(text), { renderer });

  return (
    <Text leading="tall">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Text>
  );
};
