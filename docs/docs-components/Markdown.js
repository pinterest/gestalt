// @flow strict
import { type Node } from 'react';
import { Text } from 'gestalt';
import { marked, Renderer } from 'marked';
import { getUrl } from './MarkdownLink.js';
import highlightjs from 'highlight.js';
import LINKS from './LINK_REPOSITORY.js';

import 'highlight.js/styles/a11y-light.css';

type Props = {|
  textColor?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'inverse'
    | 'light'
    | 'dark',
  text: string,
  allowCanonical?: boolean,
|};

// Source: https://github.com/Thinkmill/react-markings/blob/master/index.js
// which originally got it from https://github.com/sindresorhus/strip-indent
const stripIndent = (str: string): string => {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  const indent = Math.min(...match.map((x) => x.length));

  if (indent === 0) {
    return str;
  }

  const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  return str.replace(re, '');
};

export default function Markdown({ textColor, text, allowCanonical }: Props): Node {
  const renderer = new Renderer();
  renderer.heading = (input, level) => {
    const escapedText = input
      .toLowerCase()
      .replace(/[^\w]+/g, '-')
      .replace(/[-]+$/gm, '');

    return `
      <h${level}>
        ${input}
        ${
          level === 2
            ? `
              <a id="${escapedText}" class="anchor" href="#${escapedText}" aria-label="Version ${escapedText} - Anchor Tag">
                <span class="header-link" />
              </a>`
            : ''
        }
      </h${level}>`;
  };

  renderer.link = (href, title, children) => {
    return `<a href=${allowCanonical ? href : getUrl(href)}>${children}</a>`;
  };
  const html = marked(stripIndent(text), {
    renderer,
    highlight(code, language) {
      const validLanguage = highlightjs.getLanguage(language) ? language : 'plaintext';
      return highlightjs.highlight(validLanguage, code).value;
    },
    breaks: true,
  });

  return (
    <Text color={textColor}>
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
      />
    </Text>
  );
}
