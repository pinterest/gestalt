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
type PopoverDirections = 'up' | 'right' | 'down' | 'left' | 'forceDown';

type TapAreaEventHandlerType = AbstractEventHandler<
  React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
>;

type BareButtonEventHandlerType = AbstractEventHandler<
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLAnchorElement>
  | React.KeyboardEvent<HTMLButtonElement>
>;

type ButtonEventHandlerType = AbstractEventHandler<
  React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
>;

type ButtonLinkEventHandlerType = AbstractEventHandler<
  React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
  { dangerouslyDisableOnNavigation: (() => void) | undefined }
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
    | 'recommendation'
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
  | '3D'
  | '3D-move'
  | '360'
  | 'accessibility'
  | 'ad'
  | 'ad-group'
  | 'add'
  | 'add-circle'
  | 'add-layout'
  | 'add-pin'
  | 'add-section'
  | 'ads-overview'
  | 'ads-stats'
  | 'alert'
  | 'align-bottom'
  | 'align-bottom-center'
  | 'align-bottom-left'
  | 'align-bottom-right'
  | 'align-middle'
  | 'align-top'
  | 'align-top-center'
  | 'align-top-left'
  | 'align-top-right'
  | 'alphabetical'
  | 'android-share'
  | 'angled-pin'
  | 'api'
  | 'apple'
  | 'apps'
  | 'arrow-back'
  | 'arrow-circle-back'
  | 'arrow-circle-down'
  | 'arrow-circle-forward'
  | 'arrow-circle-up'
  | 'arrow-counter-clockwise'
  | 'arrow-down'
  | 'arrow-end'
  | 'arrow-forward'
  | 'arrow-left-curved'
  | 'arrow-start'
  | 'arrow-up'
  | 'arrow-up-left'
  | 'arrow-up-right'
  | 'arrows-vertical'
  | 'bell'
  | 'board'
  | 'briefcase'
  | 'business-hierarchy'
  | 'calendar'
  | 'calendar-check'
  | 'camera'
  | 'camera-flip'
  | 'camera-roll'
  | 'cancel'
  | 'canonical-pin'
  | 'captions'
  | 'captions-outline'
  | 'check'
  | 'check-circle'
  | 'chevron-up-circle'
  | 'circle-outline'
  | 'clear'
  | 'clock'
  | 'clock-checked'
  | 'code'
  | 'code-checked'
  | 'cog'
  | 'collapse'
  | 'color-picker'
  | 'color-solid'
  | 'color-split'
  | 'compass'
  | 'compose'
  | 'conversion-tag'
  | 'copy-to-clipboard'
  | 'credit-card'
  | 'crop'
  | 'dash'
  | 'data-source'
  | 'desktop'
  | 'diagnostics'
  | 'directional-arrow-left'
  | 'directional-arrow-right'
  | 'download'
  | 'drag-drop'
  | 'duplicate'
  | 'edit'
  | 'ellipsis'
  | 'ellipsis-circle-outline'
  | 'envelope'
  | 'expand'
  | 'eye'
  | 'eye-hide'
  | 'face-happy'
  | 'face-neutral'
  | 'face-sad'
  | 'face-smiley'
  | 'face-tryon'
  | 'facebook'
  | 'fade'
  | 'file-box'
  | 'file-unknown'
  | 'fill-opaque'
  | 'fill-transparent'
  | 'filter'
  | 'flag'
  | 'flame'
  | 'flash'
  | 'flashlight'
  | 'flipHorizontal'
  | 'flipVertical'
  | 'folder'
  | 'forward'
  | 'gif'
  | 'globe'
  | 'globe-checked'
  | 'gmail'
  | 'graph-bar'
  | 'graph-pie'
  | 'hand-pointing'
  | 'handle'
  | 'heart'
  | 'heart-broken'
  | 'heart-health'
  | 'heart-outline'
  | 'history'
  | 'home'
  | 'idea-pin'
  | 'image-portrait'
  | 'impressum'
  | 'info-circle'
  | 'information'
  | 'insights-audience'
  | 'insights-conversion'
  | 'instagram'
  | 'invoice'
  | 'key'
  | 'knoop'
  | 'layout'
  | 'lightbulb'
  | 'lightning-bolt-circle'
  | 'link'
  | 'lips'
  | 'live'
  | 'location'
  | 'lock'
  | 'logo-large'
  | 'logo-small'
  | 'logout'
  | 'magic-pen'
  | 'manage-access'
  | 'margins-large'
  | 'margins-medium'
  | 'margins-small'
  | 'maximize'
  | 'megaphone'
  | 'menu'
  | 'minimize'
  | 'mobile'
  | 'moon'
  | 'move'
  | 'move-pin'
  | 'music-off'
  | 'music-on'
  | 'mute'
  | 'overlay-text'
  | 'overlay-text-outline'
  | 'overview'
  | 'pause'
  | 'people'
  | 'person'
  | 'person-add'
  | 'phone'
  | 'pin'
  | 'pin-hide'
  | 'pincode'
  | 'pinterest'
  | 'play'
  | 'protect'
  | 'question-mark'
  | 'refresh'
  | 'remove'
  | 'reorder-images'
  | 'replace'
  | 'report'
  | 'rewind'
  | 'rotate'
  | 'save-outline'
  | 'saved'
  | 'scale'
  | 'scissors'
  | 'search'
  | 'security'
  | 'send'
  | 'service-dropbox'
  | 'service-etsy'
  | 'service-messenger'
  | 'service-outlook'
  | 'service-yahoo'
  | 'service-youtube'
  | 'share'
  | 'shopping-bag'
  | 'shrink'
  | 'skintone'
  | 'smiley'
  | 'smiley-outline'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sound'
  | 'sparkle'
  | 'speech'
  | 'speech-ellipsis'
  | 'speech-exclamation-point'
  | 'speech-heart'
  | 'speech-outline'
  | 'spread'
  | 'star'
  | 'star-half'
  | 'star-outline'
  | 'sticker'
  | 'sun'
  | 'switch-account'
  | 'table'
  | 'tag'
  | 'target'
  | 'terms'
  | 'text-align-center'
  | 'text-align-left'
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
  | 'thumbs-down'
  | 'thumbs-up'
  | 'trash-can'
  | 'trending'
  | 'twitter'
  | 'upload-feed'
  | 'video-advance-10-seconds'
  | 'video-camera'
  | 'video-rewind-10-seconds'
  | 'view-type-default'
  | 'view-type-dense'
  | 'view-type-list'
  | 'view-type-space'
  | 'visit'
  | 'whats-app'
  | 'wifi-no'
  | 'workflow-status-all'
  | 'workflow-status-canceled'
  | 'workflow-status-halted'
  | 'workflow-status-in-progress'
  | 'workflow-status-ok'
  | 'workflow-status-problem'
  | 'workflow-status-queued'
  | 'workflow-status-unstarted'
  | 'workflow-status-warning'
  | 'x';

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

type DataVisualizationColors =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12';

type TrendObject = {
  accessibilityLabel: string;
  value: number;
};

interface ButtonActionData {
  accessibilityLabel: string;
  disabled?: boolean;
  label: string;
  onClick?: ButtonEventHandlerType | undefined;
  role?: 'button';
}

