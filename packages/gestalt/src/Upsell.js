// @flow strict
import type { Element, Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Button from './Button.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Image from './Image.js';
import Mask from './Mask.js';
import Text from './Text.js';
import UpsellForm from './UpsellForm.js';
import styles from './Upsell.css';
import headingStyles from './Heading.css';
import typography from './Typography.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import { type ActionDataType } from './commonTypes.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type UpsellActionProps = {|
  data: ActionDataType,
  stacked?: boolean,
  type: string,
|};

const UpsellAction = ({ data, stacked, type }: UpsellActionProps): Node => {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, disabled, href, label, onClick, rel, target } = data;

  const commonProps = {
    accessibilityLabel,
    color,
    disabled,
    fullWidth: true,
    onClick,
    size: 'lg',
    text: label,
  };

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
        <Button {...commonProps} href={href} rel={rel} role="link" target={target} />
      ) : (
        <Button {...commonProps} role="button" />
      )}
    </Box>
  );
};

type Props = {|
  /**
   * To create forms within Upsell, pass Upsell.Form as children.
   */
  children?: Element<typeof UpsellForm>,
  /**
   * Adds a dismiss button to the Upsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
   */
  dismissButton?: {|
    accessibilityLabel: string,
    onDismiss: () => void,
  |},
  /**
   * Either an [Icon](/icon) or an [Image](/image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](#Icon) and [Image](#Image) variants for more info.
   */
  imageData?: {|
    component: Element<typeof Image | typeof Icon>,
    mask?: {|
      rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      wash?: boolean,
    |},
    width?: number,
  |},
  /**
   * Main content of Upsell, explains what is being offered or recommended. Content should be [localized](#Localization). See [Best Practices](#Best-practices) for more info.
   */
  message: string,
  /**
   * Main action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
   */
  primaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
      {| dangerouslyDisableOnNavigation: () => void |},
    >,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * Secondary action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](/onlinknavigationprovider) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](#Accessibility).
   */
  secondaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
      {| dangerouslyDisableOnNavigation: () => void |},
    >,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * Brief title summarizing the Upsell. Content should be [localized](#Localization).
   */
  title?: string,
|};

/**
 * [Upsells](https://gestalt.pinterest.systems/upsell) are banners that display short messages that focus on promoting an action or upgrading something the user already has.
 *
 * ⚠️ Please note: Upsell is not currently supported in dark mode.
 */
export default function Upsell({
  children,
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  title,
}: Props): Node {
  const isImage = imageData?.component && imageData.component.type === Image;
  const responsiveMinWidth = useResponsiveMinWidth();
  const titleClasses = classnames(
    headingStyles.TextLikeHeadingSm,
    responsiveMinWidth === 'xs' && typography.alignCenter,
  );
  const hasActions = Boolean(primaryAction || secondaryAction);

  return (
    <Box
      display="flex"
      direction="column"
      smDirection="row"
      paddingY={6}
      paddingX={12}
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
              width={isImage ? Math.min(imageData.width || 128, 128) : undefined}
              flex="none"
              alignSelf={responsiveMinWidth === 'xs' ? 'center' : undefined}
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
            <Box maxWidth={648}>
              {title && (
                <Box marginBottom={2}>
                  <p className={titleClasses}>{title}</p>
                </Box>
              )}
              <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
            </Box>
            {children && (
              <Box
                smDisplay="flex"
                flex="grow"
                width="100%"
                justifyContent="end"
                smMarginEnd={4}
                smPaddingY={3}
                marginTop={responsiveMinWidth === 'xs' ? 2 : undefined}
              >
                {children}
              </Box>
            )}
          </Box>
        </Box>
        {!children && hasActions && (
          <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
            {secondaryAction && responsiveMinWidth !== 'xs' && (
              <UpsellAction type="secondary" data={secondaryAction} />
            )}
            {primaryAction && <UpsellAction type="primary" data={primaryAction} />}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <UpsellAction type="secondary" data={secondaryAction} stacked={!!secondaryAction} />
            )}
          </Box>
        )}
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

Upsell.Form = UpsellForm;
