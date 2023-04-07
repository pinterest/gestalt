import React = require('react');

/**
 * =========================================================
 * ====================== SHARED TYPED =====================
 * =========================================================
 */

type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (
  arg: U & {
    readonly event: T;
  },
) => void;

type ReactForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

type FourDirections = 'up' | 'right' | 'down' | 'left';

type TapAreaEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLDivElement>
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>,
  { dangerouslydangerouslyDisableOnNavigation?: (() => void) | undefined }
>;

type ButtonEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement>,
  { dangerouslyDisableOnNavigation?: (() => void) | undefined }
>;

type EventHandlerType = (args: { readonly event: React.SyntheticEvent }) => void;

type OnNavigationType = (args: {
  href: string;
  target?: null | 'self' | 'blank' | undefined;
}) => EventHandlerType | null | undefined;

type UnsignedUpTo12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type SignedUpTo12 = -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | UnsignedUpTo12;

interface BadgeObject {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'darkWash'
    | 'lightWash'
    | undefined;
}

interface OnDismissButtonObject {
  accessibilityLabel: string;
  onDismiss: () => void;
}

interface MaxLength {
  characterCount: number;
  errorAccessibilityLabel: string;
}

/**
 * =========================================================
 * ==================== API INTERFACES  ====================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/activationcard
 */