interface LinkActionData {
  accessibilityLabel: string;
  disabled?: boolean;
  href: string | undefined;
  label: string;
  onClick?: ButtonLinkEventHandlerType | undefined;
  rel?: RelType | undefined;
  role: 'link';
  target?: TargetType | undefined;
}

type DismissingElementChildrenType = (arg: { onDismissStart: () => void }) => Node;

/**
 * =========================================================
 * ================= UTILITY API INTERFACES ================
 * =========================================================
 */

interface ColorSchemeProviderProps {
  children: Node;
  colorScheme: 'light' | 'dark' | 'userPreference';
  id?: string | undefined;
}

interface DefaultLabelProviderProps {
  children: Node;
  labels?:
    | {
        Accordion: {
          accessibilityCollapseLabel: string;
          accessibilityExpandLabel: string;
        };
        ActivationCard: {
          accessibilityDismissButtonLabel: string;
        };
        BannerOverlay: {
          accessibilityDismissButtonLabel: string;
        };
        BannerCallout: {
          accessibilityDismissButtonLabel: string;
          iconAccessibilityLabelError: string;
          iconAccessibilityLabelInfo: string;
          iconAccessibilityLabelRecommendation: string;
          iconAccessibilityLabelWarning: string;
          iconAccessibilityLabelSuccess: string;
        };
        ChartGraph: {
          accessibilityLabelPrefixText: string;
          defaultViewText: string;
          accessibleViewText: string;
          tabularData: string;
          accessibilityLabelDismissModal: string;
          tableSeriesText: string;
          tableXAxisText: string;
          tableYAxisText: string;
          downloadCsvButtonText: string;
          cancelButtonText: string;
        };
        ComboBox: {
          noResultText: string;
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
        SideNavigation: {
          accessibilityDismissButtonLabel: string;
        };
        BannerSlim: {
          accessibilityDismissButtonLabel: string;
          iconAccessibilityLabelError: string;
          iconAccessibilityLabelInfo: string;
          iconAccessibilityLabelRecommendation: string;
          iconAccessibilityLabelWarning: string;
          iconAccessibilityLabelSuccess: string;
        };
        Spinner: {
          accessibilityLabel: string;
        };
        Tag: {
          accessibilityErrorIconLabel: string;
          accessibilityRemoveIconLabel: string;
          accessibilityWarningIconLabel: string;
        };
        TagData: {
          accessibilityRemoveIconLabel: string;
        };
        TextField: {
          accessibilityHidePasswordLabel: string;
          accessibilityShowPasswordLabel: string;
        };
        BannerUpsell: {
          accessibilityDismissButtonLabel: string;
        };
        Video: {
          accessibilityMaximizeLabel: string;
          accessibilityMinimizeLabel: string;
          accessibilityMuteLabel: string;
          accessibilityPauseLabel: string;
          accessibilityPlayLabel: string;
          accessibilityProgressLabel: string;
          accessibilityUnmuteLabel: string;
          accessibilityHideCaptionsLabel: string;
          accessibilityShowCaptionsLabel: string;
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

interface DeviceTypeProviderProps {
  children: Node;
  deviceType: 'desktop' | 'mobile';
}

interface GlobalEventsHandlerProviderProps {
  children: Node;
  dateFieldHandlers?: { onRender?: (() => void) | undefined } | undefined;
  datePickerHandlers?: { onRender?: (() => void) | undefined } | undefined;
  dateRangeHandlers?: { onRender?: (() => void) | undefined } | undefined;
  radioGroupHandlers?: { onRender?: (() => void) | undefined } | undefined;
  linkHandlers?: {
    onNavigation: (arg: {
      href: string;
      target?: null | 'self' | 'blank' | undefined;
    }) => EventHandlerType | null | void;
  };
  sheetMobileHandlers?:
    | { onOpen?: (() => void) | undefined; onClose?: (() => void) | undefined }
    | undefined;
}

interface ScrollBoundaryContainerProps {
  children: Node;
  height?: number | string | undefined;
  overflow?: 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible' | undefined;
}

/**
 * =========================================================
 * =============== COMPONENT API INTERFACES  ===============
 * =========================================================
 */

interface ActivationCardProps {
  message: string;
  status: 'notStarted' | 'pending' | 'needsAttention' | 'complete';
  statusMessage: string;
  title: string;
  dismissButton?:
    | {
        accessibilityLabel?: string;
        onDismiss: () => void;
      }
    | undefined;
  link?:
    | {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ButtonLinkEventHandlerType | undefined;
        rel?: RelType | undefined;
        target?: TargetType | undefined;
      }
    | undefined;
}

interface AvatarProps {
  name: string;
  accessibilityLabel?: string | undefined;
  outline?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit' | undefined;
  src?: string | undefined;
  verified?: boolean | undefined;
}

interface AvatarGroupProps {
  accessibilityLabel: string;
  collaborators: ReadonlyArray<{ name: string; src?: string | undefined }>;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  addCollaborators?: boolean | undefined;
  href?: string | undefined;
  onClick?:
    | AbstractEventHandler<
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation?: (() => void) | undefined }
      >
    | undefined;
  role?: 'button' | 'link' | undefined;
  size?: 'xs' | 'sm' | 'md' | 'fit' | undefined;
}

interface BannerOverlayProps {
  onDismiss: () => void;
  message: string | React.ReactElement<typeof Text>;
  offset?: { bottom: number; top: number };
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
  primaryAction?:
    | {
        accessibilityLabel: string;
        label: string;
        href: string | undefined;
        onClick?: ButtonEventHandlerType | undefined;
        rel?: RelType | undefined;
        role: 'link';
        size?: 'sm' | 'md' | 'lg' | undefined;
        target?: TargetType | undefined;
      }
    | {
        accessibilityLabel: string;
        label: string;
        onClick: ButtonEventHandlerType | undefined;
        role?: 'button';
        size?: 'sm' | 'md' | 'lg' | undefined;
      };
  thumbnail?:
    | { image: React.ReactElement<typeof Image> }
    | { avatar: React.ReactElement<typeof Avatar> }
    | { icon: React.ReactElement<typeof Icon> }
    | undefined;
  title?: string;
  zIndex?: Indexable;
}

interface BadgeProps {
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

type BoxPassthroughProps = Omit<
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

interface BoxProps extends BoxPassthroughProps {
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

interface ButtonProps {
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
  dataTestId?: string;
  disabled?: boolean | undefined;
  fullWidth?: boolean | undefined;
  iconEnd?: Icons | undefined;
  name?: string | undefined;
  onClick?: ButtonEventHandlerType | undefined;
  selected?: boolean | undefined;
  size?: 'sm' | 'md' | 'lg' | undefined;
  tabIndex?: -1 | 0 | undefined;
  text: string;
  type?: 'button' | 'submit' | undefined;
}

interface ButtonLinkProps {
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
  iconEnd?: Icons | undefined;
  fullWidth?: boolean | undefined;
  tabIndex?: -1 | 0 | undefined;
  onClick?: ButtonLinkEventHandlerType | undefined;
  size?: 'sm' | 'md' | 'lg' | undefined;
  text: string;
  href: string;
  rel?: RelType | undefined;
  target?: TargetType | undefined;
}

interface ButtonGroupProps {
  children?: Node | undefined;
}

interface BannerCalloutProps {
  iconAccessibilityLabel: string;
  message: string;
  type: 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  dismissButton?:
    | {
        accessibilityLabel?: string;
        onDismiss: () => void;
      }
    | undefined;
  primaryAction?: ButtonActionData | LinkActionData | undefined;
  secondaryAction?: ButtonActionData | LinkActionData | undefined;
  title?: string | undefined;
}

interface CheckboxProps {
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

interface CollageProps {
  columns: number;
  height: number;
  renderImage: (args: { width: number; height: number; index: number }) => Node;
  width: number;
  cover?: boolean | undefined;
  gutter?: number | undefined;
  layoutKey?: number | undefined;
}

interface ColumnProps {
  span: UnsignedUpTo12;
  smSpan?: UnsignedUpTo12 | undefined;
  mdSpan?: UnsignedUpTo12 | undefined;
  lgSpan?: UnsignedUpTo12 | undefined;
  children?: Node | undefined;
}

interface ComboBoxItemType {
  label: string;
  subtext?: string;
  value: string;
}

interface ComboBoxProps {
  id: string;
  label: string;
  options: ComboBoxItemType[];
  noResultText?: string;
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
  size?: 'sm' | 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  zIndex?: Indexable | undefined;
}

interface ContainerProps {
  children?: Node | undefined;
}

interface DatapointProps {
  title: string;
  value: string;
  badge?: BadgeObject | undefined;
  size?: 'md' | 'lg' | undefined;
  tooltipText?: string | undefined;
  tooltipZIndex?: Indexable | undefined;
  trend?: TrendObject | undefined;
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto' | undefined;
}

interface DropdownProps {
  children: Node;
  id: string;
  onDismiss: () => void;
  anchor?: HTMLElement | null | undefined;
  disableMobileUI?: boolean | undefined;
  headerContent?: Node | undefined;
  idealDirection?: FourDirections | undefined;
  isWithinFixedContainer?: boolean | undefined;
  maxHeight?: '30vh' | undefined;
  mobileOnAnimationEnd?: OnAnimationEndType | undefined;
  zIndex?: Indexable | undefined;
}

interface DropdownOption {
  label: string;
  value: string;
  subtext?: string | undefined;
}

interface DropdownItemProps {
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

interface DropdownLinkProps {
  href: string;
  option: DropdownOption;
  badge?: BadgeObject | undefined;
  children?: Node;
  dataTestId?: string | undefined;
  isExternal?: boolean | undefined;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation: () => void; mobileOnDismissStart: () => void }
      >
    | undefined;
}

interface DropdownSectionProps {
  children: Node;
  label: string;
}

interface FieldsetProps {
  children: Node;
  legend: string;
  id?: string;
  errorMessage?: string;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

interface FlexProps {
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

interface FlexItemProps {
  alignSelf?: 'auto' | AlignItemsType | undefined;
  children?: Node | undefined;
  dataTestId?: string | undefined;
  flex?: FlexType | undefined;
  flexBasis?: string | number | undefined;
  maxWidth?: number | string | undefined;
  minWidth?: number | string | undefined;
}

interface HeadingProps {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 'none' | undefined;
  align?: TextAlignType | undefined;
  children?: Node | undefined;
  color?: BaseTextColorType | undefined;
  id?: string | undefined;
  lineClamp?: number | undefined;
  overflow?: 'normal' | 'breakAll' | 'breakWord' | undefined;
  size?: TextSizeType | undefined;
}

interface HelpButtonProps {
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

interface IconProps {
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

interface IconButtonProps {
  accessibilityLabel: string;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  accessibilityPopupRole?: 'menu' | 'dialog' | undefined;
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red'
    | undefined;
  dangerouslySetSvgPath?: { __path: string } | undefined;
  dataTestId?: string | undefined;
  disabled?: boolean | undefined;
  icon?: Icons | undefined;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | undefined;
  name?: string;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
      >
    | undefined;
  padding?: 1 | 2 | 3 | 4 | 5 | undefined;
  selected?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  tabIndex?: -1 | 0 | undefined;
  type?: 'button' | 'submit' | undefined;
  tooltip?:
    | Pick<TooltipProps, 'accessibilityLabel' | 'inline' | 'idealDirection' | 'text' | 'zIndex'>
    | undefined;
}

interface IconButtonLinkProps {
  accessibilityLabel: string;
  bgColor?:
    | 'transparent'
    | 'transparentDarkGray'
    | 'gray'
    | 'lightGray'
    | 'white'
    | 'red'
    | undefined;
  dangerouslySetSvgPath?: { __path: string } | undefined;
  dataTestId?: string | undefined;
  disabled?: boolean | undefined;
  href: string;
  icon?: Icons | undefined;
  iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | undefined;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation: (() => void) | undefined }
      >
    | undefined;
  padding?: 1 | 2 | 3 | 4 | 5 | undefined;
  rel?: RelType | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  tabIndex?: -1 | 0 | undefined;
  target?: TargetType | undefined;
  tooltip?:
    | Pick<TooltipProps, 'accessibilityLabel' | 'inline' | 'idealDirection' | 'text' | 'zIndex'>
    | undefined;
}

interface IconButtonFloatingProps {
  accessibilityPopupRole: 'menu' | 'dialog';
  accessibilityLabel: string;
  icon: Icons;
  onClick: AbstractEventHandler<
    React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  >;
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

interface ImageProps {
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

interface LabelProps {
  htmlFor: string;
  children?: Node | undefined;
}

interface LayerProps {
  children: Node;
  zIndex?: Indexable | undefined;
}

interface LetterboxProps {
  contentAspectRatio: number;
  height: number;
  width: number;
  children?: Node | undefined;
}

interface LinkProps {
  href: string;
  accessibilityLabel?: string | undefined;
  dataTestId?: string | undefined;
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

interface ListProps {
  children: Node;
  label?: string | React.ReactElement<typeof Text>;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  spacing?: 'regular' | 'condensed' | undefined;
  type?: 'bare' | 'ordered' | 'unordered' | undefined;
}

interface ListItemProps {
  text: string | React.ReactElement<typeof Text>;
  children?:
    | string
    | React.ReactElement<typeof List>
    | React.ReactElement<typeof List.Item>
    | undefined;
}

interface MaskProps {
  children?: Node | undefined;
  height?: number | string | undefined;
  rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined;
  wash?: boolean | undefined;
  width?: number | string | undefined;
  willChangeTransform?: boolean | undefined;
}

interface MeasurementStore<K, V> {
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
  reset(): void;
}

interface MasonryProps<T = any> {
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

interface ModalProps {
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

interface ModalAlertButtonActionDataType {
  accessibilityLabel: string;
  dataTestId?: string | undefined;
  disabled?: boolean | undefined;
  href: string | undefined;
  label: string;
  onClick?: ButtonEventHandlerType | undefined;
  rel?: RelType | undefined;
  role: 'link';
  target?: TargetType | undefined;
}

interface ModalAlertLinkActionDataType {
  accessibilityLabel: string;
  dataTestId?: string | undefined;
  disabled?: boolean | undefined;
  label: string;
  onClick?: ButtonLinkEventHandlerType | undefined;
  role?: 'button';
}

interface ModalAlertProps {
  accessibilityModalLabel: string;
  children: Node;
  heading: string;
  onDismiss: () => void;
  primaryAction: ModalAlertButtonActionDataType | ModalAlertLinkActionDataType;
  accessibilityDismissButtonLabel?: string | undefined;
  secondaryAction?: ModalAlertButtonActionDataType | ModalAlertLinkActionDataType | undefined;
  type?: 'default' | 'warning' | 'error' | undefined;
}

interface AccordionProps {
  id: string;
  badge?: BadgeObject | undefined;
  children?: Node | undefined;
  icon?: Icons | undefined;
  iconAccessibilityLabel?: string | undefined;
  iconButton?: React.ReactElement<typeof IconButton> | undefined;
  size: 'sm' | 'md' | 'lg';
  title?: string | undefined;
  type?: 'error' | 'info' | undefined;
}

interface AccordionExpandableProps {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  id: string;
  items: ReadonlyArray<{
    title: string;
    badge?: BadgeObject | undefined;
    children?: Node | undefined;
    icon?: Icons | undefined;
    iconAccessibilityLabel?: string | undefined;
    iconButton?: React.ReactElement<typeof IconButton | typeof IconButtonLink> | undefined;
    summary?: ReadonlyArray<string> | undefined;
    type?: 'info' | 'error' | undefined;
  }>;
  expandedIndex?: number | null | undefined;
  onExpandedChange?: ((expandedIndex: number | null) => void) | undefined;
}

interface NumberFieldProps {
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
  labelDisplay?: 'visible' | 'hidden' | undefined;
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
  size?: 'sm' | 'md' | 'lg' | undefined;
  step?: number | undefined;
  value?: number | undefined;
}

type NodeOrRenderProp = ((prop: { onDismissStart: () => void }) => Node) | Node;

interface OverlayPanelProps {
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
  onAnimationEnd?: OnAnimationEndType | undefined;
  size?: 'sm' | 'md' | 'lg' | undefined;
  subHeading?: NodeOrRenderProp | undefined;
}

interface OverlayPanelDismissingElementProps {
  children: DismissingElementChildrenType;
}

interface PageHeaderAction {
  component:
    | React.ReactElement<
        | typeof Button
        | typeof ButtonLink
        | typeof IconButton
        | typeof Link
        | typeof Tooltip
        | typeof Text
      >
    | undefined;
  dropdownItems:
    | ReadonlyArray<
        React.ReactElement<typeof Dropdown.Item | typeof Dropdown.Link, typeof Dropdown>
      >
    | undefined;
}

interface PageHeaderProps {
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
        onClick: AbstractEventHandler<
          React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
        >;
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

interface PogProps {
  accessibilityLabel?: string | undefined;
  active?: boolean | undefined;
  bgColor?:
    | 'transparent'
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

interface PopoverProps {
  anchor: HTMLElement | null | undefined;
  onDismiss: () => void;
  accessibilityDismissButtonLabel?: string | undefined;
  accessibilityLabel?: string | undefined;
  children?: Node | undefined;
  color?: 'deprecatedBlue' | 'red' | 'white' | 'darkGray' | undefined;
  id?: string | undefined;
  idealDirection?: PopoverDirections | undefined;
  onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLElement>>;
  positionRelativeToAnchor?: boolean | undefined;
  role?: 'dialog' | 'listbox' | 'menu' | 'tooltip' | undefined;
  shouldFocus?: boolean | undefined;
  _deprecatedShowCaret?: boolean | undefined;
  showDismissButton?: boolean | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number | undefined;
  __dangerouslySetMaxHeight?: '30vh' | undefined;
}

interface PopoverEducationalProps {
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
        onClick?: ButtonEventHandlerType | undefined;
        role?: 'button';
        text: string | undefined;
      }
    | {
        accessibilityLabel?: string | undefined;
        href: string | undefined;
        onClick?: ButtonLinkEventHandlerType | undefined;
        rel?: RelType | undefined;
        role: 'link';
        target?: TargetType | undefined;
        text: string | undefined;
      }
    | undefined;
  role?: 'dialog' | 'tooltip' | undefined;
  shouldFocus?: boolean | undefined;
  size?: 'sm' | 'flexible' | undefined;
  zIndex?: Indexable | undefined;
}

interface PulsarProps {
  paused?: boolean | undefined;
  size?: number | undefined;
}

interface RadioButtonProps {
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

interface RadioGroupProps {
  id: string;
  children: Node;
  legend: string;
  direction?: 'column' | 'row' | undefined;
  errorMessage?: string | undefined;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

interface RadioGroupRadioButtonProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>;
  value: string;
  badge?: BadgeObject | undefined;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  helperText?: string | undefined;
  image?: Node | undefined;
  label?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | undefined;
}

interface SearchFieldProps {
  accessibilityLabel: string;
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>, { value: string }>;
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

interface SegmentedControlProps {
  items: Node[];
  onChange: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>, { activeIndex: number }>;
  selectedItemIndex: number;
  responsive?: boolean | undefined;
  size: 'sm' | 'md' | 'lg';
}

interface SelectListProps {
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

interface SelectListOptionProps {
  label: string;
  value: string;
  disabled?: boolean | undefined;
}

interface SelectListGroupProps {
  children: Node;
  label: string;
  disabled?: boolean | undefined;
}

type PrimaryActionType = {
  icon?: 'ellipsis' | 'edit' | 'trash-can';
  onClick?: BareButtonEventHandlerType | undefined;
  tooltip: {
    accessibilityLabel?: string | undefined;
    text: string;
    zIndex?: Indexable | undefined;
  };
  dropdownItems?: Array<React.ReactElement<typeof Dropdown['Item']>>;
};

interface SheetMobileProps {
  heading: string;
  onDismiss: () => void;
  accessibilityLabel?: string | undefined;
  align?: 'start' | 'center' | undefined;
  backIconButton?: {
    accessibilityLabel: string;
    onClick: AbstractEventHandler<
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>,
      { onDismissStart: () => void }
    >;
  };
  children?: Node | undefined;
  closeOnOutsideClick?: boolean | undefined;
  footer?: Node | undefined;
  forwardIconButton?: {
    accessibilityLabel: string;
    onClick: AbstractEventHandler<
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>,
      { onDismissStart: () => void }
    >;
  };
  onOutsideClick?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
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
  zIndex?: Indexable | undefined;
}

interface SheetMobileDismissingElementProps {
  children: DismissingElementChildrenType;
}

interface SideNavigationProps {
  accessibilityLabel: string;
  children: Node;
  dismissButton?: { accessibilityLabel?: string; onDismiss: () => void } | undefined;
  footer?: Node | undefined;
  header?: Node | undefined;
  showBorder?: boolean | undefined;
  mobileTitle?: string | undefined;
}

interface SideNavigationSectionProps {
  children: Node;
  label: string;
}

interface SideNavigationTopItemProps {
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
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation?: (() => void) | undefined }
      >
    | undefined;
  primaryAction?: PrimaryActionType | undefined;
  ref?: HTMLLIElement;
}

interface SideNavigationNestedItemProps {
  href: string;
  label: string;
  active?: 'page' | 'section' | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  onClick?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
      >
    | undefined;
  ref?: HTMLLIElement;
}

interface SideNavigationGroupProps {
  children: Node;
  label: string;
  badge?: BadgeProps | undefined;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  display?: 'expandable' | 'static' | undefined;
  expanded?: boolean;
  icon?: Icons | undefined;
  notificationAccessibilityLabel?: string | undefined;
  onExpand: (args: { expanded: boolean }) => void;
  primaryAction?: PrimaryActionType | undefined;
}

interface SideNavigationNestedGroupProps {
  children: Node;
  label: string;
  counter?: { number: string; accessibilityLabel: string } | undefined;
  display?: 'expandable' | 'static' | undefined;
  expanded?: boolean;
  onExpand: (args: { expanded: boolean }) => void;
}

interface BannerSlimProps {
  message: React.ReactElement<typeof Text> | string;
  dismissButton?:
    | {
        accessibilityLabel?: string;
        onDismiss: () => void;
      }
    | undefined;
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
        disabled?: boolean | undefined;
        href: string | undefined;
        label: string;
        onClick?:
          | AbstractEventHandler<
              React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>
            >
          | undefined;
        rel?: RelType | undefined;
        role: 'link';
        target?: TargetType | undefined;
      }
    | {
        accessibilityLabel: string;
        disabled?: boolean | undefined;
        label: string;
        onClick:
          | AbstractEventHandler<
              React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
            >
          | undefined;
        role?: 'button';
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

interface SpinnerProps {
  accessibilityLabel?: string;
  show: boolean;
  color?: 'default' | 'subtle' | undefined;
  delay?: boolean | undefined;
  size?: 'sm' | 'md' | undefined;
}

interface StatusProps {
  type:
    | 'unstarted'
    | 'queued'
    | 'inProgress'
    | 'halted'
    | 'ok'
    | 'problem'
    | 'canceled'
    | 'warning';
  accessibilityLabel?: string | undefined;
  subtext?: string | undefined;
  title?: string | undefined;
}

interface StickyProps {
  children: Node;
  bottom?: number | string | undefined;
  height?: number | undefined;
  left?: number | string | undefined;
  right?: number | string | undefined;
  top?: number | string | undefined;
  zIndex?: Indexable | undefined;
}

interface SwitchProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: boolean }>;
  disabled?: boolean | undefined;
  name?: string | undefined;
  switched?: boolean | undefined;
}

interface TableProps {
  accessibilityLabel: string;
  children: Node;
  borderStyle?: 'sm' | 'none' | undefined;
  maxHeight?: number | string | undefined;
  stickyColumns?: number | undefined;
}

interface TableHeaderProps {
  children: Node;
  display?: 'tableHeaderGroup' | 'visuallyHidden' | undefined;
  sticky?: boolean | undefined;
}

interface TableBodyProps {
  children: Node;
}

interface TableFooterProps {
  children: Node;
  sticky?: boolean | undefined;
}

interface TableCellProps {
  children: Node;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

interface TableHeaderCellProps {
  children: Node;
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup' | undefined;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

interface TableSortableHeaderCellProps {
  align?: 'start' | 'end';
  children: Node;
  onSortChange: TapAreaEventHandlerType;
  sortOrder: 'asc' | 'desc';
  status: 'active' | 'inactive';
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup' | undefined;
  colSpan?: number | undefined;
  rowSpan?: number | undefined;
}

interface TableRowProps {
  children: Node;
  hoverStyle?: 'gray' | 'none' | undefined;
  selected?: 'selected' | 'unselected' | undefined;
}

interface TableRowExpandableProps {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  children: Node;
  expandedContents: Node;
  id: string;
  expanded?: boolean;
  hoverStyle?: 'gray' | 'none';
  onExpand?: AbstractEventHandler<
    React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    { expanded: boolean }
  >;
  selected?: 'selected' | 'unselected';
}

interface TableRowDrawerProps {
  children: Node;
  drawerContents: Node;
  hoverStyle?: 'gray' | 'none' | undefined;
  id: string;
  selected?: 'selected' | 'unselected' | undefined;
}

interface TabsProps {
  activeTabIndex: number;
  onChange: AbstractEventHandler<
    React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    { activeTabIndex: number; dangerouslyDisableOnNavigation?: (() => void) | undefined }
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

interface TagProps {
  onRemove: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>>;
  text: string;
  accessibilityRemoveIconLabel?: string | undefined;
  disabled?: boolean | undefined;
  size?: 'sm' | 'md' | 'lg';
  type?: 'default' | 'error' | 'warning' | undefined;
}

interface TagDataProps {
  accessibilityRemoveIconLabel?: string | undefined;
  baseColor?: 'primary' | 'secondary';
  color?: DataVisualizationColors;
  disabled?: boolean;
  id?: string;
  onTap?:
    | AbstractEventHandler<
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>,
        { selected: boolean; id?: string | undefined }
      >
    | undefined;
  onRemove: AbstractEventHandler<React.MouseEvent<HTMLButtonElement>>;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showCheckbox?: boolean;
  text: string;
  tooltip?: ExtendedTooltipProps;
}

interface TapAreaProps {
  accessibilityLabel?: string | undefined;
  accessibilityChecked?: boolean | undefined;
  accessibilityControls?: string | undefined;
  accessibilityExpanded?: boolean | undefined;
  accessibilityHaspopup?: boolean | undefined;
  children?: Node;
  dataTestId?: string;
  disabled?: boolean | undefined;
  fullHeight?: boolean | undefined;
  fullWidth?: boolean | undefined;
  mouseCursor?:
    | 'default'
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
  role?: 'button' | 'switch' | undefined;
}
interface TapAreaLinkProps {
  accessibilityCurrent?:
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
    | 'true'
    | 'false'
    | 'section';
  accessibilityLabel?: string | undefined;
  children: Node;
  dataTestId?: string;
  disabled?: boolean | undefined;
  fullHeight?: boolean | undefined;
  fullWidth?: boolean | undefined;
  href: string;
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
  onBlur?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  onFocus?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>> | undefined;
  onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLAnchorElement>> | undefined;
  onMouseDown?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>> | undefined;
  onMouseUp?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>> | undefined;
  onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>> | undefined;
  onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>> | undefined;
  onTap?:
    | AbstractEventHandler<
        React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
        { dangerouslyDisableOnNavigation: (() => void) | undefined }
      >
    | undefined;
  rel?: RelType | undefined;
  rounding?: RoundingType | undefined;
  tabIndex?: -1 | 0 | undefined;
  tapStyle?: 'none' | 'compress' | undefined;
  target?: TargetType | undefined;
}

interface TextProps {
  align?: TextAlignType | undefined;
  children?: Node | undefined;
  color?: BaseTextColorType | 'link' | undefined;
  inline?: boolean | undefined;
  italic?: boolean | undefined;
  lineClamp?: number | undefined;
  overflow?: 'normal' | 'breakWord' | 'breakAll' | 'noWrap' | undefined;
  size?: TextSizeType | undefined;
  underline?: boolean | undefined;
  weight?: 'bold' | 'normal' | undefined;
  title?: string | undefined;
}

interface TextAreaProps {
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

interface TextFieldProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>;
  autoComplete?:
    | 'on'
    | 'off'
    | 'address-line1'
    | 'address-line2'
    | 'address-line3'
    | 'address-level1'
    | 'address-level2'
    | 'address-level3'
    | 'address-level4'
    | 'street-address'
    | 'country'
    | 'country-name'
    | 'postal-code'
    | 'name'
    | 'additional-name'
    | 'family-name'
    | 'given-name'
    | 'honoric-prefix'
    | 'honoric-suffix'
    | 'nickname'
    | 'organization-title'
    | 'username'
    | 'new-password'
    | 'current-password'
    | 'bday'
    | 'bday-day'
    | 'bday-month'
    | 'bday-year'
    | 'billing'
    | 'sex'
    | 'one-time-code'
    | 'organization'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-additional-name'
    | 'cc-family-name'
    | 'cc-number'
    | 'cc-exp'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-csc'
    | 'cc-type'
    | 'transaction-currency'
    | 'transaction-amount'
    | 'language'
    | 'url'
    | 'email'
    | 'photo'
    | 'shipping'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-area-code'
    | 'tel-local'
    | 'tel-local-prefix'
    | 'tel-local-suffix'
    | 'tel-extension'
    | 'impp'
    | 'webauthn'
    | undefined;
  dataTestId?: string | undefined;
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
  size?: 'sm' | 'md' | 'lg' | undefined;
  tags?: ReadonlyArray<React.ReactElement<TagProps, typeof Tag>> | undefined;
  type?: 'date' | 'email' | 'password' | 'text' | 'url' | 'tel' | undefined;
  value?: string | undefined;
}

interface TileDataProps {
  color?: DataVisualizationColors | undefined;
  disabled?: boolean | undefined;
  id?: string | undefined;
  onTap?:
    | AbstractEventHandler<
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>,
        { selected: boolean; id?: string | undefined }
      >
    | undefined;
  selected?: boolean | undefined;
  showCheckbox?: boolean | undefined;
  title: string;
  tooltip?: ExtendedTooltipProps | undefined;
  trend?: TrendObject | undefined;
  trendSentiment?: 'good' | 'bad' | 'neutral' | 'auto' | undefined;
  value: string;
}

interface ToastProps {
  text: string | React.ReactElement<typeof Text>;
  dismissButton:
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
  primaryAction?:
    | {
        accessibilityLabel: string;
        label: string;
        href: string | undefined;
        onClick?: ButtonEventHandlerType | undefined;
        rel?: RelType | undefined;
        role: 'link';
        size?: 'sm' | 'md' | 'lg' | undefined;
        target?: TargetType | undefined;
      }
    | {
        accessibilityLabel: string;
        label: string;
        onClick: ButtonEventHandlerType | undefined;
        role?: 'button';
        size?: 'sm' | 'md' | 'lg' | undefined;
      };
  thumbnail?:
    | { image: React.ReactElement<typeof Image> }
    | { avatar: React.ReactElement<typeof Avatar> }
    | { icon: React.ReactElement<typeof Icon> }
    | undefined;
  type?: 'default' | 'success' | 'error' | 'progress' | undefined;
}

interface TooltipProps {
  children: Node;
  text: string;
  accessibilityLabel?: string | undefined;
  idealDirection?: FourDirections | undefined;
  inline?: boolean | undefined;
  link?: Node | undefined;
  zIndex?: Indexable | undefined;
}

type TooltipTemp = Omit<TooltipProps, 'text'>;

interface ExtendedTooltipProps extends TooltipTemp {
  text: string | string[];
}

interface UpsellProps {
  message: string | React.ReactElement<typeof Text>;
  children?: React.ReactElement<typeof BannerUpsell.Form>;
  dismissButton?:
    | {
        accessibilityLabel?: string;
        onDismiss: () => void;
      }
    | undefined;
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
  primaryAction?: ButtonActionData | LinkActionData | undefined;
  secondaryAction?: ButtonActionData | LinkActionData | undefined;
  title?: string | undefined;
}

interface UpsellFormProps {
  children: Node;
  onSubmit: BareButtonEventHandlerType;
  submitButtonText: string;
  submitButtonAccessibilityLabel: string;
  submitButtonDisabled?: boolean | undefined;
}

interface VideoProps {
  aspectRatio: number;
  onPlay: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
  onPlayError: (args: { error: Error }) => void;
  src: string | ReadonlyArray<{ type: 'video/m3u8' | 'video/mp4' | 'video/ogg'; src: string }>;
  autoplay?: boolean | undefined;
  backgroundColor?: 'black' | 'transparent' | undefined;
  captions?: string | undefined;
  children?: Node | undefined;
  controls?: boolean | undefined;
  crossOrigin?: 'anonymous' | 'use-credentials' | undefined;
  disableRemotePlayback?: boolean | undefined;
  loop?: boolean | undefined;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' | undefined;
  onControlsPause?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
  onControlsPlay?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
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

interface WashAnimatedProps {
  active?: boolean | undefined;
  children?: Node | undefined;
  image?: Node | undefined;
  onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
  onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
}

/**
 * =========================================================
 * ========================= INDEX =========================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/activationcard
 */
export const ActivationCard: React.FunctionComponent<ActivationCardProps>;

/**
 * https://gestalt.pinterest.systems/web/avatar
 */
export const Avatar: React.FunctionComponent<AvatarProps>;

/**
 * https://gestalt.pinterest.systems/web/avatargroup
 */
export const AvatarGroup: React.FunctionComponent<AvatarGroupProps>;

/**
 * https://gestalt.pinterest.systems/web/badge
 */
export const Badge: React.FunctionComponent<BadgeProps>;

/**
 * https://gestalt.pinterest.systems/web/banneroverlay
 */
export const BannerOverlay: React.FunctionComponent<BannerOverlayProps>;

/**
 * https://gestalt.pinterest.systems/web/box
 */
export const Box: ReactForwardRef<HTMLDivElement, BoxProps>;

/**
 * https://gestalt.pinterest.systems/web/button
 */
export const Button: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>;

/**
 * https://gestalt.pinterest.systems/web/buttonlink
 */
export const ButtonLink: ReactForwardRef<HTMLAnchorElement, ButtonLinkProps>;

/**
 * https://gestalt.pinterest.systems/web/buttongroup
 */
export const ButtonGroup: React.FunctionComponent<ButtonGroupProps>;

/**
 * https://gestalt.pinterest.systems/web/bannercallout
 */
export const BannerCallout: React.FunctionComponent<BannerCalloutProps>;

/**
 * https://gestalt.pinterest.systems/web/checkbox
 */
export const Checkbox: ReactForwardRef<HTMLInputElement, CheckboxProps>;

/**
 * https://gestalt.pinterest.systems/web/collage
 */
export const Collage: React.FunctionComponent<CollageProps>;

/**
 * https://gestalt.pinterest.systems/web/utilities/colorschemeprovider
 */
export const ColorSchemeProvider: React.FunctionComponent<
  React.PropsWithChildren<ColorSchemeProviderProps>
>;

/**
 * https://gestalt.pinterest.systems/web/column
 */
export const Column: React.FunctionComponent<ColumnProps>;

/**
 * https://gestalt.pinterest.systems/web/combobox
 */
export const ComboBox: React.FunctionComponent<ComboBoxProps>;

/**
 * https://gestalt.pinterest.systems/web/container
 */
export const Container: React.FunctionComponent<ContainerProps>;

/**
 * https://gestalt.pinterest.systems/web/datapoint
 */
export const Datapoint: React.FunctionComponent<DatapointProps>;

/**
 * https://gestalt.pinterest.systems/web/utilities/devicetypeprovider
 */
export const DeviceTypeProvider: React.FunctionComponent<
  React.PropsWithChildren<DeviceTypeProviderProps>
>;

/**
 * https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider
 */
export const DefaultLabelProvider: React.FunctionComponent<
  React.PropsWithChildren<DefaultLabelProviderProps>
>;

/**
 * https://gestalt.pinterest.systems/web/divider
 */
export const Divider: React.FunctionComponent;

export interface DropdownSubComponents {
  Item: React.FunctionComponent<DropdownItemProps>;
  Link: React.FunctionComponent<DropdownLinkProps>;
  Section: React.FunctionComponent<DropdownSectionProps>;
}

/**
 * https://gestalt.pinterest.systems/web/dropdown
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Link
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Section
 * https://gestalt.pinterest.systems/web/dropdown#Dropdown.Item
 */
export const Dropdown: React.FunctionComponent<DropdownProps> & DropdownSubComponents;

/**
 * https://gestalt.pinterest.systems/web/fieldset
 */
export const Fieldset: React.FunctionComponent<FieldsetProps>;

export interface FlexSubComponents {
  Item: React.FunctionComponent<FlexItemProps>;
}

/**
 * https://gestalt.pinterest.systems/web/flex
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/flex#Flex.Item
 */
export const Flex: React.FunctionComponent<FlexProps> & FlexSubComponents;

/**
 * https://gestalt.pinterest.systems/web/heading
 */
export const Heading: React.FunctionComponent<HeadingProps>;

/**
 * https://gestalt.pinterest.systems/web/helpbutton
 */
export const HelpButton: React.FunctionComponent<HelpButtonProps>;

/**
 * https://gestalt.pinterest.systems/web/icon
 */
export const Icon: React.FunctionComponent<IconProps>;

/**
 * https://gestalt.pinterest.systems/web/iconbutton
 */
export const IconButton: ReactForwardRef<HTMLButtonElement, IconButtonProps>;

/**
 * https://gestalt.pinterest.systems/web/iconbuttonlink
 */
export const IconButtonLink: ReactForwardRef<HTMLAnchorElement, IconButtonLinkProps>;

/**
 * https://gestalt.pinterest.systems/web/iconbuttonfloating
 */
export const IconButtonFloating: React.FunctionComponent<IconButtonFloatingProps>;

/**
 * https://gestalt.pinterest.systems/web/image
 */
export const Image: React.FunctionComponent<ImageProps>;

/**
 * https://gestalt.pinterest.systems/web/label
 */
export const Label: React.FunctionComponent<LabelProps>;

/**
 * https://gestalt.pinterest.systems/web/layer
 */
export const Layer: React.FunctionComponent<LayerProps>;

/**
 * https://gestalt.pinterest.systems/web/letterbox
 */
export const Letterbox: React.FunctionComponent<LetterboxProps>;

/**
 * https://gestalt.pinterest.systems/web/link
 */
export const Link: ReactForwardRef<HTMLAnchorElement, LinkProps>;

export interface ListSubComponents {
  Item: React.FunctionComponent<React.PropsWithChildren<ListItemProps>>;
}

/**
 * https://gestalt.pinterest.systems/web/list
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/list#List.Itemt
 */
export const List: React.FunctionComponent<React.PropsWithChildren<ListProps>> & ListSubComponents;

/**
 * https://gestalt.pinterest.systems/web/mask
 */
export const Mask: React.FunctionComponent<MaskProps>;

/**
 * https://gestalt.pinterest.systems/web/masonry
 */
export const Masonry: React.FunctionComponent<MasonryProps>;

/**
 * https://gestalt.pinterest.systems/web/modal
 */
export const Modal: ReactForwardRef<HTMLDivElement, ModalProps>;

/**
 * https://gestalt.pinterest.systems/web/modalalert
 */
export const ModalAlert: React.FunctionComponent<React.PropsWithChildren<ModalAlertProps>>;

export interface AccordionSubComponents {
  Expandable: React.FunctionComponent<AccordionExpandableProps>;
}

/**
 * https://gestalt.pinterest.systems/web/accordion
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/accordion#Accordion.Expandable
 */
export const Accordion: React.FunctionComponent<React.PropsWithChildren<AccordionProps>> &
  AccordionSubComponents;

/**
 * https://gestalt.pinterest.systems/web/numberfield
 */
export const NumberField: ReactForwardRef<HTMLInputElement, NumberFieldProps>;

/**
 * https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider
 */
export const GlobalEventsHandlerProvider: React.FunctionComponent<GlobalEventsHandlerProviderProps>;

export interface OverlayPanelSubComponents {
  DismissingElement: React.FunctionComponent<OverlayPanelDismissingElementProps>;
}

/**
 * https://gestalt.pinterest.systems/web/overlaypanel
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/overlaypanel#DismissingElement
 */
export const OverlayPanel: ReactForwardRef<HTMLDivElement, OverlayPanelProps> &
  OverlayPanelSubComponents;

/**
 * https://gestalt.pinterest.systems/web/pageheader
 */
export const PageHeader: React.FunctionComponent<PageHeaderProps>;

/**
 * https://gestalt.pinterest.systems/web/pog
 */
export const Pog: React.FunctionComponent<PogProps>;

/**
 * https://gestalt.pinterest.systems/web/popover
 */
export const Popover: React.FunctionComponent<PopoverProps>;

/**
 * https://gestalt.pinterest.systems/web/popovereducational
 */
export const PopoverEducational: React.FunctionComponent<PopoverEducationalProps>;

/**
 * https://gestalt.pinterest.systems/web/pulsar
 */
export const Pulsar: React.FunctionComponent<PulsarProps>;

/**
 * https://gestalt.pinterest.systems/web/radiobutton
 */
export const RadioButton: ReactForwardRef<HTMLInputElement, RadioButtonProps>;

export interface RadioGroupSubComponents {
  RadioButton: React.FunctionComponent<RadioGroupRadioButtonProps>;
}

/**
 * https://gestalt.pinterest.systems/web/radiogroup
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/radiogroup#RadioGroup.RadioButtonProps
 */
export const RadioGroup: React.FunctionComponent<RadioGroupProps> & RadioGroupSubComponents;

/**
 * https://gestalt.pinterest.systems/web/scrollboundarycontainer
 */
export const ScrollBoundaryContainer: React.FunctionComponent<ScrollBoundaryContainerProps>;

/**
 * https://gestalt.pinterest.systems/web/searchfield
 */
export const SearchField: ReactForwardRef<HTMLInputElement, SearchFieldProps>;

/**
 * https://gestalt.pinterest.systems/web/segmentedcontrol
 */
export const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;

export interface SelectListSubComponents {
  Option: React.FunctionComponent<SelectListOptionProps>;
  Group: React.FunctionComponent<SelectListGroupProps>;
}

/**
 * https://gestalt.pinterest.systems/web/selectlist
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/selectlist#SelectList.Group
 * https://gestalt.pinterest.systems/web/selectlist#SelectList.Option
 */
export const SelectList: React.FunctionComponent<SelectListProps> & SelectListSubComponents;

export interface SheetMobileSubComponents {
  DismissingElement: React.FunctionComponent<SheetMobileDismissingElementProps>;
}

/**
 * https://gestalt.pinterest.systems/web/sheetmobile
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/sheetmobile#DismissingElement
 */
export const SheetMobile: ReactForwardRef<HTMLDivElement, SheetMobileProps> &
  SheetMobileSubComponents;

export interface SideNavigationSubcomponents {
  Section: React.FunctionComponent<SideNavigationSectionProps>;
  TopItem: React.FunctionComponent<SideNavigationTopItemProps>;
  NestedItem: React.FunctionComponent<SideNavigationNestedItemProps>;
  Group: React.FunctionComponent<SideNavigationGroupProps>;
  NestedGroup: React.FunctionComponent<SideNavigationNestedGroupProps>;
}

/**
 * https://gestalt.pinterest.systems/web/sidenavigation
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section
 * https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup
 */
export const SideNavigation: React.FunctionComponent<SideNavigationProps> &
  SideNavigationSubcomponents;

/**
 * https://gestalt.pinterest.systems/web/bannerslim
 */
export const BannerSlim: React.FunctionComponent<BannerSlimProps>;

/**
 * https://gestalt.pinterest.systems/web/spinner
 */
export const Spinner: React.FunctionComponent<SpinnerProps>;

/**
 * https://gestalt.pinterest.systems/web/status
 */
export const Status: React.FunctionComponent<StatusProps>;

/**
 * https://gestalt.pinterest.systems/web/sticky
 */
export const Sticky: React.FunctionComponent<StickyProps>;

/**
 * https://gestalt.pinterest.systems/web/switch
 */
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

/**
 * https://gestalt.pinterest.systems/web/table
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/table#Table.RowDrawer
 * https://gestalt.pinterest.systems/web/table#Table.RowExpandable
 * https://gestalt.pinterest.systems/web/table#Table.Row
 * https://gestalt.pinterest.systems/web/table#Table.SortableHeaderCell
 * https://gestalt.pinterest.systems/web/table#Table.HeaderCell
 * https://gestalt.pinterest.systems/web/table#Table.Cell
 * https://gestalt.pinterest.systems/web/table#Table.Footer
 * https://gestalt.pinterest.systems/web/table#Table.Body
 * https://gestalt.pinterest.systems/web/table#Table.Header
 */
export const Table: React.FunctionComponent<TableProps> & TableSubComponents;

interface TableOfContentsItemProps {
  label: string;
  href: string;
  active?: boolean;
  onClick?: TapAreaEventHandlerType;
  children?: Node;
}

/**
 * https://gestalt.pinterest.systems/web/tableofcontents
 */
export interface TableOfContentsProps {
  accessibilityLabel?: string;
  title?: string;
  children: Node;
}

export interface TableOfContentsSubComponents {
  Item: React.FunctionComponent<React.PropsWithChildren<TableOfContentsItemProps>>;
}

export const TableOfContents: React.FunctionComponent<TableOfContentsProps> &
  TableOfContentsSubComponents;

/**
 * https://gestalt.pinterest.systems/web/tabs
 */
export const Tabs: React.FunctionComponent<TabsProps>;

/**
 * https://gestalt.pinterest.systems/web/tag
 */
export const Tag: React.FunctionComponent<TagProps>;

/**
 * https://gestalt.pinterest.systems/web/tagdata
 */
export const TagData: React.FunctionComponent<TagDataProps>;

/**
 * https://gestalt.pinterest.systems/web/taparea
 */
export const TapArea: ReactForwardRef<HTMLButtonElement, TapAreaProps>;

/**
 * https://gestalt.pinterest.systems/web/taparealink
 */
export const TapAreaLink: ReactForwardRef<HTMLAnchorElement, TapAreaLinkProps>;

/**
 * https://gestalt.pinterest.systems/web/text
 */
export const Text: ReactForwardRef<HTMLDivElement | HTMLSpanElement, TextProps>;

/**
 * https://gestalt.pinterest.systems/web/textarea
 */
export const TextArea: ReactForwardRef<HTMLTextAreaElement, TextAreaProps>;

/**
 * https://gestalt.pinterest.systems/web/textfield
 */
export const TextField: ReactForwardRef<HTMLInputElement, TextFieldProps>;

/**
 * https://gestalt.pinterest.systems/web/tiledata
 */
export const TileData: React.FunctionComponent<TileDataProps>;

/**
 * https://gestalt.pinterest.systems/web/toast
 */
export const Toast: React.FunctionComponent<ToastProps>;

/**
 * https://gestalt.pinterest.systems/web/tooltip
 */
export const Tooltip: React.FunctionComponent<TooltipProps>;

export interface UpsellSubComponents {
  Form: React.FunctionComponent<UpsellFormProps>;
}

/**
 * https://gestalt.pinterest.systems/web/bannerupsell
 * Subcomponents:
 * https://gestalt.pinterest.systems/web/bannerupsell#BannerUpsell.Form
 */
export const BannerUpsell: React.FunctionComponent<UpsellProps> & UpsellSubComponents;

/**
 * https://gestalt.pinterest.systems/web/video
 */
export const Video: React.FunctionComponent<VideoProps>;

/**
 * https://gestalt.pinterest.systems/web/washanimated
 */
export const WashAnimated: React.FunctionComponent<WashAnimatedProps>;

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
 * https://gestalt.pinterest.systems/web/utilities/usereducedmotion
 */
export function useReducedMotion(): boolean;

/**
 * https://gestalt.pinterest.systems/web/utilities/usefocusvisible
 */
export function useFocusVisible(): { isFocusVisible: boolean };

/**
 * Undocumented
 */
interface ScrollFetchProps {
  container?: HTMLElement;
  isAtEnd?: boolean;
  isFetching: boolean;
  fetchMore?: () => void;
  renderHeight?: () => number;
}

export const ScrollFetch: React.FunctionComponent<ScrollFetchProps>;

/**
 * Undocumented
 */
interface ExperimentProviderProps {
  children: Node;
  colorScheme: 'light' | 'dark' | 'userPreference';
  fullDimensions?: boolean;
  id?: string | undefined;
}

export const ExperimentProvider: React.FunctionComponent<
  React.PropsWithChildren<ExperimentProviderProps>
>;

/**
 * Undocumented
 */
export function useGlobalEventsHandler(): {
  dateFieldHandlers?: { onRender?: () => void };
  datePickerHandlers?: { onRender?: () => void };
  dateRangeHandlers?: { onRender?: () => void };
  sheetMobileHandlers?: { onOpen?: () => void; onClose?: () => void };
  linkHandlers?: {
    onNavigation?: (args: {
      href: string;
      target?: null | 'self' | 'blank';
    }) => AbstractEventHandler<React.SyntheticEvent<HTMLElement>>;
  };
  radioGroupHandlers?: { onRender?: () => void };
} | void;

/**
 * Undocumented
 */
export function useDeviceType(): 'desktop' | 'mobile';

/**
 * Undocumented
 */
export function useDefaultLabel(componentName: string): { [k: string]: string };

/**
 * Undocumented
 */
export function useColorScheme(): {
  name: 'lightMode' | 'darkMode';
};
