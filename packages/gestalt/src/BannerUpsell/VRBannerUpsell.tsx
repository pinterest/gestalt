import { Children, ComponentProps, ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_500, TOKEN_SPACE_800, TOKEN_SPACE_1000, TOKEN_SPACE_1300 } from 'gestalt-design-tokens';
import styles from '../BannerUpsell.css';
import BannerUpsellForm from '../BannerUpsellForm';
import Box from '../Box';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import IconButton from '../IconButton';
import Image from '../Image';
import Mask from '../Mask';
import Text from '../Text';
import useResponsiveMinWidth from '../useResponsiveMinWidth';

export type ActionDataType =
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      href: string;
      label: string;
      onClick?: ComponentProps<typeof ButtonLink>['onClick'];
      rel?: 'none' | 'nofollow';
      role: 'link';
      target?: null | 'self' | 'blank';
    }
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      label: string;
      onClick: ComponentProps<typeof Button>['onClick'];
      role?: 'button';
    };

type UpsellActionProps = {
  data: ActionDataType;
  stacked?: boolean;
  type: string;
  size?: string;
  twoButtons?: boolean;
};

function UpsellAction({ data, stacked, type, size, twoButtons }: UpsellActionProps) {
  const color = type === 'primary' ? 'red' : 'gray';
  const { accessibilityLabel, disabled, label } = data;

  const marginEnd = type === 'primary' && size === 'sm' && twoButtons ? 1 : undefined;
  const marginStart = type === 'secondary' && size === 'sm' && twoButtons ? 1 : undefined;
  const width = twoButtons ? '50%' : '100%';

  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={size === 'sm' ? { __style: { width } } : undefined}
      display="block"
      justifyContent={size === 'sm' ? undefined : 'center'}
      marginEnd={marginEnd}
      marginStart={marginStart}
      marginTop={type === 'secondary' && stacked ? 2 : undefined}
      paddingX={size === 'sm' ? undefined : 1}
      smDisplay="flex"
      smMarginBottom="auto"
      smMarginTop="auto"
      smPaddingX={size === 'sm' ? 2 : undefined}
    >
      {data.role === 'link' ? (
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          fullWidth
          href={data.href ?? ''}
          onClick={data.onClick}
          rel={data.rel}
          size={size === 'sm' ? 'md' : 'lg'}
          target={data.target}
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          fullWidth
          onClick={data.onClick}
          size={size === 'sm' ? 'md' : 'lg'}
          text={label}
        />
      )}
    </Box>
  );
}

type Props = {
  /**
   * To create forms within BannerUpsell, pass BannerUpsell.Form as children.
   */
  children?: ReactNode;
  /**
   * Adds a dismiss button to the BannerUpsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  /**
   * Either an [Icon](https://gestalt.pinterest.systems/web/icon) or an [Image](https://gestalt.pinterest.systems/web/image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](https://gestalt.pinterest.systems/web/bannerupsell#Icon) and [Image](https://gestalt.pinterest.systems/web/bannerupsell#Image) variants for more info.
   */
  imageData?: {
    component: ReactElement;
    mask?: {
      rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      wash?: boolean;
    };
    width?: number;
  };
  /**
   * Main content of BannerUpsell, explains what is being offered or recommended. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/bannerupsell#Message) to learn more.
   */
  message: string | ReactElement;
  /**
   * Main action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  primaryAction?: ActionDataType;
  /**
   * Secondary action for people to take on BannerUpsell. If \`href\` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility).
   */
  secondaryAction?: ActionDataType;
  /**
   * Brief title summarizing the BannerUpsell. Content should be [localized](https://gestalt.pinterest.systems/web/bannerupsell#Localization).
   */
  title?: string;
};

/**
 * [BannerUpsells](https://gestalt.pinterest.systems/web/bannerupsell) are banners that display short messages that focus on promoting an action or upgrading something the user already has.
 *
 *
 * ![BannerUpsell light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell.spec.ts-snapshots/BannerUpsell-chromium-darwin.png)
 * ![BannerUpsell dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerUpsell-dark.spec.ts-snapshots/BannerUpsell-dark-chromium-darwin.png)
 */
