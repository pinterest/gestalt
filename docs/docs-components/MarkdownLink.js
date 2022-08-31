// @flow strict
import { type Node } from 'react';
import { Box, Link, Text } from 'gestalt';
import LINKS from './LINK_REPOSITORY.js';

type Props = {|
  href: string,
  text: string,
|};

const isHttp = (string): boolean => {
  return string?.startsWith('https://') || string?.startsWith('http://');
};

export const getUrl = (href: string): string => {
  const containsCanonical = href?.startsWith('https://gestalt.pinterest.systems/');
  const isRelativePathname = href?.startsWith('/');

  if (containsCanonical) {
    throw new Error(
      "Use relative pathnames: '/web' instead of 'https://gestalt.pinterest.systems/web'",
    );
  }

  let url = href;

  if (!isRelativePathname && !isHttp(href)) {
    url = LINKS[href];
  }

  return url;
};

export default function MarkdownLink({ text, href }: Props): Node {
  const url = getUrl(href);

  return (
    <Text inline size="300">
      <Link externalLinkIcon={isHttp(url) ? 'default' : 'none'} inline href={url}>
        {text}
      </Link>
    </Text>
  );
}
