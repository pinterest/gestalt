// @flow strict
import React, { type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Button from './Button.js';
import Heading from './Heading.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Image from './Image.js';
import Mask from './Mask.js';
import Text from './Text.js';
import styles from './Upsell.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import {
  ActionDataPropType,
  DismissButtonPropType,
  type ActionDataType,
  type DismissButtonType,
} from './commonTypes.js';

type Props = {|
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
  title?: string,
|};

const UpsellAction = ({
  data,
  stacked,
  type,
}: {|
  data: ActionDataType,
  stacked?: boolean,
  type: string,
|}): Node => {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, href, label, onClick, onNavigationOptions, rel, target } = data;

  return (
    <Box
      display="block"
      smDisplay="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'secondary' && stacked ? 2 : undefined}
      smMarginTop="auto"
      smMarginBottom="auto"
    >
      {href ? (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          href={href}
          onClick={onClick}
          onNavigationOptions={onNavigationOptions}
          rel={rel}
          role="link"
          size="lg"
          target={target}
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          onClick={onClick}
          role="button"
          size="lg"
          text={label}
        />
      )}
    </Box>
  );
};

export default function Upsell({
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  title,
}: Props): Node {
  const isImage = imageData?.component && imageData.component.type === Image;
  const responsiveMinWidth = useResponsiveMinWidth();

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
      <Box smDisplay="flex" wrap width="100%" smMarginTop={-3} smMarginBottom={-3}>
        <Box
          display="flex"
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
              width={isImage ? Math.min(imageData.width || 128, 128) : undefined}
              flex="none"
            >
              <Mask rounding={imageData.mask?.rounding || 0} wash={imageData.mask?.wash || false}>
                {imageData.component}
              </Mask>
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
              {title && (
                <Box marginBottom={2}>
                  <Heading align={responsiveMinWidth === 'xs' ? 'center' : undefined} size="sm">
                    {title}
                  </Heading>
                </Box>
              )}
              <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
            </Box>
          </Box>
        </Box>
        <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
          {secondaryAction && responsiveMinWidth !== 'xs' && (
            <UpsellAction type="secondary" data={secondaryAction} />
          )}
          {primaryAction && <UpsellAction type="primary" data={primaryAction} />}
          {secondaryAction && responsiveMinWidth === 'xs' && (
            <UpsellAction type="secondary" data={secondaryAction} stacked={!!secondaryAction} />
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
  title: PropTypes.string,
};
