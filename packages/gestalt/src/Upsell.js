// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Heading from './Heading.js';
import IconButton from './IconButton.js';
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
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'primary' && stacked ? 2 : undefined}
      mdMarginTop="auto"
      mdMarginBottom="auto"
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
  message,
  primaryLink,
  secondaryLink,
  title,
}: Props): Node {
  return (
    <Box
      display="flex"
      direction="column"
      mdDirection="row"
      padding={6}
      mdPadding={8}
      position="relative"
      rounding={4}
      borderStyle="shadow"
    >
      <Box
        mdDisplay="flex"
        wrap
        width="100%"
        mdMarginTop={-3}
        mdMarginBottom={-3}
      >
        <Box
          display="flex"
          marginBottom={primaryLink || secondaryLink ? 4 : undefined}
          mdMarginBottom={primaryLink || secondaryLink ? 0 : undefined}
          mdPaddingY={3}
        >
          <Box marginBottom="auto" marginTop="auto" maxWidth={648} paddingX={6}>
            {title && (
              <Box marginBottom={2}>
                <Heading size="sm">{title}</Heading>
              </Box>
            )}
            <Text>{message}</Text>
          </Box>
        </Box>
        <Box mdDisplay="flex" marginStart="auto" mdMarginEnd={4} mdPaddingY={3}>
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
  dismissButton: PropTypes.exact({
    accessibilityLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
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
