import 'highlight.js/styles/a11y-light.css';
import { ReactNode } from 'react';
import highlightjs from 'highlight.js';
// @ts-expect-error - TS7016 - Could not find a declaration file for module 'marked'. '/home/jackhsu/code/gestalt/node_modules/marked/lib/marked.cjs' implicitly has an 'any' type.
import { marked, Renderer } from 'marked';
import { Text } from 'gestalt';

type Props = {
  textColor?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'inverse'
    | 'light'
    | 'dark';
  text: string;
};

// Source: https://github.com/Thinkmill/react-markings/blob/master/index.js
// which originally got it from https://github.com/sindresorhus/strip-indent
const stripIndent = (str: string): string => {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) {
    return str;
  }

  const arrayMatch = match.map((x) => x.length);
  const indent = Math.min(...arrayMatch);

  if (indent === 0) {
    return str;
  }

  const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  return str.replace(re, '');
};

export default function Markdown({ textColor, text }: Props) {
  const renderer = new Renderer();

// @ts-expect-error - TS7006 - Parameter 'href' implicitly has an 'any' type. | TS7006 - Parameter 'title' implicitly has an 'any' type. | TS7006 - Parameter 'linktext' implicitly has an 'any' type.
  renderer.link = (href, title, linktext) => `
              <a class="anchor" ${
                href.startsWith('https://') || href.startsWith('http://') ? "target='blank'" : ''
              }} href="${href}">${`${linktext}`}</a>`;

// @ts-expect-error - TS7006 - Parameter 'input' implicitly has an 'any' type. | TS7006 - Parameter 'level' implicitly has an 'any' type.
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

  const html = marked(stripIndent(text), {
    renderer,
// @ts-expect-error - TS7006 - Parameter 'code' implicitly has an 'any' type. | TS7006 - Parameter 'language' implicitly has an 'any' type.
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