export default function BannerUpsell({
  children,
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  title,
}: Props) {
  const isImage = imageData?.component && imageData.component.type === Image;
  const responsiveMinWidth = useResponsiveMinWidth();
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('BannerUpsell');
  const hasActions = Boolean(primaryAction || secondaryAction);
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  let messageElement: ReactNode;

  if (typeof message === 'string') {
    messageElement = (
      <Text align={responsiveMinWidth === 'xs' ? 'start' : undefined}>{message}</Text>
    );
  }
  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  if (
    typeof message !== 'string' &&
    // @ts-expect-error - TS2339
    Children.only<ReactElement>(message).type.displayName === 'Text'
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

  const isRTL = document.documentElement.dir === 'rtl';

  return (
    <Box
      borderStyle="sm"
      color={isDarkMode ? 'elevationFloating' : 'default'}
      direction="column"
      display="flex"
      position="relative"
      rounding={4}
    >
      {/*
            SM BREAKPOINT
      */}
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            paddingRight: isRTL ? TOKEN_SPACE_500 : TOKEN_SPACE_1000,
            paddingLeft: isRTL ? TOKEN_SPACE_1000 : TOKEN_SPACE_500,
          },
        }}
        display="block"
        lgDisplay="none"
        paddingY={5}
        smDisplay="none"
        width="100%"
        wrap
      >
        <Box
          alignItems="start"
          direction="column"
          display="flex"
          flex={children ? 'grow' : 'shrink'}
          justifyContent="center"
          smDirection="row"
        >
          <Box
            alignItems="center"
            direction="column"
            display="flex"
            flex={children ? 'grow' : 'shrink'}
            marginBottom="auto"
            marginEnd={0}
            marginStart={0}
            smDisplay="block"
            smMarginEnd={6}
            smMarginStart={imageData ? 6 : 0}
          >
            <Box alignItems="start" maxWidth={648}>
              {title && (
                <Box marginBottom={2}>
                  {imageData && (
                    <Box
                      display="flex"
                      flex="none"
                      width={isImage ? Math.min(imageData.width || 128, 128) : undefined}
                    >
                      <Flex>
                        <Box marginEnd={3}>
                          <Mask
                            rounding={imageData.mask?.rounding || 0}
                            wash={imageData.mask?.wash || false}
                            width={32}
                          >
                            {imageData.component}
                          </Mask>
                        </Box>

                        <Heading align="start" size="400">
                          {title}
                        </Heading>
                      </Flex>
                    </Box>
                  )}
                </Box>
              )}
              {messageElement}
            </Box>
            {children && (
              <Box
                flex="grow"
                justifyContent="end"
                marginTop={responsiveMinWidth === 'xs' ? 2 : undefined}
                smDisplay="flex"
                smMarginEnd={4}
                smPaddingY={3}
                width="100%"
              >
                {children}
              </Box>
            )}
          </Box>
          {!children && hasActions && (
            <Box
              dangerouslySetInlineStyle={{ __style: { width: '100%' } }}
              direction="row"
              display="flex"
              marginTop={5}
            >
              {secondaryAction && responsiveMinWidth !== 'xs' && (
                <UpsellAction
                  data={secondaryAction}
                  size="sm"
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="secondary"
                />
              )}
              {primaryAction && (
                <UpsellAction
                  data={primaryAction}
                  size="sm"
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="primary"
                />
              )}
              {secondaryAction && responsiveMinWidth === 'xs' && (
                <UpsellAction
                  data={secondaryAction}
                  size="sm"
                  stacked={!secondaryAction}
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="secondary"
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
      {/*
      MD BREAKPOINT
      */}
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            paddingRight: isRTL ? TOKEN_SPACE_800 : TOKEN_SPACE_1300,
            paddingLeft: isRTL ? TOKEN_SPACE_1000 : TOKEN_SPACE_800,
          },
        }}
        display="none"
        lgDisplay="none"
        paddingY={8}
        smDisplay="block"
        width="100%"
        wrap
      >
        <Box
          alignItems="start"
          direction="column"
          display="flex"
          flex={children ? 'grow' : 'shrink'}
          justifyContent="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smDirection="row"
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
        >
          {imageData && (
            <Box
              alignSelf={responsiveMinWidth === 'xs' ? 'center' : undefined}
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
            flex={children ? 'grow' : 'shrink'}
            marginBottom="auto"
            marginEnd={0}
            marginStart={0}
            smDisplay="block"
            smMarginEnd={6}
            smMarginStart={imageData ? 6 : 0}
          >
            <Box maxWidth={648}>
              {title && (
                <Box marginBottom={2}>
                  <Heading align={responsiveMinWidth === 'xs' ? 'center' : 'start'} size="400">
                    {title}
                  </Heading>
                </Box>
              )}

              {messageElement}
            </Box>
            {children && (
              <Box
                flex="grow"
                justifyContent="end"
                marginTop={responsiveMinWidth === 'xs' ? 2 : undefined}
                smDisplay="flex"
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
          <Box
            justifyContent="end"
            marginStart="auto"
            smDisplay="flex"
            smMarginEnd={4}
            smPaddingY={3}
          >
            {secondaryAction && responsiveMinWidth !== 'xs' && (
              <UpsellAction
                data={secondaryAction}
                twoButtons={!!secondaryAction && !!primaryAction}
                type="secondary"
              />
            )}
            {primaryAction && (
              <UpsellAction
                data={primaryAction}
                twoButtons={!!secondaryAction && !!primaryAction}
                type="primary"
              />
            )}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <UpsellAction
                data={secondaryAction}
                stacked={!secondaryAction}
                twoButtons={!!secondaryAction && !!primaryAction}
                type="secondary"
              />
            )}
          </Box>
        )}
      </Box>
      {/*
      LG BREAKPOINT
      */}
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            paddingRight: isRTL ? TOKEN_SPACE_800 : TOKEN_SPACE_1300,
            paddingLeft: isRTL ? TOKEN_SPACE_1000 : TOKEN_SPACE_800,
          },
        }}
        display="none"
        lgDisplay="block"
        paddingY={8}
        smDisplay="none"         width="100%"
        wrap
      >
        <Box
          alignItems="start"
          direction="column"
          display="flex"
          flex={children ? 'grow' : 'shrink'}
          justifyContent="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smDirection="row"
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
        >
          {imageData && (
            <Box
              alignSelf={responsiveMinWidth === 'xs' ? 'center' : undefined}
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
            flex={children ? 'grow' : 'shrink'}
            marginBottom="auto"
            marginEnd={0}
            marginStart={0}
            smDisplay="block"
            smMarginEnd={6}
            smMarginStart={imageData ? 6 : 0}
          >
            <Box maxWidth={648}>
              {title && (
                <Box marginBottom={2}>
                  <Heading align={responsiveMinWidth === 'xs' ? 'center' : 'start'} size="400">
                    {title}
                  </Heading>
                </Box>
              )}

              {messageElement}
            </Box>
            {children && (
              <Box
                flex="grow"
                justifyContent="end"
                marginTop={responsiveMinWidth === 'xs' ? 2 : undefined}
                smDisplay="flex"
                smMarginEnd={4}
                smPaddingY={3}
                width="100%"
              >
                {children}
              </Box>
            )}
          </Box>
          {!children && hasActions && (
            <Box direction="row" display="flex" margin="auto" marginStart="auto">
              {secondaryAction && responsiveMinWidth !== 'xs' && (
                <UpsellAction
                  data={secondaryAction}
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="secondary"
                />
              )}
              {primaryAction && (
                <UpsellAction
                  data={primaryAction}
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="primary"
                />
              )}
              {secondaryAction && responsiveMinWidth === 'xs' && (
                <UpsellAction
                  data={secondaryAction}
                  stacked={!secondaryAction}
                  twoButtons={!!secondaryAction && !!primaryAction}
                  type="secondary"
                />
              )}
            </Box>
          )}
        </Box>
      </Box>
      {dismissButton && (
        <div className={classnames(styles.VRrtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel}
            icon="cancel"
            iconColor="darkGray"
            onClick={dismissButton.onDismiss}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

BannerUpsell.Form = BannerUpsellForm;

BannerUpsell.displayName = 'BannerUpsell';
