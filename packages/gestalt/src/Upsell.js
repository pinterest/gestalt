// @flow strict
import React, { type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Button from './Button.js';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Image from './Image.js';
import Mask from './Mask.js';
import Text from './Text.js';
import UpsellForm from './UpsellForm.js';
import styles from './Upsell.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import {
  ActionDataPropType,
  DismissButtonPropType,
  type ActionDataType,
  type DismissButtonType,
} from './commonTypes.js';

type UpsellActionProps = {|
  data: ActionDataType,
  stacked?: boolean,
  type: string,
|};

const UpsellAction = ({ data, stacked, type }: UpsellActionProps): Node => {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, href, label, onClick, rel, target } = data;

  const sharedProps = {
    accessibilityLabel,
    color,
    onClick,
    size: 'lg',
    text: label,
  };

  return (
    <Box
      alignItems="center"
      display="block"
      smDisplay="flex"
      justifyContent="center"
      marginTop={type === 'secondary' && stacked ? 2 : undefined}
      smMarginTop="auto"
      smMarginBottom="auto"
      paddingX={1}
    >
      {href ? (
        <Button {...sharedProps} href={href} rel={rel} role="link" target={target} />
      ) : (
        <Button {...sharedProps} role="button" />
      )}
    </Box>
  );
};

const CONTENT_MAX_WIDTH = 648;

type Props = {|
  children?: Element<typeof UpsellForm>,
  dismissButton?: DismissButtonType,
  imageData?: {|
    component: Element<typeof Image | typeof Icon>,
    mask?: {|
      rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      wash?: boolean,
    |},
    width?: number,
  |},
  message: string,
  primaryAction?: ActionDataType,
  secondaryAction?: ActionDataType,
  subtext?: string,
  title?: string,
|};

export default function Upsell({
  children,
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  subtext,
  title,
}: Props): Node {
  const isImage = imageData?.component.type === Image;
  const imageWidth = Math.min(imageData?.width || 128, 128);

  const responsiveMinWidth = useResponsiveMinWidth();
  const isXS = responsiveMinWidth === 'xs';

  const subtextDisplay = subtext ? (
    <Text align={isXS ? 'center' : undefined} color="gray" size="sm">
      {subtext}
    </Text>
  ) : null;

  const buttonsDisplay =
    primaryAction || secondaryAction ? (
      <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
        {secondaryAction && !isXS && <UpsellAction type="secondary" data={secondaryAction} />}
        {primaryAction && <UpsellAction type="primary" data={primaryAction} />}
        {secondaryAction && isXS && (
          <UpsellAction type="secondary" data={secondaryAction} stacked={!!secondaryAction} />
        )}
      </Box>
    ) : null;

  return (
    <Box
      display="flex"
      direction="column"
      padding={6}
      smPadding={8}
      position="relative"
      rounding={4}
      borderStyle="shadow"
    >
      <Box smDisplay="flex" wrap width="100%" smMarginTop={-3} smMarginBottom={-3}>
        <Box
          display="flex"
          flex={children ? 'grow' : 'shrink'}
          direction="column"
          smDirection="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
          smPaddingY={3}
        >
          {imageData && (
            <Box
              marginBottom={4}
              smMarginBottom={0}
              width={isImage ? imageWidth : undefined}
              flex="none"
              alignSelf={isXS ? 'center' : undefined}
            >
              <Mask rounding={imageData.mask?.rounding || 0} wash={imageData.mask?.wash || false}>
                {imageData.component}
              </Mask>
            </Box>
          )}

          <Box
            display="flex"
            flex={children ? 'grow' : 'shrink'}
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
            <Flex direction="column" gap={2} maxWidth={CONTENT_MAX_WIDTH}>
              {title && (
                <Heading align={isXS ? 'center' : undefined} size="sm">
                  {title}
                </Heading>
              )}

              <Text align={isXS ? 'center' : undefined}>{message}</Text>

              {(isXS || isImage) && subtextDisplay && <Box marginTop={2}>{subtextDisplay}</Box>}
            </Flex>

            {children && (
              <Box
                smDisplay="flex"
                flex="grow"
                width="100%"
                justifyContent="end"
                smMarginEnd={4}
                smPaddingY={3}
                marginTop={isXS ? 2 : undefined}
              >
                {children}
              </Box>
            )}
          </Box>
        </Box>

        {!children && buttonsDisplay}
      </Box>

      {!isXS && !isImage && subtextDisplay && (
        <Box marginTop={4}>
          <Flex gap={6}>
            {/* ICON/IMAGE SPACER */}
            {imageData && <Box aria-hidden flex="none" width={isImage ? imageWidth : 32} />}

            <Box maxWidth={CONTENT_MAX_WIDTH}>{subtextDisplay}</Box>

            {/* BUTTON(S) SPACER */}
            {buttonsDisplay && (
              <Flex.Item flex="none">
                <div aria-hidden style={{ height: 0, visibility: 'hidden' }}>
                  {buttonsDisplay}
                </div>
              </Flex.Item>
            )}
          </Flex>
        </Box>
      )}

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
  children: PropTypes.node,
  dismissButton: DismissButtonPropType,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  imageData: PropTypes.exact({
    component: PropTypes.node.isRequired,
    mask: PropTypes.shape({
      rounding: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 'circle']),
      wash: PropTypes.bool,
    }),
    width: PropTypes.number,
  }),
  message: PropTypes.string.isRequired,
  primaryAction: ActionDataPropType,
  secondaryAction: ActionDataPropType,
  subtext: PropTypes.string,
  title: PropTypes.string,
};

Upsell.Form = UpsellForm;
