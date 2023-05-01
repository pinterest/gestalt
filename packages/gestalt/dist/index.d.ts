import React = require('react');

/**
 * =========================================================
 * ====================== SHARED UTILS =====================
 * =========================================================
 */

type Node = React.ReactNode;

type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (
  arg: U & {
    readonly event: T;
  },
) => void;

type ReactForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * =========================================================
 * ====================== SHARED TYPED =====================
 * =========================================================
 */

type FourDirections = 'up' | 'right' | 'down' | 'left';

type TapAreaEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLDivElement>
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>,
  { dangerouslydangerouslyDisableOnNavigation?: (() => void) | undefined }
>;

type BareButtonEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement>
>;

type ButtonEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement>,
  { dangerouslyDisableOnNavigation?: (() => void) | undefined }
>;

type VideoEventHandlerType = AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;

type EventHandlerType = (args: { readonly event: React.SyntheticEvent }) => void;

type UnsignedUpTo12 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type SignedUpTo12 = -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | UnsignedUpTo12;

type OnAnimationEndType = (args: { animationState: 'in' | 'out' }) => void;

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

interface Indexable {
  index(): number;
}

type Icons =
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
  | 'moon'
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
  | 'sun'
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

type RoundingType = 'pill' | 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type RelType = 'none' | 'nofollow';

type TargetType = null | 'self' | 'blank';

type TextSizeType = '100' | '200' | '300' | '400' | '500' | '600';

type TextAlignType = 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight';

type BaseTextColorType =
  | 'default'
  | 'subtle'
  | 'success'
  | 'error'
  | 'warning'
  | 'shopping'
  | 'inverse'
  | 'light'
  | 'dark';

type IdealDirectionType = 'up' | 'right' | 'down' | 'left';

type MobileEnterKeyHintType = 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';

interface ActionData {
  accessibilityLabel: string;
  disabled?: boolean;
  href?: string | undefined;
  label: string;
  onClick?: ButtonEventHandlerType | undefined;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
}

type DismissingElementChildrenType = (arg: { onDismissStart: () => void }) => Node;

/**
 * =========================================================
 * ================= UTILITY API INTERFACES ================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/utilities/colorschemeprovider
 */
