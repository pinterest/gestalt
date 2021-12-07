// @flow strict
import type { Node } from 'react';
import { Text } from 'gestalt';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';
import sidebarIndex from './sidebarIndex.js';

type Props = {|
  textColor?:
    | 'green'
    | 'pine'
    | 'olive'
    | 'blue'
    | 'navy'
    | 'midnight'
    | 'purple'
    | 'orchid'
    | 'eggplant'
    | 'maroon'
    | 'watermelon'
    | 'orange'
    | 'darkGray'
    | 'gray'
    | 'lightGray'
    | 'red'
    | 'white',
  text: string,
  type?: string,
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

const makePullRequestLink = (listitem) => {
  const pullRequestNumRegex = /\(#\d*\)/g;
  let pullRequestNum = listitem.match(pullRequestNumRegex);
  if (pullRequestNum && pullRequestNum.length > 0) {
    pullRequestNum = pullRequestNum[0].replace(/\D/g, '');
    const pullRequestURL = `https://github.com/pinterest/gestalt/pull/${pullRequestNum}`;
    const pullRequestAnchor = `(<a href=${pullRequestURL}>#${pullRequestNum}</a>)\n`;
    const listItemWithLink = listitem.replace(pullRequestNumRegex, pullRequestAnchor);
    return listItemWithLink;
  }
  return listitem;
};

const formatComponentName = (listitem) => {
  const currentComponents = sidebarIndex.reduce(
    (acc, currentValue) => [...acc, ...currentValue.pages],
    [],
  );
  const namesAndUpdate = listitem.split(':', 2);

  if (namesAndUpdate.length > 1) {
    const componentLinks = namesAndUpdate[0].replace(/\w+/gm, (match) => {
      if (currentComponents.includes(match)) {
        return `<a href="https://gestalt.pinterest.systems/${match.toLowerCase()}">${match}</a>`;
      }
      return match;
    });

    const formattedListItem = `${componentLinks}:${namesAndUpdate[1]}`;
    return formattedListItem;
  }

  return listitem;
};

export default function Markdown({ textColor, text, type }: Props): Node {
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

  if (type === 'changelog') {
    renderer.listitem = (listitem) =>
      `<li>${makePullRequestLink(formatComponentName(listitem))}</li>`;
  }

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
