import { ReactNode } from 'react';
import { TypeOptions } from 'packages/gestalt/src/Badge';
import slugify from 'slugify';
import { Badge, Box, Flex, Heading } from 'gestalt';
import CopyLinkButton from './buttons/CopyLinkButton';
import { DOCS_COPY_MAX_WIDTH_PX } from './consts';
import Markdown from './Markdown';

type Props = {
  children?: ReactNode;
  badge?: {
    text: string;
    tooltipText: string;
    type?: TypeOptions;
  };
  badgeSecondary?: {
    text: string;
    tooltipText: string;
    type?: TypeOptions;
  };
  description?: string;
  headingSize?: '400' | '500';
  id?: string;
  name: string;
  toggle?: ReactNode;
  stacked?: boolean;
  showHeading?: boolean;
};

export const copyToClipboard = (hash: string): boolean => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return false;
  }
  const url = window.location;
  url.hash = hash;

  try {
    // @ts-expect-error - TS2345 - Argument of type 'Location' is not assignable to parameter of type 'string'.
    navigator.clipboard.writeText(url);
  } catch (err: any) {
    return false;
  }
  return true;
};

export default function Card({
  children,
  badge,
  badgeSecondary,
  description,
  headingSize = '500',
  id,
  name,
  toggle,
  stacked = false,
  showHeading = true,
}: Props) {
  const slugifiedId = id ?? slugify(name);

  return (
    <Box>
      {showHeading && (
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              scrollMarginTop: 90,
            },
          }}
          data-anchor
          id={slugifiedId}
          marginBottom={description ? 2 : 4}
        >
          <Flex
            alignItems="center"
            gap={{
              row: 2,
              column: 0,
            }}
          >
            <Heading size={headingSize}>{name}</Heading>
            {badge ? (
              <Badge
                position="middle"
                text={badge.text}
                tooltip={{ text: badge.tooltipText }}
                type={badge.type || undefined}
              />
            ) : null}
            {badgeSecondary ? (
              <Badge
                position="middle"
                text={badgeSecondary.text}
                tooltip={{ text: badgeSecondary.tooltipText }}
                type={badgeSecondary.type || undefined}
              />
            ) : null}
            <CopyLinkButton
              name={name}
              onClick={() => {
                copyToClipboard(slugifiedId);
              }}
            />

            {toggle}
          </Flex>
        </Box>
      )}

      <Box direction={stacked ? 'column' : 'row'} display="flex" marginEnd={-2} marginStart={-2}>
        <Box color="default" column={12} paddingX={2}>
          {description && (
            <Box marginBottom={8} maxWidth={DOCS_COPY_MAX_WIDTH_PX}>
              <Markdown text={description} />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