export interface ColorSchemeProviderProps {
  children: Node;
  colorScheme: 'light' | 'dark' | 'userPreference';
  id?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider
 */
export interface DefaultLabelProviderProps {
  children: Node;
  labels?:
    | {
        ComboBox: {
          accessibilityClearButtonLabel: string;
        };
        Link: {
          accessibilityNewTabLabel: string;
        };
        Modal: {
          accessibilityDismissButtonLabel: string;
        };
        Popover: {
          accessibilityDismissButtonLabel: string;
        };
        OverlayPanel: {
          accessibilityDismissButtonLabel: string;
          dismissConfirmationMessage: string;
          dismissConfirmationSubtext: string;
          dismissConfirmationPrimaryActionText: string;
          dismissConfirmationPrimaryActionTextLabel: string;
          dismissConfirmationSecondaryActionText: string;
          dismissConfirmationSecondaryActionTextLabel: string;
        };
        SheetMobile: {
          accessibilityDismissButtonLabel: string;
          accessibilityGrabberLabel: string;
          accessibilityLabel: string;
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
        HelpButton: {
          tooltipMessage: string;
        };
        Toast: {
          accessibilityDismissButtonLabel: string;
          accessibilityIconSuccessLabel: string;
          accessibilityIconErrorLabel: string;
          accessibilityProcessingLabel: string;
        };
      }
    | null
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/utilities/devicetypeprovider
 */
export interface DeviceTypeProviderProps {
  children: Node;
  deviceType: 'desktop' | 'mobile';
}

/**
 * https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider
 */
export interface OnLinkNavigationProviderProps {
  children: Node;
  onNavigation?:
    | ((args: {
        href: string;
        target?: null | 'self' | 'blank' | undefined;
      }) => EventHandlerType | null | undefined)
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/scrollboundarycontainer
 */
export interface ScrollBoundaryContainerProps {
  children: Node;
  height?: number | string | undefined;
  overflow?: 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible' | undefined;
}

/**
 * =========================================================
 * =============== COMPONENT API INTERFACES  ===============
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
        rel?: RelType | undefined;
        target?: TargetType | undefined;
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

type AlignContentType = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
type AlignItemsType = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type DirectionType = 'row' | 'column';
type DisplayType = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden';
type FlexType = 'grow' | 'shrink' | 'none';
type JustifyContentType = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
type OverflowType = 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto';

/**
 * https://gestalt.pinterest.systems/web/box
 */
export interface BoxProps extends BoxPassthroughProps {
  alignContent?: AlignContentType | undefined;
  alignItems?: AlignItemsType | undefined;
  smAlignItems?: AlignItemsType | undefined;
  mdAlignItems?: AlignItemsType | undefined;
  lgAlignItems?: AlignItemsType | undefined;
  alignSelf?: 'auto' | AlignItemsType | undefined;
  as?:
    | 'article'
    | 'aside'
    | 'caption'
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
  children?: Node | undefined;
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
  direction?: DirectionType | undefined;
  smDirection?: DirectionType | undefined;
  mdDirection?: DirectionType | undefined;
  lgDirection?: DirectionType | undefined;
  display?: DisplayType | undefined;
  smDisplay?: DisplayType | undefined;
  mdDisplay?: DisplayType | undefined;
  lgDisplay?: DisplayType | undefined;
  fit?: boolean | undefined;
  flex?: FlexType | undefined;
  height?: number | string | undefined;
  justifyContent?: JustifyContentType | undefined;
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
  overflow?: OverflowType | undefined;
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
  rounding?: RoundingType | undefined;
  top?: boolean | undefined;
  userSelect?: 'auto' | 'none' | undefined;
  width?: number | string | undefined;
  wrap?: boolean | undefined;
  zIndex?: Indexable | undefined;
}

interface CommonButtonProps {
  text: string;
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
  dataTestId?: string;
  disabled?: boolean | undefined;
  fullWidth?: boolean | undefined;
  iconEnd?: Icons | undefined;
  name?: string | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  size?: 'sm' | 'md' | 'lg' | undefined;
  tabIndex?: -1 | 0 | undefined;
}

interface ButtonLinkProps extends CommonButtonProps {
  role: 'link';
  href: string;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
}

interface ButtonButtonProps extends CommonButtonProps {
  role?: 'button' | undefined;
  type?: 'button' | undefined;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  selected?: boolean | undefined;
}

interface ButtonSubmitProps extends CommonButtonProps {
  role: 'button';
  type: 'submit';
}

/**
 * https://gestalt.pinterest.systems/web/button
 */
export type ButtonProps = ButtonLinkProps | ButtonButtonProps | ButtonSubmitProps;

/**
 * https://gestalt.pinterest.systems/web/buttongroup
 */
export interface ButtonGroupProps {
  children?: Node | undefined;
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
  helperText?: string | undefined;
  image?: Node | undefined;
  indeterminate?: boolean | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  name?: string | undefined;
  onClick?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>
    | undefined;
  size?: 'sm' | 'md' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/collage
 */
export interface CollageProps {
  columns: number;
  height: number;
  renderImage: (args: { width: number; height: number; index: number }) => Node;
  width: number;
  cover?: boolean | undefined;
  gutter?: number | undefined;
  layoutKey?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/column
 */
export interface ColumnProps {
  span: UnsignedUpTo12;
  smSpan?: UnsignedUpTo12 | undefined;
  mdSpan?: UnsignedUpTo12 | undefined;
  lgSpan?: UnsignedUpTo12 | undefined;
  children?: Node | undefined;
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
  id: string;
  label: string;
  options: ComboBoxItemType[];
  noResultText: string;
  accessibilityClearButtonLabel?: string | undefined;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;

  helperText?: string | undefined;
  inputValue?: string | null | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  onChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>
    | undefined;
  onBlur?:
    | AbstractEventHandler<
        React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>,
        { value: string }
      >
    | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLInputElement>, { value: string }> | undefined;
  onKeyDown?:
    | AbstractEventHandler<React.KeyboardEvent<HTMLInputElement>, { value: string }>
    | undefined;
  onClear?: (() => void) | undefined;
  onSelect?:
    | AbstractEventHandler<
        React.SyntheticEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
        { item: ComboBoxItemType }
      >
    | undefined;
  placeholder?: string | undefined;
  selectedOption?: ComboBoxItemType | undefined;
  size?: 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/container
 */
export interface ContainerProps {
  children?: Node | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/datapoint
 */
export interface DatapointProps {
  title: string;
  value: string;
  badge?: BadgeObject | undefined;
  size?: 'md' | 'lg' | undefined;
  tooltipText?: string | undefined;
  tooltipZIndex?: Indexable | undefined;
  trend?: { accessibilityLabel: string; value: number } | undefined;
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown
 */
export interface DropdownProps {
  children: Node;
  id: string;
  onDismiss: () => void;
  anchor?: HTMLElement | null | undefined;
  headerContent?: Node | undefined;
  idealDirection?: FourDirections | undefined;
  isWithinFixedContainer?: boolean | undefined;
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
  onSelect: AbstractEventHandler<
    React.FocusEvent<HTMLInputElement>,
    {
      item: DropdownOption;
    }
  >;
  option: DropdownOption;
  badge?: BadgeObject | undefined;
  children?: Node;
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
  children?: Node;
  dataTestId?: string | undefined;
  isExternal?: boolean | undefined;
  onClick?: ButtonEventHandlerType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Section
 */
export interface DropdownSectionProps {
  children: Node;
  label: string;
}

/**
 * https://gestalt.pinterest.systems/web/fieldset
 */
export interface FieldsetProps {
  children: Node;
  legend: string;
  id?: string;
  errorMessage?: string;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/flex
 */
export interface FlexProps {
  alignContent?: AlignContentType | undefined;
  alignItems?: AlignItemsType | undefined;
  alignSelf?: 'auto' | AlignItemsType | undefined;
  smAlignItems?: AlignItemsType | undefined;
  mdAlignItems?: AlignItemsType | undefined;
  lgAlignItems?: AlignItemsType | undefined;
  children?: Node | undefined;
  dataTestId?: string | undefined;
  direction?: DirectionType | undefined;
  flex?: FlexType | undefined;
  gap?: UnsignedUpTo12 | { row: UnsignedUpTo12; column: UnsignedUpTo12 } | undefined;
  height?: number | string | undefined;
  justifyContent?: JustifyContentType | undefined;
  maxHeight?: number | string | undefined;
  maxWidth?: number | string | undefined;
  minHeight?: number | string | undefined;
  minWidth?: number | string | undefined;
  overflow?: OverflowType | undefined;
  width?: number | string | undefined;
  wrap?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/flex#Flex.Item
 */
export interface FlexItemProps {
  alignSelf?: 'auto' | AlignItemsType | undefined;
  children?: Node | undefined;
  dataTestId?: string | undefined;
  flex?: FlexType | undefined;
  flexBasis?: string | number | undefined;
  maxWidth?: number | string | undefined;
  minWidth?: number | string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/heading
 */
export interface HeadingProps {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 'none' | undefined;
  align?: TextAlignType | undefined;
  children?: Node | undefined;
  color?: BaseTextColorType | undefined;
  id?: string | undefined;
  lineClamp?: number | undefined;
  overflow?: 'normal' | 'breakWord' | undefined;
  size?: TextSizeType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/helpbutton
 */
export interface HelpButtonProps {
  accessibilityLabel: string;
  accessibilityPopoverLabel: string;
  text: string | React.ReactElement<typeof Text>;
  idealDirection?: IdealDirectionType | undefined;
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
            }
          | undefined;
        href: string;
        onClick?:
          | AbstractEventHandler<
              React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
              {
                dangerouslyDisableOnNavigation: () => void;
              }
            >
          | undefined;
        ref?: React.Ref<'a'>;
        target?: TargetType | undefined;
      }
    | undefined;
  onClick?: TapAreaEventHandlerType | undefined;
  zIndex?: Indexable | undefined;
}

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
    | 'recommendation'
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

interface CommonIconButtonProps {
  accessibilityLabel: string;
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
  disabled?: boolean | undefined;
  icon?: Icons | undefined;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  padding?: 1 | 2 | 3 | 4 | 5 | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  tabIndex?: -1 | 0 | undefined;
  tooltip?:
    | Pick<TooltipProps, 'accessibilityLabel' | 'inline' | 'idealDirection' | 'text' | 'zIndex'>
    | undefined;
}

interface IconButtonLinkProps extends CommonIconButtonProps {
  role: 'link';
  href: string;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
}

interface IconButtonButtonProps extends CommonIconButtonProps {
  role?: 'button' | undefined;
  type?: 'button' | undefined;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  accessibilityPopupRole?: 'menu' | 'dialog' | undefined;
  selected?: boolean | undefined;
}

interface IconButtonSubmitProps extends CommonIconButtonProps {
  role: 'button' | undefined;
  type: 'submit';
}

/**
 * https://gestalt.pinterest.systems/web/iconbutton
 */
export type IconButtonProps = IconButtonLinkProps | IconButtonButtonProps | IconButtonSubmitProps;

/**
 * https://gestalt.pinterest.systems/web/iconbuttonfloating
 */
export interface IconButtonFloatingProps {
  accessibilityPopupRole: 'menu' | 'dialog';
  accessibilityLabel: string;
  icon: Icons;
  onClick: ButtonEventHandlerType;
  tooltip: {
    accessibilityLabel?: string | undefined;
    inline?: boolean | undefined;
    text: string;
    zIndex?: Indexable | undefined;
  };
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  dangerouslySetSvgPath?: { __path: string } | undefined;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/image
 */
export interface ImageProps {
  alt: string;
  naturalHeight: number;
  naturalWidth: number;
  src: string;
  children?: Node | undefined;
  color?: string | undefined;
  crossOrigin?: 'anonymous' | 'use-credentials' | undefined;
  decoding?: 'sync' | 'async' | 'auto' | undefined;
  elementTiming?: string | undefined;
  fetchPriority?: 'high' | 'low' | 'auto' | undefined;
  fit?: 'cover' | 'contain' | 'none' | undefined;
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
  children?: Node | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/layer
 */
export interface LayerProps {
  children: Node;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/letterbox
 */
export interface LetterboxProps {
  contentAspectRatio: number;
  height: number;
  width: number;
  children?: Node | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/link
 */
export interface LinkProps {
  href: string;
  accessibilityLabel?: string | undefined;
  children?: Node | undefined;
  display?: 'inline' | 'inlineBlock' | 'block' | undefined;
  externalLinkIcon?:
    | 'none'
    | 'default'
    | { color: IconProps['color']; size: TextProps['size'] }
    | undefined;

  id?: string | undefined;
  onBlur?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation?: (() => void) | undefined }
      >
    | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  rel?: RelType | undefined;
  rounding?: RoundingType | undefined;
  tapStyle?: 'none' | 'compress' | undefined;
  target?: TargetType | undefined;
  underline?: 'auto' | 'none' | 'always' | 'hover' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/list
 */
export interface ListProps {
  children: Node;
  label?: string | React.ReactElement<typeof Text>;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  spacing?: 'regular' | 'condensed' | undefined;
  type?: 'bare' | 'ordered' | 'unordered' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/list#List.Itemt
 */
export interface ListItemProps {
  text: string | React.ReactElement<typeof Text>;
  children?:
    | string
    | React.ReactElement<typeof List>
    | React.ReactElement<typeof List.Item>
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/mask
 */
export interface MaskProps {
  children?: Node | undefined;
  height?: number | string | undefined;
  rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  wash?: boolean | undefined;
  width?: number | string | undefined;
  willChangeTransform?: boolean | undefined;
}

export interface MeasurementStore<K, V> {
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
  reset(): void;
}

/**
 * https://gestalt.pinterest.systems/web/masonry
 */
export interface MasonryProps<T = any> {
  _batchPaints?: boolean | undefined;
  items: ReadonlyArray<T>;
  renderItem: (args: { data: T; itemIdx: number; isMeasuring: boolean }) => Node;

  columnWidth?: number | undefined;
  gutterWidth?: number | undefined;
  layout?:
    | 'basic'
    | 'basicCentered'
    | 'flexible'
    | 'serverRenderedFlexible'
    | 'uniformRow'
    | undefined;
  loadItems?: false | ((_arg?: { from: number }) => undefined | boolean | {}) | undefined;
  measurementStore?: MeasurementStore<T, any>;
  minCols?: number | undefined;
  scrollContainer?: (() => HTMLElement) | undefined;
  virtualBoundsBottom?: number | undefined;
  virtualBoundsTop?: number | undefined;
  virtualBufferFactor?: number | undefined;
  virtualize?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/modal
 */

export interface ModalProps {
  accessibilityModalLabel: string;
  onDismiss: () => void;
  _dangerouslyDisableScrollBoundaryContainer?: boolean;
  align?: 'center' | 'start' | undefined;
  children?: Node | undefined;
  closeOnOutsideClick?: boolean | undefined;
  footer?: Node | undefined;
  heading?: Node | undefined;
  padding?: 'defaut' | 'none' | undefined;
  role?: 'alertdialog' | 'dialog' | undefined;
  size?: 'sm' | 'md' | 'lg' | number | undefined;
  subHeading?: string | undefined;
}

export interface ModalAlertActionDataType {
  accessibilityLabel: string;
  label: string;
  dataTestId?: string | undefined;
  disabled?: boolean | undefined;
  href?: string | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/modalalert
 */
export interface ModalAlertProps {
  accessibilityModalLabel: string;
  children: Node;
  heading: string;
  onDismiss: () => void;
  primaryAction: ModalAlertActionDataType;
  accessibilityDismissButtonLabel?: string | undefined;
  secondaryAction?: ModalAlertActionDataType | undefined;
  type?: 'default' | 'warning' | 'error' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/module
 */
export interface ModuleProps {
  id: string;
  badge?: BadgeObject | undefined;
  children?: Node | undefined;
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
    badge?: BadgeObject | undefined;
    children?: Node | undefined;
    icon?: Icons | undefined;
    iconAccessibilityLabel?: string | undefined;
    iconButton?: React.ReactElement<typeof IconButton> | undefined;
    summary?: ReadonlyArray<string> | undefined;
    type?: 'info' | 'error' | undefined;
  }>;
  expandedIndex?: number | null | undefined;
  onExpandedChange?: ((expandedIndex: number | null) => void) | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/numberfield
 */
export interface NumberFieldProps {
  id: string;
  onChange: AbstractEventHandler<
    React.SyntheticEvent<HTMLInputElement>,
    {
      value: number | undefined;
    }
  >;
  autoComplete?: 'on' | 'off' | undefined;
  disabled?: boolean | undefined;
  errorMessage?: Node | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  max?: number | undefined;
  min?: number | undefined;
  mobileEnterKeyHint?: MobileEnterKeyHintType | undefined;
  name?: string | undefined;
  onBlur?:
    | AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: number | undefined;
        }
      >
    | undefined;
  onFocus?:
    | AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: number | undefined;
        }
      >
    | undefined;
  onKeyDown?:
    | AbstractEventHandler<
        React.KeyboardEvent<HTMLInputElement>,
        {
          value: number | undefined;
        }
      >
    | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  step?: number | undefined;
  value?: number | undefined;
}

type NodeOrRenderProp = ((prop: { onDismissStart: () => void }) => Node) | Node;

/**
 * https://gestalt.pinterest.systems/web/overlaypanel
 */
export interface OverlayPanelProps {
  accessibilityLabel: string;
  children?: NodeOrRenderProp | undefined;
  onDismiss: () => void;
  accessibilityDismissButtonLabel?: string | undefined;
  closeOnOutsideClick?: boolean | undefined;
  dismissConfirmation?: {
    message?: string | undefined;
    subtext?: string | undefined;
    primaryAction?: {
      accessibilityLabel?: string | undefined;
      text?: string | undefined;
      onClick?: BareButtonEventHandlerType | undefined;
    };
    secondaryAction?: {
      accessibilityLabel?: string | undefined;
      text?: string | undefined;
      onClick?: BareButtonEventHandlerType | undefined;
    };
  };
  footer?: NodeOrRenderProp | undefined;
  heading?: string | undefined;
  onAnimationEnd?: OnAnimationEndType;
  size?: 'sm' | 'md' | 'lg' | undefined;
  subHeading?: NodeOrRenderProp | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/overlaypanel#DismissingElement
 */
export interface OverlayPanelDismissingElementProps {
  children: DismissingElementChildrenType;
}

export interface PageHeaderAction {
  component:
    | React.ReactElement<
        typeof Button | typeof IconButton | typeof Link | typeof Tooltip | typeof Text
      >
    | undefined;
  dropdownItems:
    | ReadonlyArray<
        React.ReactElement<typeof Dropdown.Item | typeof Dropdown.Link, typeof Dropdown>
      >
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
  dropdownAccessibilityLabel?: string | undefined;
  helperIconButton?:
    | {
        accessibilityLabel: string | undefined;
        accessibilityControls: string | undefined;
        accessibilityExpanded: boolean | undefined;
        onClick: ButtonEventHandlerType;
      }
    | undefined;
  helperLink?: {
    accessibilityLabel: string;
    text: string;
    href: string;
    onClick?: AbstractEventHandler<
      React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
      { dangerouslyDisableOnNavigation?: (() => void) | undefined }
    >;
  };
  items?: ReadonlyArray<Node> | undefined;
  maxWidth?: number | string | undefined;
  primaryAction?: PageHeaderAction | undefined;
  secondaryAction?: PageHeaderAction | undefined;
  subtext?: string | undefined;
  thumbnail?: React.ReactElement<typeof Image> | undefined;
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
  accessibilityDismissButtonLabel?: string | undefined;
  accessibilityLabel?: string | undefined;
  children?: Node | undefined;
  color?: 'blue' | 'red' | 'white' | 'darkGray' | undefined;
  id?: string | undefined;
  idealDirection?: FourDirections | undefined;
  onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLElement>>;
  positionRelativeToAnchor?: boolean | undefined;
  role?: 'dialog' | 'listbox' | 'menu' | 'tooltip' | undefined;
  shouldFocus?: boolean | undefined;
  showCaret?: boolean | undefined;
  showDismissButton?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number | undefined;
  __dangerouslySetMaxHeight?: '30vh' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/popovereducational
 */
export interface PopoverEducationalProps {
  accessibilityLabel?: string | undefined;
  anchor: HTMLElement | null | undefined;
  onDismiss: () => void;
  children?: Node | undefined;
  id?: string | undefined;
  idealDirection?: FourDirections | undefined;
  message?: string | React.ReactElement<typeof Text> | undefined;
  primaryAction?:
    | {
        accessibilityLabel?: string | undefined;
        href?: string | undefined;
        text: string | undefined;
        onClick?: ButtonEventHandlerType | undefined;
        rel?: RelType | undefined;
        target?: TargetType | undefined;
      }
    | undefined;
  role?: 'dialog' | 'tooltip' | undefined;
  shouldFocus?: boolean | undefined;
  size?: 'sm' | 'flexible' | undefined;
  zIndex?: Indexable | undefined;
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
  disabled?: boolean | undefined;
  image?: Node | undefined;
  label?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | undefined;
  subtext?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/radiogroup
 */
export interface RadioGroupProps {
  id: string;
  children: Node;
  legend: string;
  direction?: 'column' | 'row' | undefined;
  errorMessage?: string | undefined;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/radiogroup#RadioGroup.RadioButtonProps
 */
export interface RadioGroupRadioButtonProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>;
  value: string;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  helperText?: string | undefined;
  image?: Node | undefined;
  label?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/searchfield
 */
export interface SearchFieldProps {
  accessibilityLabel: string;
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>;
  accessibilityClearButtonLabel?: string | undefined;
  autoComplete?: 'on' | 'off' | 'username' | 'name' | undefined;
  errorMessage?: string | undefined;
  label?: string | undefined;
  onBlur?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>
    | undefined;
  onFocus?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>
    | undefined;
  onKeyDown?:
    | AbstractEventHandler<React.KeyboardEvent<HTMLInputElement>, { value: string }>
    | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  value?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/segmentedcontrol
 */
export interface SegmentedControlProps {
  items: Node[];
  onChange: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>, { activeIndex: number }>;
  selectedItemIndex: number;
  responsive?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/selectlist
 */
export interface SelectListProps {
  children: Node;
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLElement>, { value: string }>;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
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
  children: Node;
  label: string;
  disabled?: boolean | undefined;
}

type PrimaryActionType = {
  icon?: 'ellipsis' | 'edit' | 'trash-can';
  onClick?: ButtonEventHandlerType | undefined;
  tooltip: {
    accessibilityLabel?: string | undefined;
    text: string;
    zIndex?: Indexable | undefined;
  };
  dropdownItems?: Array<React.ReactElement<typeof Dropdown['Item']>>;
};

/**
 * https://gestalt.pinterest.systems/web/sheetmobile
 */
export interface SheetMobileProps {
  heading: string;
  onDismiss: () => void;
  accessibilityLabel?: string | undefined;
  align?: 'start' | 'center' | undefined;
  backIconButton?: {
    accessibilityLabel: string;
    onClick:
      | AbstractEventHandler<
          | React.MouseEvent<HTMLButtonElement>
          | React.KeyboardEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>,
          { onDismissStart: () => void }
        >
      | undefined;
    children?: Node | undefined;
    closeOnOutsideClick?: boolean | undefined;
    footer?: Node | undefined;
    forwardIconButton?: {
      accessibilityLabel: string;
      onClick:
        | AbstractEventHandler<
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>,
            { onDismissStart: () => void }
          >
        | undefined;
      onAnimationEnd?: OnAnimationEndType | undefined;
      primaryAction?: {
        accessibilityLabel: string;
        label: string;
        onClick: AbstractEventHandler<
          | React.MouseEvent<HTMLButtonElement>
          | React.KeyboardEvent<HTMLButtonElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.KeyboardEvent<HTMLAnchorElement>,
          { onDismissStart: () => void }
        >;
        href?: string | undefined;
        rel?: RelType | undefined;
        size?: 'sm' | 'md' | 'lg' | undefined;
        target?: TargetType | undefined;
      };
      role?: 'alertdialog' | 'dialog' | undefined;
      showDismissButton?: boolean | undefined;
      subHeading?: string | undefined;
      size?: 'default' | 'full' | 'auto' | undefined;
    };
  };
}

/**
 * https://gestalt.pinterest.systems/web/sheetmobile#DismissingElement
 */
export interface SheetMobileDismissingElementProps {
  children: DismissingElementChildrenType;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation
 */
export interface SideNavigationProps {
  accessibilityLabel: string;
  children: Node;
  dismissButton?: { accessibilityLabel?: string; onDismiss: () => void } | undefined;
  footer?: Node | undefined;
  header?: Node | undefined;
  showBorder?: boolean | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section
 */
export interface SideNavigationSectionProps {
  children: Node;
  label: string;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem
 */
export interface SideNavigationTopItemProps {
  href: string;
  label: string;
  active?: 'page' | 'section' | undefined;
  badge?:
    | {
        text: string;
        type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | undefined;
      }
    | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  icon?: Icons | { __path: string } | undefined;
  notificationAccessibilityLabel?: string | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  primaryAction?: PrimaryActionType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem
 */
export interface SideNavigationNestedItemProps {
  href: string;
  label: string;
  active?: 'page' | 'section' | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  onClick?: ButtonEventHandlerType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group
 */
export interface SideNavigationGroupProps {
  children: Node;
  label: string;
  badge?: BadgeProps | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  display?: 'expandable' | 'static' | undefined;
  icon?: Icons | undefined;
  notificationAccessibilityLabel?: string | undefined;
  primaryAction?: PrimaryActionType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup
 */
export interface SideNavigationNestedGroupProps {
  children: Node;
  label: string;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  display?: 'expandable' | 'static' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/slimbanner
 */
export interface SlimBannerProps {
  message: React.ReactElement<typeof Text> | string;
  dismissButton?: OnDismissButtonObject | undefined;
  helperLink?: {
    accessibilityLabel: string;
    href: string;
    text: string;
    target?: TargetType | undefined;
    onClick?:
      | AbstractEventHandler<
          React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
          { dangerouslyDisableOnNavigation?: (() => void) | undefined }
        >
      | undefined;
  };
  iconAccessibilityLabel?: string | undefined;
  primaryAction?:
    | {
        accessibilityLabel: string;
        label: string;
        disabled?: boolean | undefined;
        href?: string | undefined;
        onClick?:
          | AbstractEventHandler<
              | React.MouseEvent<HTMLButtonElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLAnchorElement>
              | React.MouseEvent<HTMLButtonElement>,
              {
                rel?: RelType | undefined;
                target?: TargetType | undefined;
              }
            >
          | undefined;
      }
    | undefined;
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'recommendation'
    | 'errorBare'
    | 'infoBare'
    | 'warningBare'
    | 'successBare'
    | 'recommendationBare'
    | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/spinner
 */
export interface SpinnerProps {
  accessibilityLabel: string;
  show: boolean;
  color?: 'default' | 'subtle' | undefined;
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
  children: Node;
  bottom?: number | string | undefined;
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
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: boolean }>;
  disabled?: boolean | undefined;
  name?: string | undefined;
  switched?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table
 */
export interface TableProps {
  accessibilityLabel: string;
  children: Node;
  borderStyle?: 'sm' | 'none' | undefined;
  maxHeight?: number | string | undefined;
  stickyColumns?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Header
 */
export interface TableHeaderProps {
  children: Node;
  display?: 'tableHeaderGroup' | 'visuallyHidden' | undefined;
  sticky?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Body
 */
export interface TableBodyProps {
  children: Node;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Footer
 */
export interface TableFooterProps {
  children: Node;
  sticky?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Cell
 */
export interface TableCellProps {
  children: Node;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.HeaderCell
 */
export interface TableHeaderCellProps {
  children: Node;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup' | undefined;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.SortableHeaderCell
 */
export interface TableSortableHeaderCellProps {
  children: Node;
  onSortChange: AbstractEventHandler<
    React.MouseEvent<HTMLTableCellElement> | React.KeyboardEvent<HTMLTableCellElement>
  >;
  sortOrder: 'asc' | 'desc';
  status: 'active' | 'inactive';
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup' | undefined;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.Row
 */
export interface TableRowProps {
  children: Node;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.RowExpandable
 */
export interface TableRowExpandableProps {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  children: Node;
  expandedContents: Node;
  id: string;
  expanded?: string | undefined;
  hoverStyle?: 'none' | 'gray' | undefined;
  onExpand?: BareButtonEventHandlerType | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/table#Table.RowDrawer
 */
export interface TableRowDrawerProps {
  children: Node;
  drawerContents: Node;
  id: string;
}

/**
 * https://gestalt.pinterest.systems/web/tabs
 */
export interface TabsProps {
  activeTabIndex: number;
  onChange: AbstractEventHandler<
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    { activeTabIndex: number; dangerouslydangerouslyDisableOnNavigation?: (() => void) | undefined }
  >;
  tabs: ReadonlyArray<{
    href: string;
    text: Node;
    id?: string | undefined;
    indicator?: 'dot' | number | undefined;
    ref?: { current?: HTMLElement | undefined } | undefined;
  }>;
  wrap?: boolean | undefined;
  bgColor?: 'default' | 'transparent' | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/tag
 */
export interface TagProps {
  onRemove: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>>;
  text: string;
  accessibilityRemoveIconLabel?: string | undefined;
  disabled?: boolean | undefined;
  type?: 'default' | 'error' | 'warning' | undefined;
}

interface CommonTapAreaProps {
  accessibilityLabel?: string | undefined;
  children: Node;
  disabled?: boolean | undefined;
  fullHeight?: boolean | undefined;
  fullWidth?: boolean | undefined;
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
  onKeyDown?:
    | AbstractEventHandler<React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseDown?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseUp?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseEnter?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onMouseLeave?:
    | AbstractEventHandler<React.MouseEvent<HTMLDivElement | HTMLAnchorElement>>
    | undefined;
  onTap?: TapAreaEventHandlerType | undefined;
  rounding?: RoundingType | undefined;
  tabIndex?: -1 | 0 | undefined;
  tapStyle?: 'none' | 'compress' | undefined;
}

interface TapAreaLinkProps extends CommonTapAreaProps {
  role: 'link';
  href: string;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
  accessibilityCurrent?:
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false'
    | 'section';
}

interface TapAreaButtonProps extends CommonTapAreaProps {
  role?: 'button' | 'switch' | undefined;
  accessibilityChecked?: boolean | undefined;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/taparea
 */
export type TapAreaProps = TapAreaLinkProps | TapAreaButtonProps;

/**
 * https://gestalt.pinterest.systems/web/text
 */
export interface TextProps {
  align?: TextAlignType | undefined;
  children?: Node | undefined;
  color?: BaseTextColorType | 'link' | undefined;
  inline?: boolean | undefined;
  italic?: boolean | undefined;
  lineClamp?: number | undefined;
  overflow?: 'normal' | 'breakWord' | 'noWrap' | undefined;
  size?: TextSizeType | undefined;
  underline?: boolean | undefined;
  weight?: 'bold' | 'normal' | undefined;
  title?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/textarea
 */
export interface TextAreaProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLTextAreaElement>, { value: string }>;
  disabled?: boolean | undefined;
  errorMessage?: Node | undefined;
  hasError?: boolean | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  maxLength?: MaxLength | undefined;
  name?: string | undefined;
  onBlur?:
    | AbstractEventHandler<React.FocusEvent<HTMLTextAreaElement>, { value: string }>
    | undefined;
  onFocus?:
    | AbstractEventHandler<React.FocusEvent<HTMLTextAreaElement>, { value: string }>
    | undefined;
  onKeyDown?:
    | AbstractEventHandler<React.KeyboardEvent<HTMLTextAreaElement>, { value: string }>
    | undefined;
  placeholder?: string | undefined;
  readonly?: boolean | undefined;
  rows?: number | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  value?: string | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/textfield
 */
export interface TextFieldProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>;
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
  errorMessage?: Node | undefined;
  hasError?: boolean | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  maxLength?: MaxLength | undefined;
  mobileEnterKeyHint?: MobileEnterKeyHintType | undefined;
  mobileInputMode?: 'none' | 'text' | 'decimal' | 'numeric' | undefined;
  name?: string | undefined;
  onBlur?: AbstractEventHandler<React.FocusEvent<HTMLInputElement>, { value: string }> | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLInputElement>, { value: string }> | undefined;
  onKeyDown?:
    | AbstractEventHandler<React.KeyboardEvent<HTMLInputElement>, { value: string }>
    | undefined;
  placeholder?: string | undefined;
  size?: 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  type?: 'date' | 'email' | 'password' | 'text' | 'url' | 'tel' | undefined;
  value?: string | undefined;
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
    label: string;
    href?: string | undefined;
    onClick?: ButtonEventHandlerType | undefined;
    rel?: RelType | undefined;
    size?: 'sm' | 'md' | 'lg' | undefined;
    target?: TargetType | undefined;
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
  children: Node;
  text: string;
  accessibilityLabel?: string | undefined;
  idealDirection?: FourDirections | undefined;
  inline?: boolean | undefined;
  link?: Node | undefined;
  zIndex?: Indexable | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/upsell
 */
export interface UpsellProps {
  message: string | React.ReactElement<typeof Text>;
  children?: React.ReactElement<typeof Upsell.Form>;
  dismissButton?: OnDismissButtonObject | undefined;
  imageData?:
    | {
        component: React.ReactElement<typeof Image | typeof Icon>;
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
  children: Node;
  onSubmit: BareButtonEventHandlerType;
  submitButtonText: string;
  submitButtonAccessibilityLabel: string;
  submitButtonDisabled?: boolean | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/video
 */
export interface VideoProps {
  accessibilityMaximizeLabel: string;
  accessibilityMinimizeLabel: string;
  accessibilityMuteLabel: string;
  accessibilityPauseLabel: string;
  accessibilityPlayLabel: string;
  accessibilityProgressBarLabel: string;
  accessibilityUnmuteLabel: string;
  aspectRatio: number;
  onPlay: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onPlayError: (args: { error: Error }) => void;
  src: string | ReadonlyArray<{ type: 'video/m3u8' | 'video/mp4' | 'video/ogg'; src: string }>;
  accessibilityHideCaptionsLabel?: string | undefined;
  accessibilityShowCaptionsLabel?: string | undefined;
  autoplay?: boolean | undefined;
  backgroundColor?: 'black' | 'transparent' | undefined;
  captions?: string | undefined;
  children?: Node | undefined;
  controls?: boolean | undefined;
  crossOrigin?: 'anonymous' | 'use-credentials' | undefined;
  disableRemotePlayback?: boolean | undefined;
  loop?: boolean | undefined;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined;
  onControlsPause?:
    | AbstractEventHandler<
        React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>
      >
    | undefined;
  onControlsPlay?:
    | AbstractEventHandler<
        React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>
      >
    | undefined;
  onDurationChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { duration: number }>
    | undefined;
  onEnded?: VideoEventHandlerType | undefined;
  onError?: VideoEventHandlerType | undefined;
  onFullscreenChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { fullscreen: boolean }>
    | undefined;
  onLoadedChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { loaded: number }>
    | undefined;
  onLoadStart?: VideoEventHandlerType | undefined;
  onPause?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
  onPlayheadDown?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onPlayheadUp?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onPlaying?: VideoEventHandlerType | undefined;
  onReady?: VideoEventHandlerType | undefined;
  onSeek?: VideoEventHandlerType | undefined;
  onSeeking?: VideoEventHandlerType | undefined;
  onStalled?: VideoEventHandlerType | undefined;
  onTimeChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { time: number }>
    | undefined;
  onVolumeChange?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>, { volume: number }>
    | undefined;
  onWaiting?: VideoEventHandlerType | undefined;
  playbackRate?: number | undefined;
  playing?: boolean | undefined;
  playsInline?: boolean | undefined;
  poster?: string | undefined;
  preload?: 'auto' | 'metadata' | 'none' | undefined;
  startTime?: number | undefined;
  volume?: number | undefined;
}

/**
 * https://gestalt.pinterest.systems/web/washanimated
 */
export interface WashAnimatedProps {
  active?: boolean | undefined;
  children?: Node | undefined;
  image?: Node | undefined;
  onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
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

export const Heading: React.FunctionComponent<HeadingProps>;

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

export interface RadioGroupSubComponents {
  RadioButton: React.FunctionComponent<RadioGroupRadioButtonProps>;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> & RadioGroupSubComponents;

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

export const SideNavigation: React.FunctionComponent<SideNavigationProps> &
  SideNavigationSubcomponents;

export interface OverlayPanelSubComponents {
  DismissingElement: React.FunctionComponent<OverlayPanelDismissingElementProps>;
}

export const OverlayPanel: ReactForwardRef<HTMLDivElement, OverlayPanelProps> &
  OverlayPanelSubComponents;

export interface SheetMobileSubComponents {
  DismissingElement: React.FunctionComponent<SheetMobileDismissingElementProps>;
}

export const SheetMobile: ReactForwardRef<HTMLDivElement, SheetMobileProps> &
  SheetMobileSubComponents;

export const SlimBanner: React.FunctionComponent<SlimBannerProps>;

export const Spinner: React.FunctionComponent<SpinnerProps>;

export const Status: React.FunctionComponent<StatusProps>;

export const Sticky: React.FunctionComponent<StickyProps>;

export const Switch: React.FunctionComponent<SwitchProps>;

export interface TableSubComponents {
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

export const Table: React.FunctionComponent<TableProps> & TableSubComponents;

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
