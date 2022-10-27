// @flow strict
import { cloneElement, useState, useRef, Fragment, type Element, type Node } from 'react';
import Box from './Box.js';
import Heading from './Heading.js';
import Badge from './Badge.js';
import Tooltip from './Tooltip.js';
import IconButton from './IconButton.js';
import Text from './Text.js';
import Link from './Link.js';
import Icon from './Icon.js';
import Spinner from './Spinner.js';
import Flex from './Flex.js';
import Mask from './Mask.js';
import Image from './Image.js';
import Dropdown from './Dropdown.js';
import { type ActionType } from './PageHeader.js';
import ColorSchemeProvider, { useColorScheme } from './contexts/ColorSchemeProvider.js';

export function ToastMessage({
  align,
  text,
  helperLink,
  textColor,
  type,
}: {|
  align: $ElementType<React$ElementConfig<typeof Text>, 'align'>,
  text: string,
  textColor: $ElementType<React$ElementConfig<typeof Text>, 'color'>,
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
  type?: 'success' | 'error' | 'progress',
|}): Node {
  return (
    <Box dangerouslySetInlineStyle={{ __style: { marginTop: '6px' } }}>
      <Text inline align={align} color={textColor} weight={type === 'error' ? 'bold' : undefined}>
        {text}
        {helperLink ? (
          <Fragment>
            {' '}
            <Text inline color={textColor} weight={type === 'error' ? 'bold' : undefined}>
              <Link
                accessibilityLabel={helperLink.accessibilityLabel}
                href={helperLink.href}
                onClick={helperLink.onClick}
                target="blank"
                inline
              >
                {helperLink.text}
              </Link>
            </Text>
          </Fragment>
        ) : null}
      </Text>
    </Box>
  );
}

export function ToastTypeThumbnail({ type }: {| type?: 'success' | 'error' | 'progress' |}): Node {
  const { name: colorSchemeName } = useColorScheme();

  return (
    <Flex.Item flex="none">
      {type === 'error' ? (
        <Icon
          color="inverse"
          icon="workflow-status-problem"
          accessibilityLabel="problem"
          size={32}
        />
      ) : null}
      {type === 'success' ? (
        <ColorSchemeProvider colorScheme={colorSchemeName === 'darkMode' ? 'light' : 'dark'}>
          <Icon color="success" icon="workflow-status-ok" accessibilityLabel="success" size={32} />
        </ColorSchemeProvider>
      ) : null}
      {type === 'progress' ? (
        <Spinner accessibilityLabel="progress" color="default" show size="sm" />
      ) : null}
    </Flex.Item>
  );
}
