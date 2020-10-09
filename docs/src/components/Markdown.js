// @flow strict
import React, { type Node } from 'react';
import { Text } from 'gestalt';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import './Markdown.css';
import 'highlight.js/styles/a11y-light.css';

type Props = {|
  text: string,
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

export default function Markdown({ text }: Props): Node {
  const renderer = new Renderer();

  renderer.heading = (input, level) => {
    const escapedText = input.toLowerCase().replace(/[^\w]+/g, '-');

    return `
      <h${level}>
        ${
          level === 2
            ? `<div data-anchor>
              <a id="${escapedText}" className="anchor" href="#${escapedText}">
                <span className="header-link" />
              </a>
            </div>`
            : ''
        }
        ${input}
      </h${level}>`;
  };

  const html = marked(stripIndent(text), {
    renderer,
    highlight(code, language) {
      const validLanguage = highlightjs.getLanguage(language)
        ? language
        : 'plaintext';
      return highlightjs.highlight(validLanguage, code).value;
    },
    breaks: true,
  });

  return (
    <Text>
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
      />
    </Text>
  );
}