export interface ActivationCardProps {
  message: string;
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete';
  statusMessage: string;
  title: string;
  dismissButton?: OnDismissButtonObject | undefined;
  link?:
    | {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ButtonEventHandlerType | undefined;
        rel?: 'none' | 'nofollow' | undefined;
        target?: null | 'self' | 'blank' | undefined;
      }
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/avatar
 */
export interface AvatarProps {
  name: string;
  accessibilityLabel?: string | undefined;
  outline?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit' | undefined;
  src?: string | undefined;
  verified?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/avatargroup
 */
export interface AvatarGroupProps {
  accessibilityLabel: string;
  collaborators: ReadonlyArray<{ name: string; src?: string | undefined }>;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  addCollaborators?: boolean | undefined;
  href?: string | undefined;
  onClick?: TapAreaEventHandlerType | undefined;
  role?: 'button' | 'link' | undefined;
  size?: 'xs' | 'sm' | 'md' | 'fit' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/badge
 */
export interface BadgeProps {
  text: string;
  position?: 'middle' | 'top' | undefined;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'darkWash'
    | 'lightWash'
    | 'recommendation'
    | undefined;
}

export type BoxPassthroughProps = Omit<
  React.ComponentProps<'div'>,
  'onClick' | 'className' | 'style' | 'ref'
> &
  React.RefAttributes<HTMLDivElement>;

/**
 * https://gestalt.pinterest.systems/web/box
 */
export interface BoxProps extends BoxPassthroughProps {
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
    | undefined;
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  smAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  mdAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  lgAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  as?:
    | 'article'
    | 'aside'
    | 'details'
    | 'div'
    | 'figcaption'
    | 'figure'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section'
    | 'summary'
    | undefined;
  borderStyle?:
    | 'sm'
    | 'lg'
    | 'shadow'
    | 'raisedTopShadow'
    | 'raisedBottomShadow'
    | 'none'
    | undefined;
  bottom?: boolean | undefined;
  children?: React.ReactNode | undefined;
  color?:
    | 'darkWash'
    | 'lightWash'
    | 'transparent'
    | 'transparentDarkGray'
    | 'default'
    | 'infoBase'
    | 'infoWeak'
    | 'errorBase'
    | 'errorWeak'
    | 'warningBase'
    | 'warningWeak'
    | 'successBase'
    | 'successWeak'
    | 'recommendationBase'
    | 'recommendationWeak'
    | 'shopping'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'selected'
    | 'inverse'
    | 'brand'
    | 'education'
    | 'elevationAccent'
    | 'elevationFloating'
    | 'elevationRaised'
    | 'dark'
    | 'light'
    | undefined;
  column?: UnsignedUpTo12 | undefined;
  smColumn?: UnsignedUpTo12 | undefined;
  mdColumn?: UnsignedUpTo12 | undefined;
  lgColumn?: UnsignedUpTo12 | undefined;
  dangerouslySetInlineStyle?:
    | {
        __style: {
          [key: string]: string | number | undefined;
        };
      }
    | undefined;
  direction?: 'row' | 'column' | undefined;
  smDirection?: 'row' | 'column' | undefined;
  mdDirection?: 'row' | 'column' | undefined;
  lgDirection?: 'row' | 'column' | undefined;
  display?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden' | undefined;
  smDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden' | undefined;
  mdDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden' | undefined;
  lgDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden' | undefined;
  fit?: boolean | undefined;
  flex?: 'grow' | 'shrink' | 'none' | undefined;
  height?: number | string | undefined;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | undefined;
  left?: boolean | undefined;
  margin?: SignedUpTo12 | 'auto' | undefined;
  smMargin?: SignedUpTo12 | 'auto' | undefined;
  mdMargin?: SignedUpTo12 | 'auto' | undefined;
  lgMargin?: SignedUpTo12 | 'auto' | undefined;
  marginBottom?: SignedUpTo12 | 'auto' | undefined;
  smMarginBottom?: SignedUpTo12 | 'auto' | undefined;
  mdMarginBottom?: SignedUpTo12 | 'auto' | undefined;
  lgMarginBottom?: SignedUpTo12 | 'auto' | undefined;
  marginEnd?: SignedUpTo12 | 'auto' | undefined;
  smMarginEnd?: SignedUpTo12 | 'auto' | undefined;
  mdMarginEnd?: SignedUpTo12 | 'auto' | undefined;
  lgMarginEnd?: SignedUpTo12 | 'auto' | undefined;
  marginStart?: SignedUpTo12 | 'auto' | undefined;
  smMarginStart?: SignedUpTo12 | 'auto' | undefined;
  mdMarginStart?: SignedUpTo12 | 'auto' | undefined;
  lgMarginStart?: SignedUpTo12 | 'auto' | undefined;
  marginTop?: SignedUpTo12 | 'auto' | undefined;
  smMarginTop?: SignedUpTo12 | 'auto' | undefined;
  mdMarginTop?: SignedUpTo12 | 'auto' | undefined;
  lgMarginTop?: SignedUpTo12 | 'auto' | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1 | undefined;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto' | undefined;
  padding?: UnsignedUpTo12 | undefined;
  smPadding?: UnsignedUpTo12 | undefined;
  mdPadding?: UnsignedUpTo12 | undefined;
  lgPadding?: UnsignedUpTo12 | undefined;
  paddingX?: UnsignedUpTo12 | undefined;
  smPaddingX?: UnsignedUpTo12 | undefined;
  mdPaddingX?: UnsignedUpTo12 | undefined;
  lgPaddingX?: UnsignedUpTo12 | undefined;
  paddingY?: UnsignedUpTo12 | undefined;
  smPaddingY?: UnsignedUpTo12 | undefined;
  mdPaddingY?: UnsignedUpTo12 | undefined;
  lgPaddingY?: UnsignedUpTo12 | undefined;
  position?: 'static' | 'absolute' | 'relative' | 'fixed' | undefined;
  right?: boolean | undefined;
  role?: string | undefined;
  rounding?: 'pill' | 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  top?: boolean | undefined;
  userSelect?: 'auto' | 'none' | undefined;
  width?: number | string | undefined;
  wrap?: boolean | undefined;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/button
 */
export interface ButtonProps {
  text: string;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  accessibilityLabel?: string | undefined;
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white'
    | undefined;
  disabled?: boolean | undefined;
  href?: string | undefined;
  iconEnd?: Icons | undefined;
  fullWidth?: boolean | undefined;
  name?: string | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  rel?: 'none' | 'nofollow' | undefined;
  role?: 'button' | 'link' | undefined;
  selected?: boolean | undefined;
  size?: 'sm' | 'md' | 'lg' | undefined;
  tabIndex?: -1 | 0 | undefined;
  target?: null | 'self' | 'blank' | undefined;
  type?: 'submit' | 'button' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/buttongroup
 */
export interface ButtonGroupProps {
  children?: React.ReactNode | undefined;
}

export interface ActionData {
  accessibilityLabel: string;
  disabled?: boolean;
  href?: string | undefined;
  label: string;
  onClick?: ButtonEventHandlerType | undefined;
  rel?: 'none' | 'nofollow' | undefined;
  target?: null | 'self' | 'blank' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/callout
 */
export interface CalloutProps {
  iconAccessibilityLabel: string;
  message: string;
  type: 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  dismissButton?: OnDismissButtonObject | undefined;
  primaryAction?: ActionData | undefined;
  secondaryAction?: ActionData | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/checkbox
 */
export interface CheckboxProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;
  hasError?: boolean | undefined;
  image?: React.ReactNode | undefined;
  indeterminate?: boolean | undefined;
  label?: string | undefined;
  name?: string | undefined;
  onClick?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>
    | undefined;
  size?: 'sm' | 'md' | undefined;
  subtext?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
}

export interface ComboBoxItemType {
  label: string;
  subtext?: string;
  value: string;
}

/**
 * https://gestalt.pinterest.systems/web/combobox
 */
export interface ComboBoxProps {
  accessibilityClearButtonLabel: string;
  id: string;
  label: string;
  options: ComboBoxItemType[];
  noResultText: string;
  zIndex?: Indexable | undefined;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;
  helperText?: string | undefined;
  inputValue?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  onChange?:
    | ((args: { event: React.SyntheticEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  onBlur?:
    | ((args: {
        event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>;
        value: string;
      }) => void)
    | undefined;
  onFocus?:
    | ((args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  onKeyDown?:
    | ((args: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  onClear?: (() => void) | undefined;
  onSelect?:
    | ((args: {
        event: React.SyntheticEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;
        item: ComboBoxItemType;
      }) => void)
    | undefined;
  placeholder?: string | undefined;
  selectedOption?: ComboBoxItemType | undefined;
  size?: 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/collage
 */
export interface CollageProps {
  columns: number;
  height: number;
  renderImage: (args: { width: number; height: number; index: number }) => React.ReactNode;
  width: number;
  cover?: boolean | undefined;
  gutter?: number | undefined;
  layoutKey?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/colorschemeprovider
 */
export interface ColorSchemeProviderProps {
  colorScheme: 'light' | 'dark' | 'userPreference';
  id?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/column
 */
export interface ColumnProps {
  span: UnsignedUpTo12;
  smSpan?: UnsignedUpTo12 | undefined;
  mdSpan?: UnsignedUpTo12 | undefined;
  lgSpan?: UnsignedUpTo12 | undefined;
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/container
 */
export interface ContainerProps {
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/datapoint
 */
export interface DatapointProps {
  title: string;
  value: string;
  size?: 'md' | 'lg' | undefined;
  tooltipText?: string | undefined;
  trend?: { accessibilityLabel: string; value: number } | undefined;
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto' | undefined;
  badge?: BadgeObject | undefined;
  tooltipZIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/devicetypeprovider
 */
export interface DeviceTypeProviderProps {
  deviceType: 'desktop' | 'mobile';
}

/**
 * https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider
 */
export interface DefaultLabelProviderProps {
  labels?:
    | {
        ComboBox: {
          accessibilityClearButtonLabel: string;
        };
        Link: {
          accessibilityNewTabLabel: string;
        };
        ModalAlert: {
          accessibilityDismissButtonLabel: string;
        };
        Popover: {
          accessibilityDismissButtonLabel: string;
        };
        Tag: {
          accessibilityErrorIconLabel: string;
          accessibilityRemoveIconLabel: string;
          accessibilityWarningIconLabel: string;
        };
        TextField: {
          accessibilityHidePasswordLabel: string;
          accessibilityShowPasswordLabel: string;
        };
      }
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown
 */
export interface DropdownProps {
  children:
    | React.ReactElement<DropdownItemProps | DropdownSectionProps>
    | Array<React.ReactElement<DropdownItemProps | DropdownSectionProps>>;
  id: string;
  onDismiss: () => void;
  anchor?: HTMLElement | null | undefined;
  dangerouslyRemoveLayer?: boolean;
  headerContent?: React.ReactNode | undefined;
  idealDirection?: FourDirections | undefined;
  maxHeight?: '30vh' | undefined;
  zIndex?: Indexable | undefined;
}

export interface DropdownOption {
  label: string;
  value: string;
  subtext?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Item
 */
export interface DropdownItemProps {
  children?: React.ReactNode;
  onSelect: AbstractEventHandler<
    React.FocusEvent<HTMLInputElement>,
    {
      item: DropdownOption;
    }
  >;
  option: DropdownOption;
  badge?: BadgeObject | undefined;
  dataTestId?: string | undefined;
  selected?: DropdownOption | ReadonlyArray<DropdownOption> | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Link
 */
export interface DropdownLinkProps {
  href: string;
  option: DropdownOption;
  badge?: BadgeObject | undefined;
  children?: React.ReactNode;
  dataTestId?: string | undefined;
  isExternal?: boolean | undefined;
  onClick?: ButtonEventHandlerType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Section
 */
export interface DropdownSectionProps {
  children:
    | React.ReactElement<DropdownItemProps>
    | ReadonlyArray<React.ReactElement<DropdownItemProps>>;
  label: string;
}

/**
 * https://gestalt.pinterest.systems/web/fieldset
 */
export interface FieldsetProps {
  children: React.ReactNode;
  id?: string;
  legend: string;
  legendDisplay?: 'visible' | 'hidden' | undefined;
  errorMessage?: string;
}

/**
 * https://gestalt.pinterest.systems/web/flex
 */
export interface FlexProps {
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch'
    | undefined;
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  smAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  mdAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  lgAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  children?: React.ReactNode | undefined;
  direction?: 'row' | 'column' | undefined;
  flex?: 'grow' | 'shrink' | 'none' | undefined;
  gap?: UnsignedUpTo12 | { row: UnsignedUpTo12; column: UnsignedUpTo12 } | undefined;
  height?: number | string | undefined;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  width?: number | string | undefined;
  wrap?: boolean | undefined;
  dataTestId?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/flex#Flex.Item
 */
export interface FlexItemProps {
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch' | undefined;
  children?: React.ReactNode | undefined;
  flex?: 'grow' | 'shrink' | 'none' | undefined;
  minWidth?: number | string | undefined;
  flexBasis?: string | number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/heading
 */
export interface HeaderProps {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 'none' | undefined;
  align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight' | undefined;
  children?: React.ReactNode | undefined;
  color?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'inverse'
    | 'light'
    | 'dark'
    | undefined;
  id?: string | undefined;
  overflow?: 'normal' | 'breakWord' | undefined;
  size?: '100' | '200' | '300' | '400' | '500' | '600' | undefined;
  truncate?: boolean | undefined;
  lineClamp?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/helpbutton
 */
export interface HelpButtonProps {
  accessibilityLabel: string;
  accessibilityPopoverLabel: string;
  idealDirection?: 'up' | 'right' | 'down' | 'left' | undefined;
  isWithinFixedContainer?: boolean | undefined;
  link?:
    | {
        accessibilityLabel?: string | undefined;
        externalLinkIcon?:
          | 'none'
          | 'default'
          | {
              color: IconProps['color'];
              size: IconProps['size'];
            };
        href: string;
        onClick?:
          | AbstractEventHandler<
              React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
              {
                dangerouslyDisableOnNavigation: () => void;
              }
            >
          | undefined;
        text: string;
        ref?: React.Ref<'a'>;
        target?: null | 'self' | 'blank';
      }
    | undefined;
  onClick?: TapAreaEventHandlerType | undefined;
  text: string | React.ReactElement<typeof Text>;
  zIndex?: Indexable | undefined;
}

export type Icons =
  | 'ad'
  | 'ad-group'
  | 'add'
  | 'add-circle'
  | 'add-layout'
  | 'add-pin'
  | 'ads-stats'
  | 'ads-overview'
  | 'alert'
  | 'align-bottom-center'
  | 'align-bottom-left'
  | 'align-bottom-right'
  | 'align-bottom'
  | 'align-middle'
  | 'align-top-center'
  | 'align-top-left'
  | 'align-top-right'
  | 'align-top'
  | 'android-share'
  | 'angled-pin'
  | 'apps'
  | 'arrow-back'
  | 'arrow-circle-down'
  | 'arrow-circle-forward'
  | 'arrow-circle-up'
  | 'arrow-down'
  | 'arrow-end'
  | 'arrow-forward'
  | 'arrow-start'
  | 'arrow-up'
  | 'arrow-up-right'
  | 'bell'
  | 'calendar'
  | 'camera'
  | 'camera-roll'
  | 'cancel'
  | 'canonical-pin'
  | 'captions'
  | 'color-picker'
  | 'check'
  | 'check-circle'
  | 'circle-outline'
  | 'clear'
  | 'clock'
  | 'code'
  | 'cog'
  | 'compass'
  | 'compose'
  | 'copy-to-clipboard'
  | 'crop'
  | 'dash'
  | 'conversion-tag'
  | 'credit-card'
  | 'directional-arrow-left'
  | 'directional-arrow-right'
  | 'download'
  | 'drag-drop'
  | 'duplicate'
  | 'edit'
  | 'ellipsis'
  | 'ellipsis-circle-outline'
  | 'envelope'
  | 'eye'
  | 'eye-hide'
  | 'facebook'
  | 'face-happy'
  | 'face-neutral'
  | 'face-sad'
  | 'face-smiley'
  | 'file-unknown'
  | 'fill-opaque'
  | 'fill-transparent'
  | 'filter'
  | 'flag'
  | 'flash'
  | 'flashlight'
  | 'flipHorizontal'
  | 'flipVertical'
  | 'folder'
  | 'gif'
  | 'globe'
  | 'globe-checked'
  | 'gmail'
  | 'google-plus'
  | 'graph-bar'
  | 'handle'
  | 'hand-pointing'
  | 'heart'
  | 'heart-outline'
  | 'heart-broken'
  | 'history'
  | 'home'
  | 'idea-pin'
  | 'impressum'
  | 'insights-audience'
  | 'insights-conversions'
  | 'info-circle'
  | 'key'
  | 'knoop'
  | 'lightbulb'
  | 'lightning-bolt-circle'
  | 'link'
  | 'location'
  | 'lock'
  | 'logo-large'
  | 'logo-small'
  | 'logout'
  | 'margins-large'
  | 'margins-medium'
  | 'margins-small'
  | 'maximize'
  | 'megaphone'
  | 'menu'
  | 'minimize'
  | 'move'
  | 'mute'
  | 'music-off'
  | 'music-on'
  | 'overlay-text'
  | 'overview'
  | 'pause'
  | 'people'
  | 'person'
  | 'person-add'
  | 'phone'
  | 'pin'
  | 'pincode'
  | 'pin-hide'
  | 'pinterest'
  | 'play'
  | 'protect'
  | 'refresh'
  | 'question-mark'
  | 'remove'
  | 'reorder-images'
  | 'replace'
  | 'report'
  | 'rotate'
  | 'scale'
  | 'search'
  | 'security'
  | 'shopping-bag'
  | 'smiley'
  | 'smiley-outline'
  | 'send'
  | 'share'
  | 'sound'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sparkle'
  | 'speech'
  | 'speech-ellipsis'
  | 'star'
  | 'star-half'
  | 'switch-account'
  | 'tag'
  | 'terms'
  | 'text-align-left'
  | 'text-align-center'
  | 'text-align-right'
  | 'text-all-caps'
  | 'text-extra-small'
  | 'text-large'
  | 'text-line-height'
  | 'text-medium'
  | 'text-sentence-case'
  | 'text-size'
  | 'text-small'
  | 'text-spacing'
  | 'trash-can'
  | 'trending'
  | 'twitter'
  | 'video-camera'
  | 'view-type-default'
  | 'view-type-dense'
  | 'view-type-list'
  | 'visit'
  | 'workflow-status-all'
  | 'workflow-status-canceled'
  | 'workflow-status-halted'
  | 'workflow-status-in-progress'
  | 'workflow-status-ok'
  | 'workflow-status-problem'
  | 'workflow-status-unstarted'
  | 'workflow-status-warning';

/**
 * https://gestalt.pinterest.systems/web/icon
 */
export interface IconProps {
  accessibilityLabel: string;

  color?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'inverse'
    | 'shopping'
    | 'brandPrimary'
    | 'light'
    | 'dark'
    | undefined;
  dangerouslySetSvgPath?: { __path: string } | undefined;
  icon?: Icons | undefined;
  inline?: boolean | undefined;
  size?: number | string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/iconbutton
 */
export interface IconButtonProps {
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red'
    | undefined;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  accessibilityLabel: string;

  dangerouslySetSvgPath?: { __path: string } | undefined;
  disabled?: boolean | undefined;
  href?: string | undefined;
  icon?: Icons | undefined;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  padding?: 1 | 2 | 3 | 4 | 5 | undefined;
  rel?: 'none' | 'nofollow' | undefined;
  role?: 'button' | 'link' | undefined;
  selected?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  tabIndex?: -1 | 0 | undefined;
  target?: null | 'self' | 'blank' | undefined;
  tooltip?:
    | Pick<TooltipProps, 'accessibilityLabel' | 'inline' | 'idealDirection' | 'text' | 'zIndex'>
    | undefined;
  type?: 'submit' | 'button' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/iconbuttonfloating
 */
export interface IconButtonFloatingProps {
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityPopupRole: 'menu' | 'dialog';
  accessibilityLabel: string;
  icon: Icons;
  onClick?: ButtonEventHandlerType | undefined;
  selected?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/image
 */
export interface ImageProps {
  alt: string;
  color: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | undefined;
  decoding?: 'sync' | 'async' | 'auto';
  elementTiming?: string | undefined;
  naturalHeight: number;
  naturalWidth: number;
  src: string;
  children?: React.ReactNode | undefined;
  fit?: 'cover' | 'contain' | 'none' | undefined;
  fetchPriority?: 'high' | 'low' | 'auto' | undefined;
  loading?: 'eager' | 'lazy' | 'auto' | undefined;
  onError?: AbstractEventHandler<React.SyntheticEvent<HTMLImageElement>> | undefined;
  onLoad?: AbstractEventHandler<React.SyntheticEvent<HTMLImageElement>> | undefined;
  role?: 'img' | 'presentation' | undefined;
  sizes?: string | undefined;
  srcSet?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/label
 */
export interface LabelProps {
  htmlFor: string;
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/layer
 */
export interface LayerProps {
  children: React.ReactNode;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/letterbox
 */
export interface LetterboxProps {
  contentAspectRatio: number;
  height: number;
  width: number;
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/link
 */
export interface LinkProps {
  href: string;
  accessibilityLabel?: string | undefined;
  children?: React.ReactNode | undefined;
  hoverStyle?: 'none' | 'underline' | undefined;
  id?: string | undefined;
  display?: 'inline' | 'inlineBlock' | 'block' | undefined;
  externalLinkIcon?:
    | 'none'
    | 'default'
    | { color: IconProps['color']; size: TextProps['size'] }
    | undefined;
  onBlur?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation?: (() => void) | undefined }
      >
    | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  rel?: 'none' | 'nofollow' | undefined;
  rounding?: 'pill' | 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  tapStyle?: 'none' | 'compress' | undefined;
  target?: null | 'self' | 'blank' | undefined;
  underline?: 'auto' | 'none' | 'always' | 'hover' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/list
 */
export interface ListProps {
  label: string | React.ReactElement<typeof Text>;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  spacing?: 'regular' | 'condensed' | undefined;
  type?: 'bare' | 'ordered' | 'unordered' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/list#List.Itemt
 */
export interface ListItemProps {
  text: string | React.ReactElement<typeof Text>;
}

/**
 * https://gestalt.pinterest.systems/web/mask
 */
export interface MaskProps {
  children?: React.ReactNode | undefined;
  height?: number | string | undefined;
  rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  wash?: boolean | undefined;
  width?: number | string | undefined;
  willChangeTransform?: boolean | undefined;
}

export interface MasonryCache<K, V> {
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
  reset(): void;
}

/**
 * https://gestalt.pinterest.systems/web/masonry
 */
export interface MasonryProps<T = any> {
  columnWidth?: number | undefined;
  gutterWidth?: number | undefined;
  items: ReadonlyArray<T>;
  loadItems?: false | ((_arg?: { from: number }) => undefined | boolean | {}) | undefined;
  measurementStore?: MasonryCache<T, any>;
  layout?:
    | 'basic'
    | 'basicCentered'
    | 'flexible'
    | 'serverRenderedFlexible'
    | 'uniformRow'
    | undefined;
  renderItem: (args: { data: T; itemIdx: number; isMeasuring: boolean }) => React.ReactNode;
  flexible?: boolean | undefined;
  minCols?: number | undefined;
  scrollContainer?: (() => HTMLElement) | undefined;
  virtualBoundsBottom?: number | undefined;
  virtualBoundsTop?: number | undefined;
  virtualize?: boolean | undefined;
  virtualBufferFactor?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/modal
 */

export interface ModalProps {
  _dangerouslyDisableScrollBoundaryContainer?: boolean;
  accessibilityModalLabel: string;
  align?: 'center' | 'start' | undefined;
  children?: React.ReactNode | undefined;
  closeOnOutsideClick?: boolean | undefined;
  footer?: React.ReactNode | undefined;
  heading?: React.ReactNode | undefined;
  onDismiss: () => void;
  pending?: 'defaut' | 'none' | undefined;
  role?: 'alertdialog' | 'dialog' | undefined;
  size?: 'sm' | 'md' | 'lg' | number | undefined;
  subHeading?: string | undefined;
}

export interface ModalAlertActionDataType {
  accessibilityLabel: string;
  disabled?: boolean | undefined;
  href?: string | undefined;
  label: string;
  onClick: AbstractEventHandler<
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>
    | React.MouseEvent<HTMLButtonElement>,
    { dangerouslyDisableOnNavigation: () => void }
  >;
  rel?: 'none' | 'nofollow' | undefined;
  target?: null | 'self' | 'blank' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/modalalert
 */
export interface ModalAlertProps {
  accessibilityDismissButtonLabel?: string | undefined;
  accessibilityModalLabel: string;
  heading: string;
  onDismiss: () => void;
  type?: 'default' | 'warning' | 'error' | undefined;
  primaryAction: ModalAlertActionDataType;
  secondaryAction?: ModalAlertActionDataType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/module
 */
export interface ModuleProps {
  id: string;
  badge?: BadgeObject | undefined;
  icon?: Icons | undefined;
  iconAccessibilityLabel?: string | undefined;
  iconButton?: React.ReactElement<typeof IconButton> | undefined;
  title?: string | undefined;
  type?: 'error' | 'info' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/module#Module.Expandable
 */
export interface ModuleExpandableProps {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  id: string;
  items: ReadonlyArray<{
    title: string;
    icon?: Icons | undefined;
    iconButton?: React.ReactElement<typeof IconButton> | undefined;
    summary?: ReadonlyArray<string> | undefined;
    type?: 'info' | 'error' | undefined;
    iconAccessibilityLabel?: string | undefined;
    children?: React.ReactNode | undefined;
    badge?: BadgeObject | undefined;
  }>;
  expandedIndex?: number | null | undefined;
  onExpandedChange?: ((expandedIndex: number | null) => void) | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/numberfield
 */
export interface NumberFieldProps {
  id: string;
  onChange: (args: {
    event: React.SyntheticEvent<HTMLInputElement>;
    value: number | undefined;
  }) => void;
  autoComplete?: 'on' | 'off' | undefined;
  disabled?: boolean | undefined;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
  errorMessage?: React.ReactNode | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  max?: number | undefined;
  min?: number | undefined;
  name?: string | undefined;
  onBlur?:
    | ((args: { event: React.FocusEvent<HTMLInputElement>; value: number | undefined }) => void)
    | undefined;
  onFocus?:
    | ((args: { event: React.FocusEvent<HTMLInputElement>; value: number | undefined }) => void)
    | undefined;
  onKeyDown?:
    | ((args: { event: React.KeyboardEvent<HTMLInputElement>; value: number | undefined }) => void)
    | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  step?: number | undefined;
  value?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider
 */
export interface OnLinkNavigationProviderProps {
  onNavigation?: OnNavigationType | undefined;
}

export interface PageHeaderAction {
  component?:
    | React.ReactElement<
        typeof Button | typeof IconButton | typeof Link | typeof Tooltip | typeof Text
      >
    | undefined;
  dropdownItems?:
    | ReadonlyArray<React.ReactElement<DropdownItemProps | DropdownLinkProps, typeof Dropdown>>
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/pageheader
 */
export interface PageHeaderProps {
  title: string;
  badge?:
    | {
        text: string;
        tooltipText?: string | undefined;
      }
    | undefined;
  borderStyle?: 'sm' | 'none' | undefined;
  helperIconButton?:
    | {
        accessibilityLabel?: string | undefined;
        accessibilityControls?: string | undefined;
        accessibilityExpanded?: boolean | undefined;
        onClick: (args: {
          event:
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLButtonElement>;
          dangerouslyDisableOnNavigation: () => void;
        }) => void;
      }
    | undefined;
  helperLink?: {
    accessibilityLabel: string;
    text: string;
    href: string;
    onClick?: (args: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void | undefined;
  };
  items?: ReadonlyArray<React.ReactNode> | undefined;
  dropdownAccessibilityLabel?: string | undefined;
  maxWidth?: number | string | undefined;
  primaryAction?: PageHeaderAction | undefined;
  secondaryAction?: PageHeaderAction | undefined;
  subtext?: string | undefined;
  thumbnail?: React.ReactElement<typeof Image>;
}

/**
 * https://gestalt.pinterest.systems/web/pog
 */
export interface PogProps {
  accessibilityLabel?: string | undefined;
  active?: boolean | undefined;
  bgColor?:
    | 'transparent'
    | 'darkGray'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red'
    | undefined;
  dangerouslySetSvgPath?: { __path: string } | undefined;
  focused?: boolean | undefined;
  hovered?: boolean | undefined;
  icon?: Icons | undefined;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | undefined;
  padding?: 1 | 2 | 3 | 4 | 5 | undefined;
  selected?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/popover
 */
export interface PopoverProps {
  anchor: HTMLElement | null | undefined;
  onDismiss: () => void;
  children?: React.ReactNode | undefined;
  color?: 'blue' | 'red' | 'white' | 'darkGray' | undefined;
  id?: string | undefined;
  idealDirection?: FourDirections | undefined;
  positionRelativeToAnchor?: boolean | undefined;
  shouldFocus?: boolean | undefined;
  showCaret?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number | undefined;
  __dangerouslySetMaxHeight?: '30vh';
  onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLElement>>;
  accessibilityDismissButtonLabel?: string | undefined;
  showDismissButton?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/popovereducational
 */
export interface PopoverEducationalProps {
  accessibilityLabel: string;
  anchor: HTMLElement | null | undefined;
  onDismiss: () => void;
  children?: React.ReactNode | undefined;
  id?: string | undefined;
  idealDirection?: FourDirections | undefined;
  message?: React.ReactElement<typeof Text> | undefined;
  primaryAction?:
    | {
        accessibilityLabel?: string | undefined;
        href?: string | undefined;
        text: string | undefined;
        onClick?: ButtonEventHandlerType | undefined;
        rel?: 'none' | 'nofollow' | undefined;
        target?: null | 'self' | 'blank' | undefined;
      }
    | undefined;
  role?: 'dialog' | 'tooltip' | undefined;
  shouldFocus?: boolean | undefined;
  zIndex?: Indexable | undefined;
  size?: 'sm' | 'flexible' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/pulsar
 */
export interface PulsarProps {
  paused?: boolean | undefined;
  size?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/radiobutton
 */
export interface RadioButtonProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>;
  value: string;
  checked?: boolean | undefined;
  helperText?: string | undefined;
  disabled?: boolean | undefined;
  image?: React.ReactNode | undefined;
  label?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/radiogroup
 */
export interface RadioGroupProps {
  id: string;
  children: React.ReactNode;
  legend: string;
  direction?: 'column' | 'row' | undefined;
  errorMessage?: string | undefined;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/scrollboundarycontainer
 */
export interface ScrollBoundaryContainerProps {
  children: React.ReactNode;
  height?: number | string | undefined;
  overflow?: 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/searchfield
 */
export interface SearchFieldProps {
  accessibilityLabel: string;
  accessibilityClearButtonLabel?: string;
  id: string;
  autoComplete?: 'on' | 'off' | 'username' | 'name' | undefined;
  errorMessage?: string | undefined;
  onChange: (args: {
    value: string;
    syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  onBlur?: ((args: { event: React.SyntheticEvent<HTMLInputElement> }) => void) | undefined;
  onFocus?:
    | ((args: { value: string; syntheticEvent: React.SyntheticEvent<HTMLInputElement> }) => void)
    | undefined;
  onKeyDown?:
    | ((args: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  value?: string | undefined;
  label?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/segmentedcontrol
 */
export interface SegmentedControlProps {
  items: React.ReactNode[];
  onChange: (args: { event: React.SyntheticEvent<React.MouseEvent>; activeIndex: number }) => void;
  selectedItemIndex: number;
  responsive?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/selectlist
 */
export interface SelectListProps {
  children: React.ReactNode;
  id: string;
  onChange: (args: { event: React.SyntheticEvent<HTMLElement>; value: string }) => void;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden';
  name?: string | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  value?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/selectlist#SelectList.Option
 */
export interface SelectListOptionProps {
  label: string;
  value: string;
  disabled?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/selectlist#SelectList.Group
 */
export interface SelectListGroupProps {
  children: React.ReactNode;
  label: string;
  disabled?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation
 */
export interface SideNaviationProps {
  accessibilityLabel: string;
  children: React.ReactNode;
  footer?: React.ReactNode | undefined;
  header?: React.ReactNode | undefined;
  showBorder?: boolean | undefined;
  title?: string | undefined;
  dismissButton?: { accessibilityLabel?: string; onDismiss: () => void } | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section
 */
export interface SideNavigationSectionProps {
  children: React.ReactNode;
  label: string;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem
 */
export interface SideNavigationTopItemProps {
  active?: 'page' | 'section' | undefined;
  badge?:
    | {
        text: string;
        type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | undefined;
      }
    | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  href: string;
  icon?: Icons | { __path: string };
  notificationAccessibilityLabel?: string;
  onClick?: ButtonEventHandlerType | undefined;
  label: string;
  primaryAction?:
    | {
        icon?: 'ellipsis' | 'edit' | 'trash-can';
        onClick?: ButtonEventHandlerType | undefined;
        tooltip: {
          accessibilityLabel?: string | undefined;
          text: string;
          zIndex?: Indexable | undefined;
        };
        dropdownItems?: Array<React.ReactElement<typeof Dropdown['Item']>>;
      }
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem
 */
export interface SideNavigationNestedItemProps {
  active?: 'page' | 'section' | undefined;
  href: string;
  label: string;
  onClick?: ButtonEventHandlerType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group
 */
export interface SideNavigationGroupProps {
  badge?: BadgeProps | undefined;
  children: React.ReactNode;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  display?: 'expandable' | 'static' | undefined;
  icon?: Icons;
  notificationAccessibilityLabel?: string | undefined;
  label: string;
  primaryAction?:
    | {
        icon?: 'ellipsis' | 'edit' | 'trash-can';
        onClick?:
          | AbstractEventHandler<
              | React.MouseEvent<HTMLButtonElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.KeyboardEvent<HTMLAnchorElement>
              | React.KeyboardEvent<HTMLButtonElement>
            >
          | undefined;
        tooltip: {
          accessibilityLabel?: string | undefined;
          text: string;
          zIndex?: Indexable | undefined;
        };
        dropdownItems?: Array<React.ReactElement<typeof Dropdown['Item']>>;
      }
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup
 */
export interface SideNavigationNestedGroupProps {
  children: React.ReactNode;
  display?: 'expandable' | 'static' | undefined;
  label: string;
}

export type OverlayPanelNodeOrRenderProp =
  | ((prop: { onDismissStart: () => void }) => React.ReactNode)
  | React.ReactNode;

/**
 * https://gestalt.pinterest.systems/web/overlaypanel
 */
export type OnAnimationEndStateType = 'in' | 'out';
export interface OverlayPanel {
  accessibilityDismissButtonLabel?: string | undefined;
  accessibilityLabel: string;
  children?: OverlayPanelNodeOrRenderProp | undefined;
  closeOnOutsideClick?: boolean | undefined;
  footer?: OverlayPanelNodeOrRenderProp | undefined;
  heading?: string | undefined;
  onAnimationEnd?: (args: { animationState: OnAnimationEndStateType }) => void;
  dismissConfirmation?: {
    message?: string | undefined;
    subtext?: string | undefined;
    primaryAction?: {
      accessibilityLabel?: string | undefined;
      text?: string | undefined;
      onClick?:
        | AbstractEventHandler<
            | React.MouseEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLButtonElement>
          >
        | undefined;
    };
    secondaryAction?: {
      accessibilityLabel?: string | undefined;
      text?: string | undefined;
      onClick?:
        | AbstractEventHandler<
            | React.MouseEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLButtonElement>
          >
        | undefined;
    };
  };
  onDismiss: () => void;
  size?: 'sm' | 'md' | 'lg' | undefined;
  subHeading?: OverlayPanelNodeOrRenderProp | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/slimbanner
 */
export interface SlimBannerProps {
  dismissButton?: OnDismissButtonObject | undefined;
  primaryAction?:
    | {
        accessibilityLabel: string;
        disabled?: boolean;
        href?: string;
        label: string;
        onClick?:
          | AbstractEventHandler<
              | React.MouseEvent<HTMLButtonElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLButtonElement>,
              {
                rel?: 'none' | 'nofollow';
                target?: null | 'self' | 'blank';
              }
            >
          | undefined;
      }
    | undefined;
  helperLink?: {
    accessibilityLabel: string;
    href: string;
    target?: null | 'self' | 'blank' | undefined;
    text: string;
    onClick?:
      | AbstractEventHandler<
          React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
          { dangerouslyDisableOnNavigation?: (() => void) | undefined }
        >
      | undefined;
  };
  iconAccessibilityLabel?: string | undefined;
  message: React.ReactElement<typeof Text> | string;
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'errorBare'
    | 'infoBare'
    | 'warningBare'
    | 'successBare'
    | 'recommendation'
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/spinner
 */
export interface SpinnerProps {
  accessibilityLabel: string;
  show: boolean;
  delay?: boolean | undefined;
  size?: 'sm' | 'md' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/status
 */
export interface StatusProps {
  type: 'unstarted' | 'inProgress' | 'halted' | 'ok' | 'problem' | 'canceled' | 'warning';
  accessibilityLabel?: string | undefined;
  subtext?: string | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sticky
 */
export interface StickyProps {
  bottom?: number | string | undefined;
  children?: React.ReactNode | undefined;
  height?: number | undefined;
  left?: number | string | undefined;
  right?: number | string | undefined;
  top?: number | string | undefined;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/switch
 */
export interface SwitchProps {
  id: string;
  onChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: boolean }>
    | undefined;
  disabled?: boolean | undefined;
  name?: string | undefined;
  switched?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table
 */
export interface TableProps {
  accessibilityLabel: string;
  borderStyle?: 'sm' | 'none' | undefined;
  children?: React.ReactNode | undefined;
  maxHeight?: number | string | undefined;
  stickyColumns?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Body
 */
export interface TableBodyProps {
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Cell
 */
export interface TableCellProps {
  children?: React.ReactNode | undefined;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Footer
 */
export interface TableFooterProps {
  children?: React.ReactNode | undefined;
  sticky?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Header
 */
export interface TableHeaderProps {
  children?: React.ReactNode | undefined;
  display?: 'tableHeaderGroup' | 'visuallyHidden';
  sticky?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.HeaderCell
 */
export interface TableHeaderCellProps extends TableCellProps {
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  colSpan?: number;
  rowSpan?: number;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Row
 */
export interface TableRowProps {
  children?: React.ReactNode | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.RowDrawer
 */
export interface TableRowDrawerProps {
  children:
    | React.ReactElement<TableCellProps>
    | Array<React.ReactElement<TableCellProps>>
    | undefined;
  drawerContents: React.ReactNode;
  id: string;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.RowExpandable
 */
export interface TableRowExpandableProps {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  expandedContents: React.ReactNode;
  id: string;
  children?: React.ReactNode | undefined;
  hoverStyle?: 'none' | 'gray' | undefined;
  onExpand?:
    | AbstractEventHandler<
        | React.MouseEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLButtonElement>
      >
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.SortableHeaderCell
 */
export interface TableSortableHeaderCellProps extends TableHeaderCellProps {
  onSortChange: AbstractEventHandler<
    React.MouseEvent<HTMLTableCellElement> | React.KeyboardEvent<HTMLTableCellElement>
  >;
  sortOrder: 'asc' | 'desc';
  status: 'active' | 'inactive';
}

/**
 * https://gestalt.pinterest.systems/web/tabs
 */
export interface TabsProps {
  activeTabIndex: number;
  onChange: (args: {
    event: React.SyntheticEvent<React.MouseEvent>;
    activeTabIndex: number;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  tabs: ReadonlyArray<{
    href: string;
    text: React.ReactNode;
    id?: string | undefined;
    indicator?: 'dot' | number | undefined;
    ref?: { current?: HTMLElement | undefined } | undefined;
  }>;
  size?: 'md' | 'lg';
  wrap?: boolean;
  bgColor?: 'default' | 'transparent';
}

/**
 * https://gestalt.pinterest.systems/web/tag
 */
export interface TagProps {
  accessibilityRemoveIconLabel?: string;
  disabled?: boolean | undefined;
  onRemove?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>> | undefined;
  text: string;
  type?: 'default' | 'error' | 'warning';
}

/**
 * https://gestalt.pinterest.systems/web/taparea
 */
export interface TapAreaProps {
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  accessibilityLabel?: string | undefined;
  children?: React.ReactNode | undefined;
  disabled?: boolean | undefined;
  fullHeight?: boolean | undefined;
  fullWidth?: boolean | undefined;
  href?: string | undefined;
  mouseCursor?:
    | 'copy'
    | 'grab'
    | 'grabbing'
    | 'move'
    | 'noDrop'
    | 'pointer'
    | 'zoomIn'
    | 'zoomOut'
    | undefined;
  onBlur?: AbstractEventHandler<React.FocusEvent<HTMLDivElement | HTMLAnchorElement>> | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLDivElement | HTMLAnchorElement>> | undefined;
  onMouseDown?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseEnter?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseLeave?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onTap?: TapAreaEventHandlerType | undefined;
  rel?: 'none' | 'nofollow' | undefined;
  role?: 'button' | 'link' | undefined;
  rounding?: 'pill' | 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  tabIndex?: -1 | 0 | undefined;
  tapStyle?: 'none' | 'compress' | undefined;
  target?: null | 'self' | 'blank' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/text
 */
export interface TextProps {
  align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight' | undefined;
  children?: React.ReactNode | undefined;
  color?:
    | 'default'
    | 'subtle'
    | 'success'
    | 'error'
    | 'warning'
    | 'shopping'
    | 'link'
    | 'inverse'
    | 'light'
    | 'dark'
    | undefined;
  inline?: boolean | undefined;
  italic?: boolean | undefined;
  overflow?: 'normal' | 'breakWord' | 'noWrap' | undefined;
  size?: '100' | '200' | '300' | '400' | '500' | '600' | undefined;
  lineClamp?: number;
  underline?: boolean | undefined;
  weight?: 'bold' | 'normal' | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/textarea
 */
export interface TextAreaProps {
  id: string;
  onChange: (args: { event: React.SyntheticEvent<HTMLTextAreaElement>; value: string }) => void;
  disabled?: boolean | undefined;
  errorMessage?: React.ReactNode | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  name?: string | undefined;
  onBlur?:
    | ((args: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void)
    | undefined;
  onFocus?:
    | ((args: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void)
    | undefined;
  onKeyDown?:
    | ((args: { event: React.KeyboardEvent<HTMLTextAreaElement>; value: string }) => void)
    | undefined;
  placeholder?: string | undefined;
  rows?: number | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  maxLength?: MaxLength | undefined;
  value?: string | undefined;
  readonly?: boolean;
  labelDisplay?: 'visible' | 'hidden' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/textfield
 */
export interface TextFieldProps {
  id: string;
  onChange: (args: { event: React.SyntheticEvent<HTMLInputElement>; value: string }) => void;
  autoComplete?:
    | 'bday'
    | 'current-password'
    | 'email'
    | 'new-password'
    | 'on'
    | 'off'
    | 'username'
    | undefined;
  disabled?: boolean | undefined;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
  errorMessage?: React.ReactNode | undefined;
  helperText?: string | undefined;
  maxLength?: MaxLength | undefined;
  label?: string | undefined;
  name?: string | undefined;
  onBlur?:
    | ((args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  onFocus?:
    | ((args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  onKeyDown?:
    | ((args: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void)
    | undefined;
  placeholder?: string | undefined;

  size?: 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  type?: 'date' | 'email' | 'password' | 'text' | 'url' | 'tel' | undefined;
  value?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/toast
 */
export interface ToastProps {
  text: string | React.ReactElement<typeof Text>;
  dissmissButton:
    | {
        accessibilityLabel?: string | undefined;
        onDismiss: () => void;
      }
    | undefined;
  helperLink?:
    | {
        text: string;
        accessibilityLabel: string;
        href: string;
        onClick?: AbstractEventHandler<
          React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
          { dangerouslyDisableOnNavigation: () => void }
        >;
      }
    | undefined;
  primaryAction?: {
    accessibilityLabel: string;
    href?: string;
    label: string;
    onClick?: ButtonEventHandlerType | undefined;
    rel?: LinkProps['rel'] | undefined;
    size?: ButtonProps['size'] | undefined;
    target?: LinkProps['target'] | undefined;
  };
  thumbnail?:
    | { image: React.ReactElement<typeof Image> }
    | { avatar: React.ReactElement<typeof Avatar> }
    | { icon: React.ReactElement<typeof Icon> }
    | undefined;
  variant?: 'default' | 'success' | 'error' | 'progress' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/tooltip
 */
export interface TooltipProps {
  children: React.ReactNode;
  text: string;
  idealDirection?: FourDirections | undefined;
  inline?: boolean | undefined;
  link?: React.ReactNode | undefined;
  zIndex?: Indexable | undefined;
  accessibilityLabel?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/upsell
 */
export interface UpsellProps {
  children?: React.ReactElement;
  message: string | React.ReactElement<typeof Text>;
  dismissButton?: OnDismissButtonObject
    | undefined;
  imageData?:
    | {
        component: React.ReactElement<any, typeof Image | typeof Icon>;
        width?: number | undefined;
        mask?:
          | {
              rounding: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
              wash: boolean;
            }
          | undefined;
      }
    | undefined;
  primaryAction?: ActionData | undefined;
  secondaryAction?: ActionData | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/upsell#Upsell.Form
 */
export interface UpsellFormProps {
  onSubmit: AbstractEventHandler<
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLAnchorElement>
  >;
  submitButtonText: string;
  submitButtonAccessibilityLabel: string;
  submitButtonDisabled?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/video
 */
export interface VideoProps {
  accessibilityMaximizeLabel?: string | undefined;
  accessibilityMinimizeLabel?: string | undefined;
  accessibilityMuteLabel?: string | undefined;
  accessibilityPauseLabel?: string | undefined;
  accessibilityPlayLabel?: string | undefined;
  accessibilityUnmuteLabel?: string | undefined;
  aspectRatio: number;
  backgroundColor?: 'black' | 'transparent' | undefined;
  captions: string;
  playbackRate?: number | undefined;
  playing?: boolean | undefined;
  preload?: 'auto' | 'metadata' | 'none' | undefined;
  src: string | ReadonlyArray<{ type: 'video/m3u8' | 'video/mp4' | 'video/ogg'; src: string }>;
  volume?: number | undefined;
  children?: Node | undefined;
  controls?: boolean | undefined;
  disableRemotePlayback?: boolean | undefined;
  crossOrigin?: 'anonymous' | 'use-credentials' | undefined;
  loop?: boolean | undefined;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined;
  onDurationChange?:
    | ((args: { event: React.SyntheticEvent<HTMLVideoElement>; duration: number }) => void)
    | undefined;
  onEnded?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onFullscreenChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { fullscreen: boolean }>
    | undefined;
  onLoadedChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { loaded: number }>
    | undefined;
  onPlay?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
  onPlayheadDown?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onPlayheadUp?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onPause?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
  onReady?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onSeek?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onTimeChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { time: number }>
    | undefined;
  onVolumeChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>, { volume: number }>
    | undefined;
  onError?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onLoadStart?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onPlaying?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onSeeking?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onStalled?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  onWaiting?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  startTime?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/washanimated
 */
export interface WashAnimatedProps {
  active?: boolean | undefined;
  children?: React.ReactNode | undefined;
  image?: React.ReactNode | undefined;
  onMouseEnter?:
    | ((args: { event: React.SyntheticEvent<React.MouseEvent<HTMLDivElement>> }) => void)
    | undefined;
  onMouseLeave?:
    | ((args: { event: React.SyntheticEvent<React.MouseEvent<HTMLDivElement>> }) => void)
    | undefined;
}

export interface Indexable {
  index(): number;
}

/**
 * https://gestalt.pinterest.systems/web/zindex_classes#FixedZIndex
 */
export class FixedZIndex implements Indexable {
  z: number;
  constructor(z: number);
  index(): number;
}

/**
 * https://gestalt.pinterest.systems/web/zindex_classes#CompositeZIndex
 */
export class CompositeZIndex implements Indexable {
  deps: Array<FixedZIndex | CompositeZIndex>;
  constructor(deps: Array<FixedZIndex | CompositeZIndex>);
  index(): number;
}

/**
 * =========================================================
 * ========================= INDEX =========================
 * =========================================================
 */

export const ActivationCard: React.FunctionComponent<ActivationCardProps>;

export const Avatar: React.FunctionComponent<AvatarProps>;

export const AvatarGroup: React.FunctionComponent<AvatarGroupProps>;

export const Badge: React.FunctionComponent<BadgeProps>;

export const Box: ReactForwardRef<HTMLDivElement, BoxProps>;

export const Button: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>;

export const ButtonGroup: React.FunctionComponent<ButtonGroupProps>;

export const Callout: React.FunctionComponent<CalloutProps>;

export const ComboBox: React.FunctionComponent<ComboBoxProps>;

export const Checkbox: ReactForwardRef<HTMLInputElement, CheckboxProps>;

export const Collage: React.FunctionComponent<CollageProps>;

export const ColorSchemeProvider: React.FunctionComponent<
  React.PropsWithChildren<ColorSchemeProviderProps>
>;

export const Column: React.FunctionComponent<ColumnProps>;

export const Container: React.FunctionComponent<ContainerProps>;

export const Datapoint: React.FunctionComponent<DatapointProps>;

export const ScrollBoundaryContainer: React.FunctionComponent<ScrollBoundaryContainerProps>;

export const DeviceTypeProvider: React.FunctionComponent<
  React.PropsWithChildren<DeviceTypeProviderProps>
>;

export const DefaultLabelProvider: React.FunctionComponent<
  React.PropsWithChildren<DefaultLabelProviderProps>
>;

export const Divider: React.FunctionComponent;

export interface DropdownSubComponents {
  Item: React.FunctionComponent<DropdownItemProps>;
  Link: React.FunctionComponent<DropdownLinkProps>;
  Section: React.FunctionComponent<DropdownSectionProps>;
}

export const Dropdown: React.FunctionComponent<DropdownProps> & DropdownSubComponents;

export const Fieldset: React.FunctionComponent<FieldsetProps>;

export interface FlexSubComponents {
  Item: React.FunctionComponent<FlexItemProps>;
}

export const Flex: React.FunctionComponent<FlexProps> & FlexSubComponents;

export const Heading: React.FunctionComponent<HeaderProps>;

export const HelpButton: React.FunctionComponent<HelpButtonProps>;

export const Icon: React.FunctionComponent<IconProps>;

export const IconButton: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>;

export const IconButtonFloating: React.FunctionComponent<IconButtonFloatingProps>;

export const Image: React.FunctionComponent<ImageProps>;

export const Label: React.FunctionComponent<LabelProps>;

export const Layer: React.FunctionComponent<LayerProps>;

export const Letterbox: React.FunctionComponent<LetterboxProps>;

export const Link: ReactForwardRef<HTMLAnchorElement, LinkProps>;

export interface ListSubCmoponents {
  Item: React.FunctionComponent<React.PropsWithChildren<ListItemProps>>;
}

export const List: React.FunctionComponent<React.PropsWithChildren<ListProps>> & ListSubCmoponents;

export const Mask: React.FunctionComponent<MaskProps>;

export const Masonry: React.FunctionComponent<MasonryProps>;

export const Modal: ReactForwardRef<HTMLDivElement, ModalProps>;

export const ModalAlert: React.FunctionComponent<React.PropsWithChildren<ModalAlertProps>>;

export interface ModuleSubComponents {
  Expandable: React.FunctionComponent<ModuleExpandableProps>;
}

export const Module: React.FunctionComponent<React.PropsWithChildren<ModuleProps>> &
  ModuleSubComponents;

export const NumberField: ReactForwardRef<HTMLInputElement, NumberFieldProps>;

export const OnLinkNavigationProvider: React.FunctionComponent<OnLinkNavigationProviderProps>;

export const PageHeader: React.FunctionComponent<PageHeaderProps>;

export const Pog: React.FunctionComponent<PogProps>;

export const Popover: React.FunctionComponent<PopoverProps>;

export const Popovereducational: React.FunctionComponent<PopoverEducationalProps>;

export const Pulsar: React.FunctionComponent<PulsarProps>;

export const RadioButton: ReactForwardRef<HTMLInputElement, RadioButtonProps>;

export interface RadioGroupSubCompnents {
  RadioButton: typeof RadioButton;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> & RadioGroupSubCompnents;

export const SearchField: ReactForwardRef<HTMLInputElement, SearchFieldProps>;

export const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;

export interface SelectListSubComponents {
  Option: React.FunctionComponent<SelectListOptionProps>;
  Group: React.FunctionComponent<SelectListGroupProps>;
}

export const SelectList: React.FunctionComponent<SelectListProps> & SelectListSubComponents;

export interface SideNavigationSubcomponents {
  Section: React.FunctionComponent<SideNavigationSectionProps>;
  TopItem: React.FunctionComponent<SideNavigationTopItemProps>;
  NestedItem: React.FunctionComponent<SideNavigationNestedItemProps>;
  Group: React.FunctionComponent<SideNavigationGroupProps>;
  NestedGroup: React.FunctionComponent<SideNavigationNestedGroupProps>;
}

export const SideNavigation: React.FunctionComponent<SideNaviationProps> &
  SideNavigationSubcomponents;

export const OverlayPanel: ReactForwardRef<HTMLDivElement, OverlayPanel>;

export const SlimBanner: React.FunctionComponent<SlimBannerProps>;

export const Spinner: React.FunctionComponent<SpinnerProps>;

export const Status: React.FunctionComponent<StatusProps>;

export const Sticky: React.FunctionComponent<StickyProps>;

export const Switch: React.FunctionComponent<SwitchProps>;

export interface TableSubCompnents {
  Body: React.FunctionComponent<TableBodyProps>;
  Cell: React.FunctionComponent<TableCellProps>;
  Footer: React.FunctionComponent<TableFooterProps>;
  Header: React.FunctionComponent<TableHeaderProps>;
  HeaderCell: React.FunctionComponent<TableHeaderCellProps>;
  Row: React.FunctionComponent<TableRowProps>;
  RowExpandable: React.FunctionComponent<TableRowExpandableProps>;
  SortableHeaderCell: React.FunctionComponent<TableSortableHeaderCellProps>;
  RowDrawer: React.FunctionComponent<TableRowDrawerProps>;
}

export const Table: React.FunctionComponent<TableProps> & TableSubCompnents;

export const Tabs: React.FunctionComponent<TabsProps>;

export const Tag: React.FunctionComponent<TagProps>;

export const TapArea: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, TapAreaProps>;

export const Text: ReactForwardRef<HTMLDivElement | HTMLSpanElement, TextProps>;

export const TextArea: ReactForwardRef<HTMLTextAreaElement, TextAreaProps>;

export const TextField: ReactForwardRef<HTMLInputElement, TextFieldProps>;

export const Toast: React.FunctionComponent<ToastProps>;

export const Tooltip: React.FunctionComponent<TooltipProps>;

export interface UpsellSubCompnents {
  Form: React.FunctionComponent<UpsellFormProps>;
}

export const Upsell: React.FunctionComponent<UpsellProps> & UpsellSubCompnents;

export const Video: React.FunctionComponent<VideoProps>;

export const WashAnimated: React.FunctionComponent<WashAnimatedProps>;

export function useReducedMotion(): boolean;

export function useFocusVisible(): { isFocusVisible: boolean };
