// @flow strict
import React, { type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Image from './Image.js';
import Button from './Button.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import styles from './Upsell.css';

type LinkData = {|
  accessibilityLabel?: string,
  href: string,
  label: string,
  onClick?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
  >,
|};

type Props = {|
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  imageData?: {|
    component: Element<typeof Image | typeof Icon>,
    width?: number,
  |},
  message: string,
  primaryLink?: LinkData,
  secondaryLink?: LinkData,
  title?: string,
|};

const UpsellLink = ({
  data,
  stacked,
  type,
}: {|
  data: LinkData,
  stacked?: boolean,
  type: string,
|}): Node => {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, href, label, onClick } = data;

  return (
    <Box
      display="block"
      smDisplay="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'primary' && stacked ? 2 : undefined}
      smMarginTop="auto"
      smMarginBottom="auto"
    >
      <Button
        accessibilityLabel={accessibilityLabel}
        color={color}
        href={href}
        onClick={onClick}
        role="link"
        size="lg"
        text={label}
      />
    </Box>
  );
};

export default function Upsell({
  dismissButton,
  imageData,
  message,
  primaryLink,
  secondaryLink,
  title,
}: Props): Node {
  const isImage = imageData?.component && imageData.component.type === Image;

  return (
    <Box
      display="flex"
      direction="column"
      smDirection="row"
      padding={6}
      smPadding={8}
      position="relative"
      rounding={4}
      borderStyle="shadow"
    >
      <Box
        smDisplay="flex"
        wrap
        width="100%"
        smMarginTop={-3}
        smMarginBottom={-3}
      >
        <Box
          display="flex"
          direction="column"
          smDirection="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={primaryLink || secondaryLink ? 4 : undefined}
          smMarginBottom={primaryLink || secondaryLink ? 0 : undefined}
          smPaddingY={3}
        >
          {imageData && (
            <Box
              marginBottom={4}
              smMarginBottom={0}
              width={
                isImage ? Math.min(imageData.width || 128, 128) : undefined
              }
              flex="none"
            >
              {imageData.component}
            </Box>
          )}
          <Box maxWidth={648}>
            <Box
              display="flex"
              smDisplay="block"
              direction="column"
              alignItems="center"
              marginBottom="auto"
              marginTop="auto"
              marginEnd={0}
              marginStart={0}
              smMarginEnd={6}
              smMarginStart={imageData ? 6 : 0}
            >
              {/* We repeat this code block to ensure that text is 
              centered for our smaller displays and left aligned 
              for larger displays */}
              <Box smDisplay="none">
                {title && (
                  <Box marginBottom={2}>
                    <Heading align="center" size="sm">
                      {title}
                    </Heading>
                  </Box>
                )}
                <Text align="center">{message}</Text>
              </Box>
              <Box smDisplay="block" display="none">
                {title && (
                  <Box marginBottom={2}>
                    <Heading size="sm">{title}</Heading>
                  </Box>
                )}
                <Text>{message}</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
          {secondaryLink && (
            <UpsellLink type="secondary" data={secondaryLink} />
          )}
          {primaryLink && (
            <UpsellLink
              stacked={!!secondaryLink}
              type="primary"
              data={primaryLink}
            />
          )}
        </Box>
      </Box>
      {dismissButton && (
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel}
            icon="cancel"
            iconColor="darkGray"
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

Upsell.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  dismissButton: PropTypes.shape({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  imageData: PropTypes.shape({
    component: PropTypes.node.isRequired,
    width: PropTypes.number,
  }),
  message: PropTypes.string.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  primaryLink: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  secondaryLink: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    accessibilityLabel: PropTypes.string,
  }),
  title: PropTypes.string,
};
