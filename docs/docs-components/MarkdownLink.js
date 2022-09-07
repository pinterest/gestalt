// @flow strict
import { type Node } from 'react';
import { Box, Link, Text, Tooltip, TapArea, Icon } from 'gestalt';

export const isHttp = (value: string): boolean =>
  value?.startsWith('https://') || value?.startsWith('http://');

export const isPinchLink = (value: string): boolean =>
  value?.startsWith('https://pinch.pinadmin.com/') ||
  value?.startsWith('http://pinch.pinadmin.com/');

export const checkUrl = ({ href }: {| href: string |}): string => {
  const docsCanonical = 'https://gestalt.pinterest.systems/';

  const notAllowedCanonicals = [
    'https://www.figma.com/file',
    'https://www.dropbox.com',
    'https://docs.google.com',
    'https://w.pinadmin.com',
    'https://coda.io',
  ];

  notAllowedCanonicals.forEach((canonical) => {
    if (href.startsWith(canonical)) {
      throw new Error(
        `Replace the url ${href} with a Pinch link https://pinch.pinadmin.com/ and register it here http://pinch.pinadmin.com/pinchLinks`,
      );
    }
  });

  const containsDocsCanonical = href !== docsCanonical && href?.startsWith(docsCanonical);

  if (containsDocsCanonical) {
    throw new Error(
      "Use relative pathnames: '/web' instead of 'https://gestalt.pinterest.systems/web'",
    );
  }

  return href;
};

type Props = {|
  href: string,
  text: string,
|};

export default function MarkdownLink({ text, href }: Props): Node {
  return isPinchLink(href) ? (
    <Text inline size="300">
      <Link inline href={href} target="blank">
        {text}
        <Box marginStart={1} display="inlineBlock">
          <Tooltip text="Access is restricted to Pinterest employees" accessibilityLabel="" inline>
            <TapArea rounding="circle" fullWidth={false}>
              <Icon
                accessibilityLabel="Access is restricted to Pinterest employees"
                icon="lock"
                color="default"
                size={16}
              />
            </TapArea>
          </Tooltip>
        </Box>
      </Link>
    </Text>
  ) : (
    <Text inline size="300">
      <Link externalLinkIcon={isHttp(href) ? 'default' : 'none'} inline href={checkUrl({ href })}>
        {text}
      </Link>
    </Text>
  );
}
