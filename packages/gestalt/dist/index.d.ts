        rel?: LinkProps['rel'] | undefined;
        size?: ButtonProps['size'] | undefined;
        target?: LinkProps['target'] | undefined;
    };
    text?: string | React.ReactElement<typeof Text> | undefined;
    thumbnail?: React.ReactNode | undefined;
    thumbnailShape?: 'circle' | 'square' | undefined;
    variant?: 'default' | 'error' | undefined;
}

/**
 * Tooltip Props Interface
 * https://gestalt.netlify.app/Tooltip
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
 * Upsell Props Interface
 * https://gestalt.netlify.app/Upsell
 */
export interface UpsellProps {
    children?: React.ReactElement;
    message: string;
    dismissButton?:
        | {
              accessibilityLabel: string;
              onDismiss: () => void;
          }
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
 * Video Props Interface
 * https://gestalt.netlify.app/Video
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
    onLoadedChange?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { loaded: number }> | undefined;
    onPlay?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
    onPlayheadDown?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
    onPlayheadUp?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>> | undefined;
    onPause?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>> | undefined;
    onReady?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
    onSeek?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>> | undefined;
    onTimeChange?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, { time: number }> | undefined;
    onVolumeChange?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement>, { volume: number }> | undefined;
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
 * https://gestalt.netlify.app/ZIndexClasses#zindex
 */
export interface Indexable {
    index(): number;
}

/**
 * https://gestalt.netlify.app/ZIndexClasses#FixedZIndex
 */
export class FixedZIndex implements Indexable {
    z: number;
    constructor(z: number);
    index(): number;
}

/**
 * https://gestalt.netlify.app/ZIndexClasses#CompositeZIndex
 */
export class CompositeZIndex implements Indexable {
    deps: Array<FixedZIndex | CompositeZIndex>;
    constructor(deps: Array<FixedZIndex | CompositeZIndex>);
    index(): number;
}

export const ActivationCard: React.FunctionComponent<ActivationCardProps>;
export const Avatar: React.FunctionComponent<AvatarProps>;
export const AvatarGroup: React.FunctionComponent<AvatarGroupProps>;
export const AvatarPair: React.FunctionComponent<AvatarPairProps>;
export const Badge: React.FunctionComponent<BadgeProps>;
export const Box: ReactForwardRef<HTMLDivElement, BoxProps>;
export const Button: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>;
export const ButtonGroup: React.FunctionComponent<ButtonGroupProps>;
export const Callout: React.FunctionComponent<CalloutProps>;
export const Card: React.FunctionComponent<CardProps>;
export const ComboBox: React.FunctionComponent<ComboBoxProps>;
export const Checkbox: ReactForwardRef<HTMLInputElement, CheckboxProps>;
export const Collage: React.FunctionComponent<CollageProps>;
export const ColorSchemeProvider: React.FunctionComponent<React.PropsWithChildren<ColorSchemeProviderProps>>;
export const Column: React.FunctionComponent<ColumnProps>;
export const Container: React.FunctionComponent<ContainerProps>;
export const Datapoint: React.FunctionComponent<DatapointProps>;
export const ScrollBoundaryContainer: React.FunctionComponent<ScrollBoundaryContainerProps>;
export const DeviceTypeProvider: React.FunctionComponent<React.PropsWithChildren<DeviceTypeProviderProps>>;
export const DefaultLabelProvider: React.FunctionComponent<React.PropsWithChildren<DefaultLabelProviderProps>>;
export const Divider: React.FunctionComponent;

export interface DropdownSubComponents {
    Item: React.FC<DropdownItemProps>;
    Link: React.FC<DropdownLinkProps>;
    Section: React.FC<DropdownSectionProps>;
}
export const Dropdown: React.FunctionComponent<DropdownProps> & DropdownSubComponents;
export const Fieldset: React.FunctionComponent<FieldsetProps>;

export interface FlexSubCompnents {
    Item: React.FC<FlexItemProps>;
}
export const Flex: React.FunctionComponent<FlexProps> & FlexSubCompnents;
export const Heading: React.FunctionComponent<HeaderProps>;
export const Icon: React.FunctionComponent<IconProps>;
export const IconButton: ReactForwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>;
export const Image: React.FunctionComponent<ImageProps>;
export const Label: React.FunctionComponent<LabelProps>;
export const Layer: React.FunctionComponent<LayerProps>;
export const Letterbox: React.FunctionComponent<LetterboxProps>;
export const Link: ReactForwardRef<HTMLAnchorElement, LinkProps>;
export interface ListSubCmoponents {
    Item: React.FunctionComponent<React.PropsWithChildren<ListItemProps>>;
    NestedList: React.FunctionComponent<React.PropsWithChildren<NestedListProps>>;
}
export const List: React.FunctionComponent<React.PropsWithChildren<ListProps>> & ListSubCmoponents;
export const Mask: React.FunctionComponent<MaskProps>;
export const Masonry: React.FunctionComponent<MasonryProps>;
export const Modal: ReactForwardRef<HTMLDivElement, ModalProps>;
export const ModalAlert: React.FunctionComponent<React.PropsWithChildren<ModalAlertProps>>;

export interface ModuleSubComponents {
    Expandable: React.FC<ModuleExpandableProps>;
}
export const Module: React.FunctionComponent<React.PropsWithChildren<ModuleProps>> & ModuleSubComponents;
export const NumberField: ReactForwardRef<HTMLInputElement, NumberFieldProps>;
export const OnLinkNavigationProvider: React.FunctionComponent<OnLinkNavigationProviderProps>;
export const PageHeader: React.FunctionComponent<PageHeaderProps>;
export const Pog: React.FunctionComponent<PogProps>;
export const Popover: React.FunctionComponent<PopoverProps>;
export const Pulsar: React.FunctionComponent<PulsarProps>;
export const RadioButton: ReactForwardRef<HTMLInputElement, RadioButtonProps>;
export interface RadioGroupSubCompnents {
    RadioButton: typeof RadioButton;
}

export const RadioGroup: React.FunctionComponent<RadioGroupProps> & RadioGroupSubCompnents;
export const Row: React.FunctionComponent<RowProps>;
export const SearchField: ReactForwardRef<HTMLInputElement, SearchFieldProps>;
export const SegmentedControl: React.FunctionComponent<SegmentedControlProps>;

export interface SelectListSubComponents {
    Option: React.FC<SelectListOptionProps>;
    Group: React.FC<SelectListGroupProps>;
}
export const SelectList: React.FunctionComponent<SelectListProps> & SelectListSubComponents;

export interface SideNavigationSubcomponents {
    Section: React.FC<SideNavigationSectionProps>;
    TopItem: React.FC<SideNavigationTopItemProps>;
    NestedItem: React.FC<SideNavigationNestedItemProps>;
    Group: React.FC<SideNavigationNestedGroupProps>;
    NestedGroup: React.FC<SideNavigationNestedGroupProps>;
}
export const SideNavigation: React.FunctionComponent<SideNaviationProps> & SideNavigationSubcomponents;

export const Sheet: ReactForwardRef<HTMLDivElement, SheetProps>;
export const SlimBanner: React.FunctionComponent<SlimBannerProps>;
export const Spinner: React.FunctionComponent<SpinnerProps>;
export const Stack: React.FunctionComponent<StackProps>;
export const Status: React.FunctionComponent<StatusProps>;
export const Sticky: React.FunctionComponent<StickyProps>;
export const Switch: React.FunctionComponent<SwitchProps>;
export interface TableSubCompnents {
    Body: React.FC<TableBodyProps>;
    Cell: React.FC<TableCellProps>;
    Footer: React.FC<TableFooterProps>;
    Header: React.FC<TableHeaderProps>;
    HeaderCell: React.FC<TableHeaderCellProps>;
    Row: React.FC<TableRowProps>;
    RowExpandable: React.FC<TableRowExpandableProps>;
    SortableHeaderCell: React.FC<TableSortableHeaderCellProps>;
    RowDrawer: React.FC<TableRowDrawerProps>;
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
    Form: React.FC<UpsellFormProps>;
}
export const Upsell: React.FunctionComponent<UpsellProps> & UpsellSubCompnents;
export const Video: React.FunctionComponent<VideoProps>;
export function useReducedMotion(): boolean;
export function useFocusVisible(): { isFocusVisible: boolean };
