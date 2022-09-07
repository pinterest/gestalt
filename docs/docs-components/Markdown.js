// @flow strict
import { type Node } from 'react';
import { Text } from 'gestalt';
import { marked, Renderer } from 'marked';
import highlightjs from 'highlight.js';
import { checkUrl, isPinchLink } from './MarkdownLink.js';
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

export default function Markdown({ textColor, text }: Props): Node {
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

  renderer.link = (href, title, children) =>
    isPinchLink(href)
      ? `<div style="display:inline;">
      <a aria-label="${href}: Access is restricted to Pinterest employees" href=${checkUrl({
          href,
        })}>
        ${children}
      </a>
      <div style="display:inline;" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 25 25">
          <path d="M8 10V7c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8zm11 .017V7c0-3.86-3.141-7-7-7S5 3.14 5 7v3.017a8.698 8.698 0 0 0-1.75 5.233 8.75 8.75 0 1 0 17.5 0A8.698 8.698 0 0 0 19 10.017z" />
        </svg>
      </div>
    </div>`
      : `<a href=${checkUrl({ href })}>${children}</a>`;

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
