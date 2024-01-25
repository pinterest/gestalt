// @flow strict
import { Children, type Element, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import styles from './BannerUpsell.css';
import BannerUpsellForm from './BannerUpsellForm';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import IconButton from './IconButton';
import Image from './Image';
import Mask from './Mask';
import Text from './Text';
import useResponsiveMinWidth from './useResponsiveMinWidth';

export type ActionDataType =
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      href: string,
      label: string,
      onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: 'none' | 'nofollow',
      role: 'link',
      target?: null | 'self' | 'blank',
    }
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      label: string,
      onClick: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
      role?: 'button',
    };

type UpsellActionProps = {
  data: ActionDataType,
  stacked?: boolean,
  type: string,
};

function UpsellAction({ data, stacked, type }: UpsellActionProps): ReactNode {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, disabled, label } = data;

  const commonProps = {
    accessibilityLabel,
    color,
    disabled,
    fullWidth: true,
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
      {data.role === 'link' ? (
        <ButtonLink
          {...commonProps}
          onClick={data.onClick}
          href={data.href ?? ''}
          rel={data.rel}
          target={data.target}
        />
      ) : (
        <Button {...commonProps} onClick={data.onClick} />
      )}
    </Box>
  );
}

type Props = {
  /**
   * To create forms within BannerUpsell, pass BannerUpsell.Form as children.
   */
  children?: Element<typeof BannerUpsellForm>,
  /**
   * Adds a dismiss button to the BannerUpsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  dismissButton?: {
    accessibilityLabel?: string,
    onDismiss: () => void,
  },
  /**
   * Either an [Icon](https://gestalt.pinterest.systems/web/icon) or an [Image](https://gestalt.pinterest.systems/web/image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](https://gestalt.pinterest.systems/web/bannerupsell#Icon) and [Image](https://gestalt.pinterest.systems/web/bannerupsell#Image) variants for more info.
   */
  imageData?: {
    component: Element<typeof Image | typeof Icon>,
    mask?: {
      rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      wash?: boolean,
    },
    width?: number,
  },
  /**
   * Main content of BannerUpsell, explains what is being offered or recommended. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/bannerupsell#Message) to learn more.
   */
  message: string | Element<typeof Text>,
  /**
   * Main action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  primaryAction?: ActionDataType,
  /**
   * Secondary action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  secondaryAction?: ActionDataType,
  /**
   * Brief title summarizing the BannerUpsell. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization).
   */
  title?: string,
};

/**
 * [BannerUpsells](https://gestalt.pinterest.systems/web/bannerupsell) are banners that display short messages that focus on promoting an action or upgrading something the user already has.
 *
 *
 * ![BannerUpsell light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell.spec.mjs-snapshots/BannerUpsell-chromium-darwin.png)
 * ![BannerUpsell dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell-dark.spec.mjs-snapshots/BannerUpsell-dark-chromium-darwin.png)
 */
export default function BannerUpsell({
  children,
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  title,
}: Props): ReactNode {
  const isImage = imageData?.component && imageData.component.type === Image;
  const responsiveMinWidth = useResponsiveMinWidth();
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('BannerUpsell');
  const hasActions = Boolean(primaryAction || secondaryAction);
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  let messageElement: Element<'span'> | Element<typeof Text>;

  if (typeof message === 'string') {
    messageElement = (
      <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
    );
  }
  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  if (
    typeof message !== 'string' &&
    Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
  ) {
    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    const textAligmentOverrideStyles =
      responsiveMinWidth === 'xs'
        ? styles.textAligmentOverrideCenter
        : styles.textAligmentOverrideStart;

    messageElement = (
      <span className={classnames(textColorOverrideStyles, textAligmentOverrideStyles)}>
        {message}
      </span>
    );
  }

  return (
    <Box
      borderStyle="shadow"
      color={isDarkMode ? 'elevationFloating' : 'default'}
      display="flex"
      direction="column"
      smDirection="row"
      paddingY={6}
      paddingX={12}
      smPadding={8}
      position="relative"
      rounding={4}
    >
      <Box smDisplay="flex" smMarginTop={-3} smMarginBottom={-3} width="100%" wrap>
        <Box
          alignItems="center"
          direction="column"
          smDirection="row"
          display="flex"
          flex={children ? 'grow' : 'shrink'}
          justifyContent="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
          smPaddingY={3}
        >
          {imageData && (
            <Box
              alignSelf={responsiveMinWidth === 'xs' ? 'center' : undefined}
              flex="none"
              marginBottom={4}
              smMarginBottom={0}
              width={isImage ? Math.min(imageData.width || 128, 128) : undefined}
            >
              <Mask rounding={imageData.mask?.rounding || 0} wash={imageData.mask?.wash || false}>
                {imageData.component}
              </Mask>
            </Box>
          )}
          <Box
            alignItems="center"
            direction="column"
            display="flex"
            smDisplay="block"
            flex={children ? 'grow' : 'shrink'}
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
                  <Text
                    size="400"
                    weight="bold"
                    align={responsiveMinWidth === 'xs' ? 'center' : 'start'}
                  >
                    {title}
                  </Text>
                </Box>
              )}
              {messageElement}
            </Box>
            {children && (
              <Box
                smDisplay="flex"
                flex="grow"
                justifyContent="end"
                marginTop={responsiveMinWidth === 'xs' ? 2 : undefined}
                smMarginEnd={4}
                smPaddingY={3}
                width="100%"
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
            accessibilityLabel={dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel}
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

BannerUpsell.Form = BannerUpsellForm;
