// @flow strict
import React, { type Node } from 'react';
import { Text } from 'gestalt';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js';
import './Markdown.css';
import 'highlight.js/styles/a11y-light.css';

type Props = {|
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

  const indent = Math.min(...match.map(x => x.length));

  if (indent === 0) {
    return str;
  }

  const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');
  return str.replace(re, '');
};

const makePullRequestLink = listitem => {
  const pullRequestNumRegex = /\(#\d*\)/g;
  let pullRequestNum = listitem.match(pullRequestNumRegex);
  if (pullRequestNum && pullRequestNum.length > 0) {
    pullRequestNum = pullRequestNum[0].replace(/\D/g, '');
    const pullRequestURL = `https://github.com/pinterest/gestalt/pull/${pullRequestNum}`;
    const pullRequestAnchor = `(<a href=${pullRequestURL}>#${pullRequestNum}</a>)\n`;
    const listItemWithLink = listitem.replace(
      pullRequestNumRegex,
      pullRequestAnchor
    );
    return listItemWithLink;
  }
  return listitem;
};

const formatComponentName = listitem => {
  const componentNamesToIgnore = ['doc', 'docs', 'internal', 'codemod'];
  const nameAndUpdate = listitem.split(':', 2);
  const componentName = nameAndUpdate[0];
  if (
    !componentNamesToIgnore.includes(componentName.toLowerCase()) &&
    nameAndUpdate.length > 1
  ) {
    const componentURL = `https://gestalt.netlify.app/${componentName}`;
    const formattedListItem = `<a href="${componentURL}">${componentName}</a>:${nameAndUpdate[1]}`;
    return formattedListItem;
  }

  return listitem;
};

export default function Markdown({ text, type }: Props): Node {
  const renderer = new Renderer();
  renderer.heading = (input, level) => {
    const escapedText = input.toLowerCase().replace(/[^\w]+/g, '-');

    return `
      <h${level}>
        ${input}
        ${
          level === 2
            ? `
              <a id="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link" />
              </a>`
            : ''
        }
      </h${level}>`;
  };

  if (type === 'changelog') {
    renderer.listitem = listitem =>
      `<li>${makePullRequestLink(formatComponentName(listitem))}</li>`;
  }

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
