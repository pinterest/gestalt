/// <reference types="react" />
declare module "AbstractEventHandler" {
    /**
     * We use a common event payload across all components. Since it's different from standard events that people are used to from React, it's abstracted here to at least make it standard. If you have to learn something, you should only have to learn it once.
     *
     * Why is it non-standard? Gestalt components are controlled - meaning that the can contain state and when that changes it's reflected back to the parent. These state changes are propagated via. event handlers. Often this state doesn't represent what's in the DOM or we just want to abstract the DOM from the consumer. We felt this format struct a good balance between readability and predictability.
     */
    export type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (arg0: U & {
        readonly event: T;
    }) => void;
}
declare module "style" {
    type InlineStyle = Record<string, string | number | void>;
    export type Style = {
        className: Set<string>;
        inlineStyle: InlineStyle;
    };
    export const identity: () => Style;
    export const fromClassName: (...classNames: ReadonlyArray<string>) => Style;
    export const fromInlineStyle: (inlineStyle: InlineStyle) => Style;
    export const concat: (styles: ReadonlyArray<Style>) => Style;
    export const mapClassName: (fn: (x: string) => string) => (arg0: Style) => Style;
    export type ToPropsOutput = {
        className: string;
        style: InlineStyle;
    };
    export const toProps: ({ className, inlineStyle }: Style) => ToPropsOutput;
}
declare module "transforms" {
    import type { Style } from "style";
    export type Functor<T> = (n: T) => Style;
    export const toggle: (...classNames: ReadonlyArray<string>) => (val?: boolean) => Style;
    export const mapping: (map: Record<string, string>) => (val: string) => Style;
    export const range: (scale: string) => (n: number) => Style;
    export const rangeWithZero: (scale: string) => (n: number) => Style;
    export function bind<T>(fn: Functor<T>, scope: Readonly<Record<string, string>>): (val: T) => Style;
    export const union: <T>(...fns: readonly Functor<T>[]) => (val: T) => Style;
}
declare module "getRoundingClassName" {
    import type { Style } from "style";
    export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";
    export const getRoundingStyle: (rounding: Rounding) => Style;
    const getRoundingClassName: (rounding: Rounding) => string;
    export default getRoundingClassName;
}
declare module "zIndex" {
    export interface Indexable {
        index(): number;
    }
    /**
     * https://gestalt.pinterest.systems/ZIndex%20Classes
     */
    export class FixedZIndex implements Indexable {
        readonly z: number;
        constructor(z: number);
        index(): number;
    }
    /**
     * https://gestalt.pinterest.systems/ZIndex%20Classes
     */
    export class CompositeZIndex implements Indexable {
        readonly deps: ReadonlyArray<FixedZIndex | CompositeZIndex>;
        constructor(deps: ReadonlyArray<FixedZIndex | CompositeZIndex>);
        index(): number;
    }
}
declare module "boxTypes" {
    export type DangerouslySetInlineStyle = {
        __style: Record<string, string | number | void>;
    };
    export type AlignContent = "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";
    export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";
    export type AlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
    export type As = "article" | "aside" | "caption" | "details" | "div" | "figcaption" | "figure" | "footer" | "header" | "main" | "nav" | "section" | "summary";
    export type Bottom = boolean;
    export type BorderStyle = "sm" | "lg" | "shadow" | "none";
    export type Color = "blue" | "darkGray" | "darkWash" | "eggplant" | "gray" | "green" | "lightGray" | "lightWash" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "transparent" | "transparentDarkGray" | "watermelon" | "white";
    export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    export type Dimension = number | string;
    export type Direction = "row" | "column";
    export type Display = "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
    export type Fit = boolean;
    export type Flex = "grow" | "shrink" | "none";
    export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    export type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";
    export type Left = boolean;
    export type Margin = -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
    export type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
    export type Overflow = "visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto";
    export type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    export type Position = "static" | "absolute" | "relative" | "fixed";
    export type Right = boolean;
    export type Role = string;
    export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";
    export type Top = boolean;
    export type UserSelect = "auto" | "none";
    export type Wrap = boolean;
}
declare module "boxTransforms" {
    import type { ToPropsOutput } from "style";
    import type { Functor } from "transforms";
    import type { Indexable } from "zIndex";
    import "zIndex";
    import type { AlignContent, AlignItems, AlignSelf, BorderStyle, Column, Color, DangerouslySetInlineStyle, Dimension, Display, Direction, Flex, JustifyContent, Margin, Opacity, Overflow, Padding, Position, UserSelect } from "boxTypes";
    import "boxTypes";
    type MarginFunctorType = Functor<Margin>;
    type PaddingFunctor = Functor<Padding>;
    export const propToFn: {
        display: Functor<Display>;
        column: Functor<Column>;
        direction: Functor<Direction>;
        smDisplay: Functor<Display>;
        smColumn: Functor<Column>;
        smDirection: Functor<Direction>;
        mdDisplay: Functor<Display>;
        mdColumn: Functor<Column>;
        mdDirection: Functor<Direction>;
        lgDisplay: Functor<Display>;
        lgColumn: Functor<Column>;
        lgDirection: Functor<Direction>;
        alignContent: Functor<AlignContent>;
        alignItems: Functor<AlignItems>;
        alignSelf: Functor<AlignSelf>;
        bottom: Functor<boolean>;
        borderStyle: Functor<BorderStyle>;
        color: Functor<Color>;
        fit: Functor<boolean>;
        flex: Functor<Flex>;
        flexBasis: Functor<string | number>;
        height: Functor<Dimension>;
        justifyContent: Functor<JustifyContent>;
        left: Functor<boolean>;
        margin: MarginFunctorType;
        marginTop: MarginFunctorType;
        marginBottom: MarginFunctorType;
        marginStart: MarginFunctorType;
        marginEnd: MarginFunctorType;
        smMargin: MarginFunctorType;
        smMarginTop: MarginFunctorType;
        smMarginBottom: MarginFunctorType;
        smMarginStart: MarginFunctorType;
        smMarginEnd: MarginFunctorType;
        mdMargin: MarginFunctorType;
        mdMarginTop: MarginFunctorType;
        mdMarginBottom: MarginFunctorType;
        mdMarginStart: MarginFunctorType;
        mdMarginEnd: MarginFunctorType;
        lgMargin: MarginFunctorType;
        lgMarginTop: MarginFunctorType;
        lgMarginBottom: MarginFunctorType;
        lgMarginStart: MarginFunctorType;
        lgMarginEnd: MarginFunctorType;
        maxHeight: Functor<Dimension>;
        maxWidth: Functor<Dimension>;
        minHeight: Functor<Dimension>;
        minWidth: Functor<Dimension>;
        opacity: Functor<Opacity>;
        overflow: Functor<Overflow>;
        padding: PaddingFunctor;
        paddingX: PaddingFunctor;
        paddingY: PaddingFunctor;
        smPadding: PaddingFunctor;
        smPaddingX: PaddingFunctor;
        smPaddingY: PaddingFunctor;
        mdPadding: PaddingFunctor;
        mdPaddingX: PaddingFunctor;
        mdPaddingY: PaddingFunctor;
        lgPadding: PaddingFunctor;
        lgPaddingX: PaddingFunctor;
        lgPaddingY: PaddingFunctor;
        position: Functor<Position>;
        right: Functor<boolean>;
        rounding: (rounding: import("getRoundingClassName").Rounding) => import("style").Style;
        top: Functor<boolean>;
        userSelect: Functor<UserSelect>;
        width: Functor<Dimension>;
        wrap: Functor<boolean>;
        dangerouslySetInlineStyle: Functor<DangerouslySetInlineStyle>;
        zIndex: Functor<Indexable>;
    };
    export function buildStyles<T extends Record<string, any>>({ baseStyles, props, blocklistProps, allowlistProps, }: {
        baseStyles: string;
        props: T;
        blocklistProps?: ReadonlyArray<string>;
        allowlistProps?: ReadonlyArray<string>;
    }): {
        passthroughProps: T;
        propsStyles: ToPropsOutput;
    };
}
declare module "Box" {
    import type { Node, AbstractComponent, Element } from "react";
    import type { Indexable } from "zIndex";
    import "zIndex";
    import "boxTypes";
    type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    type Dimension = number | string;
    type Direction = "row" | "column";
    type Display = "none" | "flex" | "block" | "inlineBlock" | "visuallyHidden";
    type Margin = -12 | -11 | -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
    type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    type Props = {
        /**
         *
         */
        children?: Node;
        /**
         * An "escape hatch" used to apply styles not otherwise available on Box.
         */
        dangerouslySetInlineStyle?: {
            __style: Record<string, string | number | void>;
        };
        /**
         * Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: 'stretch'
         */
        alignContent?: "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch";
        /**
         * Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: 'stretch'
         */
        alignItems?: "start" | "end" | "center" | "baseline" | "stretch";
        /**
         * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: 'stretch'
         */
        alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
        /**
         * Changes the underlying DOM element when needed for accessibility or SEO reasons. Note that currently only block-level elements are available.
         * Default: 'div'
         */
        as?: "article" | "aside" | "caption" | "details" | "div" | "figcaption" | "figure" | "footer" | "header" | "main" | "nav" | "section" | "summary";
        /**
         * Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. See the [borders](https://gestalt.pinterest.systems/box#Borders) variant for more details.
         * Default: 'none'
         */
        borderStyle?: "sm" | "lg" | "shadow" | "none";
        /**
         * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
         * Default: false
         */
        bottom?: boolean;
        /**
         * See the [color](https://gestalt.pinterest.systems/box#Color) variant for more info.
         * Default: 'transparent'
         */
        color?: "blue" | "darkGray" | "darkWash" | "eggplant" | "gray" | "green" | "lightGray" | "lightWash" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "transparent" | "transparentDarkGray" | "watermelon" | "white";
        /**
         * See the [column layout](https://gestalt.pinterest.systems/box#Column-layout) variant for more info.
         *
         * Also available in responsive sizes: `smColumn`, `mdColumn`, `lgColumn`
         */
        column?: Column;
        smColumn?: Column;
        mdColumn?: Column;
        lgColumn?: Column;
        /**
         * Establishes the main-axis, thus defining the direction flex items are placed in the flex container.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         *
         * Also available in responsive sizes: `smDirection`, `mdDirection`, `lgDirection`
         * Default: 'row'
         */
        direction?: Direction;
        smDirection?: Direction;
        mdDirection?: Direction;
        lgDirection?: Direction;
        /**
         * The display style, which can be customized at different breakpoints. See the [Accessibility guidelines](https://gestalt.pinterest.systems/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
         *
         * Also available in responsive sizes: `smDisplay`, `mdDisplay`, `lgDisplay`
         * Default: 'block'
         */
        display?: Display;
        smDisplay?: Display;
        mdDisplay?: Display;
        lgDisplay?: Display;
        /**
         * Sets the max-width of the Box to 100%. See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         * Default: false
         */
        fit?: boolean;
        /**
         * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: 'shrink'
         */
        flex?: "grow" | "shrink" | "none";
        /**
         * Use numbers for pixels: height={100} and strings for percentages: height="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        height?: Dimension;
        /**
         * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: 'start'
         */
        justifyContent?: "start" | "end" | "center" | "between" | "around" | "evenly";
        /**
         * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
         * Default: false
         */
        left?: boolean;
        /**
         * Scale is in 4px increments so a margin of 2 is 8px. Supports 3 responsive breakpoints: sm, md, lg. Each sets the margin from that breakpoint and up.
         *
         * Also available in responsive sizes: `smMargin`, `mdMargin`, `lgMargin`
         * Default: 0
         */
        margin?: Margin;
        smMargin?: Margin;
        mdMargin?: Margin;
        lgMargin?: Margin;
        /**
         * Also available in responsive sizes: `smMarginTop`, `mdMarginTop`, `lgMarginTop`
         * Default: 0
         */
        marginTop?: Margin;
        smMarginTop?: Margin;
        mdMarginTop?: Margin;
        lgMarginTop?: Margin;
        /**
         * Also available in responsive sizes: `smMarginBottom`, `mdMarginBottom`, `lgMarginBottom`
         * Default: 0
         */
        marginBottom?: Margin;
        smMarginBottom?: Margin;
        mdMarginBottom?: Margin;
        lgMarginBottom?: Margin;
        /**
         * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginStart`.
         *
         * Also available in responsive sizes: `smMarginStart`, `mdMarginStart`, `lgMarginStart`
         * Default: 0
         */
        marginStart?: Margin;
        smMarginStart?: Margin;
        mdMarginStart?: Margin;
        lgMarginStart?: Margin;
        /**
         * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginEnd`.
         *
         * Also available in responsive sizes: `smMarginEnd`, `mdMarginEnd`, `lgMarginEnd`
         * Default: 0
         */
        marginEnd?: Margin;
        smMarginEnd?: Margin;
        mdMarginEnd?: Margin;
        lgMarginEnd?: Margin;
        /**
         * Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        maxHeight?: Dimension;
        /**
         * Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        maxWidth?: Dimension;
        /**
         * Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        minHeight?: Dimension;
        /**
         * Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        minWidth?: Dimension;
        /**
         * See the [opacity](https://gestalt.pinterest.systems/box#Opacity) variant for more info.
         */
        opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
        /**
         * See the [overflow](https://gestalt.pinterest.systems/box#Overflow) variant for more info.
         * Default: 'visible'
         */
        overflow?: "visible" | "hidden" | "scroll" | "scrollX" | "scrollY" | "auto";
        /**
         * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/box#Responsive-padding) variant for more info.
         *
         * Also available in responsive sizes: `smPadding`, `mdPadding`, `lgPadding`
         * Default: 0
         */
        padding?: Padding;
        smPadding?: Padding;
        mdPadding?: Padding;
        lgPadding?: Padding;
        /**
         * Horizontal padding (left/right)
         *
         * Also available in responsive sizes: `smPaddingX`, `mdPaddingX`, `lgPaddingX`
         * Default: 0
         */
        paddingX?: Padding;
        smPaddingX?: Padding;
        mdPaddingX?: Padding;
        lgPaddingX?: Padding;
        /**
         * Vertical padding (top/bottom)
         *
         * Also available in responsive sizes: `smPaddingY`, `mdPaddingY`, `lgPaddingY`
         * Default: 0
         */
        paddingY?: Padding;
        smPaddingY?: Padding;
        mdPaddingY?: Padding;
        lgPaddingY?: Padding;
        /**
         * See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
         * Default: 'static'
         */
        position?: "static" | "absolute" | "relative" | "fixed";
        /**
         * Ref that is forwarded to the underlying input element. See the [using as a ref](https://gestalt.pinterest.systems/box#Using-as-a-ref) variant for more info.
         */
        ref?: HTMLDivElement | Element<"article"> | Element<"aside"> | Element<"details"> | Element<"figcaption"> | Element<"figure"> | Element<"footer"> | Element<"header"> | Element<"main"> | Element<"nav"> | Element<"section"> | Element<"summary">;
        /**
         * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
         * Default: false
         */
        right?: boolean;
        /**
         * Used to designate the Box as a type of element or landmark using ARIA roles. See the [Accessibility guidelines](https://gestalt.pinterest.systems/box#Using-role) to learn more about using `role`.
         */
        role?: string;
        /**
         * See the [rounding](https://gestalt.pinterest.systems/box#Rounding) variant for more info.
         */
        rounding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle" | "pill";
        /**
         * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
         * Default: false
         */
        top?: boolean;
        /**
         * Controls whether or not user can select text.
         * Default: 'auto'
         */
        userSelect?: "auto" | "none";
        /**
         * Use numbers for pixels: width={100} and strings for percentages: width="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
         */
        width?: Dimension;
        /**
         * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
         *
         * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
         * Default: false
         */
        wrap?: boolean;
        /**
         * An object representing the zIndex value of the Box. See the [Z-Index](https://gestalt.pinterest.systems/box#Z-Index) variant for more info.
         */
        zIndex?: Indexable;
    };
    /**
     * https://gestalt.pinterest.systems/Box
     */
    const BoxWithForwardRef: AbstractComponent<Props, HTMLElement>;
    export default BoxWithForwardRef;
}
declare module "textTypes" {
    export type Align = "start" | "end" | "center" | "justify" | "forceLeft" | "forceRight";
    export const allowedColors: string[];
    export type Color = "blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white";
    export type FontWeight = "bold" | "normal";
}
declare module "Heading" {
    import type { Node } from "react";
    import type { Align, Color } from "textTypes";
    type AccessibilityLevel = 1 | 2 | 3 | 4 | 5 | 6 | "none";
    type Overflow = "normal" | "breakWord";
    type Size = "sm" | "md" | "lg";
    type Props = {
        align?: Align;
        accessibilityLevel?: AccessibilityLevel;
        children?: Node;
        color?: Color;
        id?: string;
        lineClamp?: number;
        overflow?: Overflow;
        size?: Size;
    };
    /**
     * https://gestalt.pinterest.systems/Heading
     */
    export default function Heading({ accessibilityLevel, align, children, color, lineClamp, id, overflow, size, }: Props): Node;
}
declare module "Icon" {
    import { $Keys } from "utility-types";
    import type { Node } from "react";
    import icons from "./icons/index";
    export type IconColor = "blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white";
    type Props = {
        /**
         * Label for screen readers to announce Icon.
         *
         * See the [Accessibility guidelines](https://gestalt.pinterest.systems/icon#Accessibility) for details on proper usage.
         */
        accessibilityLabel: string;
        /**
         * These are all the colors available to apply to the Icon; however, we advise only using primary colors within the product to ensure consistency and accessible color contrast.
         *
         * See the [primary-color combinations](https://gestalt.pinterest.systems/icon#Primary-color-combinations) variant to learn more.
         */
        color?: IconColor;
        /**
         * SVG icon from the Gestalt icon library to use within Icon..
         *
         * See the [iconography and SVG](https://gestalt.pinterest.systems/iconography_and_svgs) guidelines to explore the Gestalt icon library.
         */
        icon?: $Keys<typeof icons>;
        /**
         * Defines a new icon different from the built-in Gestalt icons.
         *
         * See the [custom icon](https://gestalt.pinterest.systems/icon#Custom-icon) variant to learn more.
         */
        dangerouslySetSvgPath?: {
            __path: string;
        };
        /**
         * Properly positions Icon relative to an inline element, such as Text using the inline property.
         */
        inline?: boolean;
        /**
         * Use a number for pixel sizes or a string for percentage based sizes.
         *
         * See the [size](https://gestalt.pinterest.systems/icon#Size) variant to learn more.
         */
        size?: number | string;
    };
    /**
     * https://gestalt.pinterest.systems/Icon
     */
    declare function Icon({ accessibilityLabel, color, dangerouslySetSvgPath, icon, inline, size, }: Props): Node;
    declare namespace Icon {
        var icons: string[];
    }
    export default Icon;
}
declare module "useFocusVisible" {
    /**
     * https://gestalt.pinterest.systems/useFocusVisible
     */
    export default function useFocusVisible(): {
        isFocusVisible: boolean;
    };
}
declare module "keyCodes" {
    export const ENTER: number;
    export const ESCAPE: number;
    export const SPACE: number;
    export const DOWN_ARROW: number;
    export const UP_ARROW: number;
    export const TAB: number;
}
declare module "useTapFeedback" {
    type TapTargetHTMLElement = HTMLDivElement;
    export const keyPressShouldTriggerTap: (event: React.KeyboardEvent<TapTargetHTMLElement>) => boolean;
    export default function useTapFeedback({ height, width, }: {
        height: number | null | undefined;
        width: number | null | undefined;
    }): {
        compressStyle: {
            transform: string;
        } | null | undefined;
        handleBlur: () => void;
        handleMouseDown: () => void;
        handleMouseUp: () => void;
        handleTouchCancel: () => void;
        handleTouchEnd: () => void;
        handleTouchMove: (arg0: React.TouchEvent<TapTargetHTMLElement>) => void;
        handleTouchStart: (arg0: React.TouchEvent<TapTargetHTMLElement>) => void;
        isTapping: boolean;
    };
}
declare module "ariaTypes" {
    export type AriaCurrent = "page" | "step" | "location" | "date" | "time" | "true" | "false";
}
declare module "InternalLink" {
    import type { AbstractComponent, Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    import type { AriaCurrent } from "ariaTypes";
    import "ariaTypes";
    import type { Rounding } from "getRoundingClassName";
    type Props = {
        accessibilityCurrent?: AriaCurrent;
        accessibilityLabel?: string;
        children?: Node;
        colorClass?: string;
        disabled?: boolean;
        fullHeight?: boolean;
        fullWidth?: boolean;
        href: string;
        id?: string;
        mouseCursor?: "copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut";
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        onBlur?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>>;
        onFocus?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>>;
        onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLAnchorElement>>;
        onMouseDown?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>>;
        onMouseUp?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>>;
        onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>>;
        onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement>>;
        rel?: "none" | "nofollow";
        tabIndex: -1 | 0;
        rounding?: Rounding;
        selected?: boolean;
        size?: "sm" | "md" | "lg";
        tapStyle?: "none" | "compress";
        target?: null | "self" | "blank";
        wrappedComponent: "button" | "iconButton" | "tapArea";
    };
    const InternalLinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement>;
    export default InternalLinkWithForwardRef;
}
declare module "Pog" {
    import { $Keys } from "utility-types";
    import type { Node } from "react";
    import icons from "./icons/index";
    type Props = {
        accessibilityLabel?: string;
        active?: boolean;
        bgColor?: "transparent" | "darkGray" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "red";
        dangerouslySetSvgPath?: {
            __path: string;
        };
        focused?: boolean;
        hovered?: boolean;
        icon?: $Keys<typeof icons>;
        iconColor?: "gray" | "darkGray" | "red" | "white";
        padding?: 1 | 2 | 3 | 4 | 5;
        selected?: boolean;
        size?: "xs" | "sm" | "md" | "lg" | "xl";
    };
    /**
     * https://gestalt.pinterest.systems/Pog
     */
    export default function Pog(props: Props): Node;
}
declare module "IconButton" {
    import { $Keys } from "utility-types";
    import type { AbstractComponent } from "react";
    import icons from "./icons/index";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type BaseIconButton = {
        accessibilityLabel: string;
        bgColor?: "transparent" | "darkGray" | "transparentDarkGray" | "gray" | "lightGray" | "white" | "red";
        dangerouslySetSvgPath?: {
            __path: string;
        };
        disabled?: boolean;
        icon?: $Keys<typeof icons>;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        iconColor?: "gray" | "darkGray" | "red" | "white";
        padding?: 1 | 2 | 3 | 4 | 5;
        tabIndex?: -1 | 0;
        size?: "xs" | "sm" | "md" | "lg" | "xl";
    };
    type IconButtonType = BaseIconButton & {
        accessibilityControls?: string;
        accessibilityExpanded?: boolean;
        accessibilityHaspopup?: boolean;
        role?: "button";
        selected?: boolean;
    };
    type LinkIconButtonType = BaseIconButton & {
        href: string;
        rel?: "none" | "nofollow";
        role: "link";
        target?: null | "self" | "blank";
    };
    type unionProps = IconButtonType | LinkIconButtonType;
    type unionRefs = HTMLButtonElement | HTMLAnchorElement;
    /**
     * https://gestalt.pinterest.systems/IconButton
     */
    const IconButtonWithForwardRef: AbstractComponent<unionProps, unionRefs>;
    export default IconButtonWithForwardRef;
}
declare module "FlexItem" {
    import type { Node } from "react";
    import type { AlignSelf, Dimension, Flex } from "boxTypes";
    import "boxTypes";
    export type Props = {
        alignSelf?: AlignSelf;
        children?: Node;
        flex?: Flex;
        flexBasis?: string | number;
        minWidth?: Dimension;
    };
    /**
     * https://gestalt.pinterest.systems/Flex
     */
    declare function FlexItem(props: Props): Node;
    declare namespace FlexItem {
        var displayName: string;
    }
    export default FlexItem;
}
declare module "Flex" {
    import type { Node } from "react";
    import FlexItem from "FlexItem";
    import type { AlignContent, AlignItems, AlignSelf, Dimension, Direction, Flex as FlexType, Gap, JustifyContent, Overflow } from "boxTypes";
    import "boxTypes";
    type Props = {
        alignContent?: AlignContent;
        alignItems?: AlignItems;
        alignSelf?: AlignSelf;
        children?: Node;
        direction?: Direction;
        flex?: FlexType;
        gap?: Gap;
        height?: Dimension;
        justifyContent?: JustifyContent;
        maxHeight?: Dimension;
        maxWidth?: Dimension;
        minHeight?: Dimension;
        minWidth?: Dimension;
        overflow?: Overflow;
        width?: Dimension;
        wrap?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Flex
     */
    declare function Flex({ alignItems, children: childrenProp, direction, gap, justifyContent, ...rest }: Props): Node;
    declare namespace Flex {
        var Item: typeof FlexItem;
        var displayName: string;
    }
    export default Flex;
}
declare module "Text" {
    import type { Node } from "react";
    import "react";
    type Overflow = "normal" | "breakWord" | "noWrap";
    type Size = "sm" | "md" | "lg";
    type Props = {
        /**
         * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text.
         *
         * Link: https://gestalt.pinterest.systems/text#align
         */
        align?: "start" | "end" | "center" | "justify" | "forceLeft" | "forceRight";
        children?: Node;
        /**
         * Link: https://gestalt.pinterest.systems/text#color
         */
        color?: "blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white";
        /**
         * Link: https://gestalt.pinterest.systems/text#inline
         */
        inline?: boolean;
        /**
         * Link: https://gestalt.pinterest.systems/text#styles
         */
        italic?: boolean;
        /**
         * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers.
         *
         * Link: https://gestalt.pinterest.systems/text#overflow
         */
        lineClamp?: number;
        /**
         * Link: https://gestalt.pinterest.systems/text#overflow
         */
        overflow?: Overflow;
        /**
         * sm: `12px`, md: `14px`, lg: `16px`
         *
         * Link: https://gestalt.pinterest.systems/text#size
         */
        size?: Size;
        /**
         * Link: https://gestalt.pinterest.systems/text#styles
         */
        underline?: boolean;
        /**
         * Link: https://gestalt.pinterest.systems/text#styles
         */
        weight?: "bold" | "normal";
    };
    /**
     * The [Text](https://gestalt.pinterest.systems/Text) component should be used for all text on the page.
     *
     * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Text%20%230.png)
     * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Text-dark%20%230.png)
     */
    export default function Text({ align, children, color, inline, italic, lineClamp, overflow, size, underline, weight, }: Props): Node;
}
declare module "Button" {
    import { $Keys } from "utility-types";
    import type { AbstractComponent } from "react";
    import icons from "./icons/index";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type BaseButton = {
        accessibilityLabel?: string;
        color?: "gray" | "red" | "blue" | "transparent" | "semiTransparentWhite" | "transparentWhiteText" | "white";
        disabled?: boolean;
        iconEnd?: $Keys<typeof icons>;
        fullWidth?: boolean;
        name?: string;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        tabIndex?: -1 | 0;
        size?: "sm" | "md" | "lg";
        text: string;
    };
    type ButtonType = BaseButton & {
        accessibilityControls?: string;
        accessibilityExpanded?: boolean;
        accessibilityHaspopup?: boolean;
        selected?: boolean;
        type?: "button";
        role?: "button";
    };
    type SubmitButtonType = BaseButton & {
        type: "submit";
        role?: "button";
    };
    type LinkButtonType = BaseButton & {
        href: string;
        rel?: "none" | "nofollow";
        role: "link";
        target?: null | "self" | "blank";
    };
    type unionProps = ButtonType | SubmitButtonType | LinkButtonType;
    type unionRefs = HTMLButtonElement | HTMLAnchorElement;
    /**
     * https://gestalt.pinterest.systems/Button
     */
    const ButtonWithForwardRef: AbstractComponent<unionProps, unionRefs>;
    export default ButtonWithForwardRef;
}
declare module "ActivationCard" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type LinkData = {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        rel?: "none" | "nofollow";
        target?: null | "self" | "blank";
    };
    type Props = {
        dismissButton?: {
            accessibilityLabel: string;
            onDismiss: () => void;
        };
        message: string;
        link?: LinkData;
        status: "notStarted" | "pending" | "needsAttention" | "complete";
        statusMessage: string;
        title: string;
    };
    /**
     * https://gestalt.pinterest.systems/ActivationCard
     */
    export default function ActivationCard({ dismissButton, message, link, status, statusMessage, title, }: Props): Node;
}
declare module "useReducedMotion" {
    /**
     * https://gestalt.pinterest.systems/useReducedMotion
     */
    export default function useReducedMotion(): boolean;
}
declare module "AnimationController" {
    import type { Context, Element, Node } from "react";
    export type AnimationStateType = "in" | "postIn" | "out" | "postOut" | null;
    type AnimationType = {
        animationState: AnimationStateType;
        setAnimationState: ((arg0: AnimationStateType) => void) | null;
    };
    type UseAnimationType = {
        animationState: AnimationStateType;
        onAnimationEnd: (() => void) | null;
    };
    type AnimationControllerProps = {
        children: (arg0: {
            onDismissStart: () => void;
        }) => Node;
        onDismissEnd: () => void;
    };
    const AnimationContext: Context<AnimationType>;
    export function useAnimation(): UseAnimationType;
    function AnimationController({ children, onDismissEnd, }: AnimationControllerProps): Element<typeof AnimationContext.Provider> | null;
    export default AnimationController;
}
declare module "Image" {
    import type { Node } from "react";
    import { PureComponent } from "react";
    type Props = {
        alt: string;
        children?: Node;
        color: string;
        crossOrigin?: "anonymous" | "use-credentials";
        elementTiming?: string;
        fit?: "contain" | "cover" | "none";
        importance?: "high" | "low" | "auto";
        loading?: "eager" | "lazy" | "auto";
        naturalHeight: number;
        naturalWidth: number;
        onError?: () => void;
        onLoad?: () => void;
        role?: "img" | "presentation";
        sizes?: string;
        src: string;
        srcSet?: string;
    };
    /**
     * https://gestalt.pinterest.systems/Image
     */
    export default class Image extends PureComponent<Props> {
        static defaultProps: {
            color: string;
            fit?: "contain" | "cover" | "none";
            importance?: "high" | "low" | "auto";
            loading?: "eager" | "lazy" | "auto";
        };
        componentDidMount(): void;
        componentDidUpdate(prevProps: Props): void;
        handleLoad: () => void;
        handleError: () => void;
        loadImage(): void;
        render(): Node;
        style: {};
    }
}
declare module "Mask" {
    import type { Node } from "react";
    type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle";
    type Props = {
        children?: Node;
        height?: number | string;
        rounding?: Rounding;
        width?: number | string;
        willChangeTransform?: boolean;
        wash?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Mask
     */
    export default function Mask(props: Props): Node;
}
declare module "AvatarFoundation" {
    import type { Node } from "react";
    import "react";
    type Props = {
        children?: string | number;
        fontSize?: string;
        outline?: boolean;
        textAnchor?: "start" | "middle" | "end";
        title?: string;
        translate?: "translateX10";
        content?: "text" | "icon";
    };
    export default function AvatarFoundation({ children, fontSize, outline, textAnchor, title, translate, content, }: Props): Node;
}
declare module "DefaultAvatar" {
    import type { Node } from "react";
    import "react";
    type Props = {
        accessibilityLabel?: string;
        name: string;
    };
    export default function DefaultAvatar({ accessibilityLabel, name, }: Props): Node;
}
declare module "Avatar" {
    import type { Node } from "react";
    export type CollaboratorDataType = {
        name: string;
        src?: string;
    };
    type Props = CollaboratorDataType & {
        accessibilityLabel?: string;
        outline?: boolean;
        size?: "xs" | "sm" | "md" | "lg" | "xl" | "fit";
        verified?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Avatar
     */
    export default function Avatar(props: Props): Node;
}
declare module "TapArea" {
    import type { Node, AbstractComponent } from "react";
    import type { Rounding } from "getRoundingClassName";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    import type { AriaCurrent } from "ariaTypes";
    import "ariaTypes";
    type FocusEventHandler = AbstractEventHandler<React.FocusEvent<HTMLDivElement> | React.FocusEvent<HTMLAnchorElement>>;
    type MouseEventHandler = AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement>>;
    type KeyboardEventHandler = AbstractEventHandler<React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>>;
    export type OnTapType = AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
        dangerouslyDisableOnNavigation: () => void;
    }>;
    type BaseTapArea = {
        accessibilityLabel?: string;
        children?: Node;
        disabled?: boolean;
        fullHeight?: boolean;
        fullWidth?: boolean;
        mouseCursor?: "copy" | "grab" | "grabbing" | "move" | "noDrop" | "pointer" | "zoomIn" | "zoomOut";
        onBlur?: FocusEventHandler;
        onFocus?: FocusEventHandler;
        onKeyDown?: KeyboardEventHandler;
        onMouseDown?: MouseEventHandler;
        onMouseUp?: MouseEventHandler;
        onMouseEnter?: MouseEventHandler;
        onMouseLeave?: MouseEventHandler;
        onTap?: OnTapType;
        tabIndex?: -1 | 0;
        rounding?: Rounding;
        tapStyle?: "none" | "compress";
    };
    type TapAreaType = BaseTapArea & {
        accessibilityControls?: string;
        accessibilityExpanded?: boolean;
        accessibilityHaspopup?: boolean;
        role?: "button";
    };
    type LinkTapAreaType = BaseTapArea & {
        accessibilityCurrent?: AriaCurrent;
        href: string;
        rel?: "none" | "nofollow";
        role: "link";
        target?: null | "self" | "blank";
    };
    type unionProps = TapAreaType | LinkTapAreaType;
    type unionRefs = HTMLDivElement | HTMLAnchorElement;
    /**
     * https://gestalt.pinterest.systems/TapArea
     */
    const TapAreaWithForwardRef: AbstractComponent<unionProps, unionRefs>;
    export default TapAreaWithForwardRef;
}
declare module "AvatarGroupConstants" {
    export type Size = "xs" | "sm" | "md" | "fit";
    export const SIZE_MAP: {
        xs: number;
        sm: number;
        md: number;
        fit: string;
    };
    export type BaseStackType = {
        hovered: boolean;
        pileCount: number;
        size: Size;
    };
}
declare module "AvatarGroupPositioningWrapper" {
    import type { Node } from "react";
    import "react";
    import type { Size } from "AvatarGroupConstants";
    type Props = {
        children: Node;
        pileCount: number;
        index: number;
        size: Size;
    };
    export default function PositioningWrapper({ size, pileCount, index, children, }: Props): Node;
}
declare module "AvatarGroupHoverOverlay" {
    import type { Node } from "react";
    import "react";
    import type { Size } from "AvatarGroupConstants";
    type Props = {
        children: Node;
        hovered: boolean;
        size: Size;
    };
    export default function AvatarGroupHoverOverlay({ children, hovered, size, }: Props): Node;
}
declare module "AvatarGroupAddCollaboratorsButton" {
    import type { Node } from "react";
    import "react";
    import type { BaseStackType } from "AvatarGroupConstants";
    import "AvatarGroupConstants";
    export default function AvatarGroupAddCollaboratorsButton({ hovered, pileCount, size, }: BaseStackType): Node;
}
declare module "AvatarGroupCollaboratorAvatar" {
    import type { Node } from "react";
    import "react";
    import type { BaseStackType } from "AvatarGroupConstants";
    import "AvatarGroupConstants";
    type Props = BaseStackType & {
        index: number;
        name: string;
        src: string;
    };
    export default function AvatarGroupCollaboratorAvatar({ hovered, index, name, pileCount, size, src, }: Props): Node;
}
declare module "AvatarGroupCollaboratorsCount" {
    import type { Node } from "react";
    import "react";
    import type { BaseStackType } from "AvatarGroupConstants";
    import "AvatarGroupConstants";
    type Props = BaseStackType & {
        showAddCollaboratorsButton: boolean;
        count: number;
    };
    export default function AvatarGroupCollaboratorsCount({ showAddCollaboratorsButton, pileCount, hovered, count, size, }: Props): Node;
}
declare module "AvatarGroup" {
    import type { AbstractComponent } from "react";
    import type { OnTapType } from "TapArea";
    type UnionRefs = HTMLDivElement | HTMLAnchorElement;
    type Props = {
        /**
         * Label for screen readers to announce AvatarGroup.
         *
         * See the [Accessibility guidelines](https://gestalt.pinterest.systems/AvatarGroup#Accessibility) for details on proper usage.
         */
        accessibilityLabel: string;
        /**
         * Specify the `id` of an associated element (or elements) whose contents or visibility are controlled by a component so that screen reader users can identify the relationship between elements. Optional with button-role component.
         *
         * See the [Accessibility guidelines](https://gestalt.pinterest.systems/AvatarGroup#Accessibility) for details on proper usage.
         */
        accessibilityControls?: string;
        /**
         * Indicate that a component hides or exposes collapsible components and expose whether they are currently expanded or collapsed. Optional with button-role component.
         *
         * See the [Accessibility guidelines](https://gestalt.pinterest.systems/AvatarGroup#Accessibility) for details on proper usage.
         */
        accessibilityExpanded?: boolean;
        /**
         * Indicate that a component controls the appearance of interactive popup elements, such as menu or dialog. Optional with button-role component.
         *
         * See the [Accessibility guidelines](https://gestalt.pinterest.systems/AvatarGroup#Accessibility) for details on proper usage.
         */
        accessibilityHaspopup?: boolean;
        /**
         * When supplied, it appends an `add` [icon](https://gestalt.pinterest.systems/Icon) to the avatar pile as a call to action to the user. See [Best Practices](https://gestalt.pinterest.systems/AvatarGroup#Best-practices) for more info.
         */
        addCollaborators?: boolean;
        /**
         * The user group data. See the [collaborators display](https://gestalt.pinterest.systems/AvatarGroup#Collaborators-display) variant to learn more.
         */
        collaborators: ReadonlyArray<{
            name: string;
            src?: string;
        }>;
        /**
         * When supplied, wraps the component in a link, and directs users to the url when item is selected. See the [role](https://gestalt.pinterest.systems/AvatarGroup#Role) variant to learn more.
         */
        href?: string;
        /**
         * Callback fired when the component is clicked (pressed and released) with a mouse or keyboard. See the [role](https://gestalt.pinterest.systems/AvatarGroup#Role) variant to learn more and see [TapArea's `onTap`](https://gestalt.pinterest.systems/taparea#Props-onTap) for more info about `OnTapType`.
         */
        onClick?: OnTapType;
        /**
         * Forward the ref to the underlying div or anchor element. See the [role](https://gestalt.pinterest.systems/AvatarGroup#Role) variant to learn more.
         */
        ref?: UnionRefs;
        /**
         * Allows user interaction with the component. See the [role](https://gestalt.pinterest.systems/AvatarGroup#Role) variant to learn more.
         */
        role?: "link" | "button";
        /**
         * The maximum height of AvatarGroup. If size is `fit`, AvatarGroup will fill 100% of the parent container width. See the [fixed size](https://gestalt.pinterest.systems/AvatarGroup#Fixed-sizes) and [responsive size](https://gestalt.pinterest.systems/AvatarGroup#Responsive-sizing) variant to learn more.
         */
        size?: "xs" | "sm" | "md" | "fit";
    };
    /**
     * [AvatarGroup](https://gestalt.pinterest.systems/AvatarGroup) is used to both display a group of user avatars and, optionally, control actions related to the users group.
     *
     * ![AvatarGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/AvatarGroup%20%230.png)
     * ![AvatarGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/AvatarGroup-dark%20%230.png)
     */
    const AvatarGroupWithForwardRef: AbstractComponent<Props, UnionRefs>;
    export default AvatarGroupWithForwardRef;
}
declare module "AvatarPair" {
    import type { Node } from "react";
    import type { CollaboratorDataType } from "Avatar";
    type Props = {
        collaborators: ReadonlyArray<CollaboratorDataType>;
        size?: "md" | "lg" | "fit";
    };
    /**
     * https://gestalt.pinterest.systems/AvatarPair
     */
    export default function AvatarPair({ collaborators, size, }: Props): Node;
}
declare module "Backdrop" {
    import type { Node } from "react";
    import type { AnimationStateType } from "AnimationController";
    import "AnimationController";
    type Props = {
        animationState?: AnimationStateType;
        children?: Node;
        closeOnOutsideClick: boolean;
        onClick?: (event: MouseEvent) => void;
    };
    function Backdrop({ animationState, children, closeOnOutsideClick, onClick, }: Props): Node;
    export default Backdrop;
}
declare module "Badge" {
    import type { Node } from "react";
    import "react";
    type Position = "middle" | "top";
    type Props = {
        position?: Position;
        text: string;
    };
    /**
     * https://gestalt.pinterest.systems/Badge
     */
    export default function Badge({ position, text }: Props): Node;
}
declare module "ButtonGroup" {
    import type { Node } from "react";
    /**
     * https://gestalt.pinterest.systems/ButtonGroup
     */
    function ButtonGroup({ children }: {
        children?: Node;
    }): Node;
    export default ButtonGroup;
}
declare module "Cache" {
    export interface Cache<K, V> {
        get(key: K): V | null | undefined;
        has(key: K): boolean;
        set(key: K, value: V): void;
        reset(): void;
    }
}
declare module "useResponsiveMinWidth" {
    type MinWidthType = "lg" | "md" | "sm" | "xs";
    export default function useResponsiveMinWidth(): MinWidthType | null | undefined;
}
declare module "commonTypes" {
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    export type ActionDataType = {
        accessibilityLabel: string;
        disabled?: boolean;
        href?: string;
        label: string;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        rel?: "none" | "nofollow";
        target?: null | "self" | "blank";
    };
    export type DismissButtonType = {
        accessibilityLabel: string;
        onDismiss: () => void;
    };
}
declare module "Callout" {
    import type { Node } from "react";
    import "react";
    import "commonTypes";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        /**
         * Adds a dismiss button to Callout. See the [Dismissible variant](https://gestalt.pinterest.systems/callout#Dismissible) for more info.
         * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
         */
        dismissButton?: {
            accessibilityLabel: string;
            onDismiss: () => void;
        };
        /**
         * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility) for details on proper usage.
         */
        iconAccessibilityLabel: string;
        /**
         * Main content of Callout. Content should be [localized](https://gestalt.pinterest.systems/callout#Localization).
         *
         * See [Best Practices](https://gestalt.pinterest.systems/callout#Best-practices) for more info.
         */
        message: string;
        /**
         * Main action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/callout/OnLinkNavigationProvider) to learn more about link navigation.
         * If no `href` is supplied, the action will be a button.
         * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
         */
        primaryAction?: {
            accessibilityLabel: string;
            disabled?: boolean;
            href?: string;
            label: string;
            onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>, {
                dangerouslyDisableOnNavigation: () => void;
            }>;
            rel?: "none" | "nofollow";
            target?: null | "self" | "blank";
        };
        /**
         * Secondary action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/callout/OnLinkNavigationProvider) to learn more about link navigation.
         * If no `href` is supplied, the action will be a button.
         * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
         */
        secondaryAction?: {
            accessibilityLabel: string;
            disabled?: boolean;
            href?: string;
            label: string;
            onClick?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>, {
                dangerouslyDisableOnNavigation: () => void;
            }>;
            rel?: "none" | "nofollow";
            target?: null | "self" | "blank";
        };
        /**
         * The category of Callout. See [Variants](https://gestalt.pinterest.systems/callout#Variants) to learn more.
         */
        type: "error" | "info" | "warning";
        /**
         * Brief title summarizing Callout. Content should be [localized](https://gestalt.pinterest.systems/callout#Localization).
         */
        title?: string;
    };
    /**
     * https://gestalt.pinterest.systems/Callout
     */
    export default function Callout({ dismissButton, iconAccessibilityLabel, message, primaryAction, secondaryAction, type, title, }: Props): Node;
}
declare module "Card" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        active?: boolean | null | undefined;
        children?: Node;
        image?: Node;
        onMouseEnter?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
        onMouseLeave?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
    };
    /**
     * https://gestalt.pinterest.systems/Card
     */
    export default function Card(props: Props): Node;
}
declare module "Caret" {
    import type { Node } from "react";
    type Props = {
        direction: "up" | "right" | "down" | "left";
        height: 4 | 12;
        width: 4 | 12;
    };
    export default function Caret(props: Props): Node;
}
declare module "FormErrorMessage" {
    import type { Node } from "react";
    import "react";
    type Props = {
        id: string;
        text?: Node;
    };
    export default function FormErrorMessage({ id, text }: Props): Node;
}
declare module "Label" {
    import type { Node } from "react";
    export type LabelDisplay = "visible" | "hidden";
    type Props = {
        children?: Node;
        htmlFor: string;
        labelDisplay?: LabelDisplay;
    };
    /**
     * https://gestalt.pinterest.systems/Label
     */
    export default function Label(props: Props): Node;
}
declare module "Checkbox" {
    import type { Node, AbstractComponent } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        checked?: boolean;
        disabled?: boolean;
        errorMessage?: string;
        hasError?: boolean;
        id: string;
        image?: Node;
        indeterminate?: boolean;
        label?: string;
        name?: string;
        onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, {
            checked: boolean;
        }>;
        onClick?: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, {
            checked: boolean;
        }>;
        size?: "sm" | "md";
        subtext?: string;
    };
    /**
     * https://gestalt.pinterest.systems/Checkbox
     */
    const CheckboxWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default CheckboxWithForwardRef;
}
declare module "Collection" {
    import type { Node } from "react";
    import "react";
    type Props = {
        Item: (arg0: {
            idx: number;
        }) => Node;
        layout: ReadonlyArray<{
            top: number;
            left: number;
            width: number;
            height: number;
        }>;
        viewportTop?: number;
        viewportLeft?: number;
        viewportWidth?: number;
        viewportHeight?: number;
    };
    /**
     * https://gestalt.pinterest.systems/Collection
     */
    export default function Collection(props: Props): Node;
}
declare module "Collage" {
    import type { Node } from "react";
    type Column = 2 | 3 | 4;
    type Props = {
        columns: Column;
        cover?: boolean;
        gutter?: number;
        height: number;
        layoutKey?: number;
        renderImage: (arg0: {
            width: number;
            height: number;
            index: number;
        }) => Node;
        width: number;
    };
    /**
     * https://gestalt.pinterest.systems/Collage
     */
    export default function Collage(props: Props): Node;
}
declare module "ColorScheme" {
    import type { Context, Element, Node } from "react";
    export type ColorScheme = "light" | "dark" | "userPreference";
    type Theme = {
        name: string;
        colorRed0: string;
        colorRed100: string;
        colorRed100Active: string;
        colorRed100Hovered: string;
        colorGray0: string;
        colorGray0Active: string;
        colorGray0Hovered: string;
        colorGray50: string;
        colorGray100: string;
        colorGray100Active: string;
        colorGray100Hovered: string;
        colorGray150: string;
        colorGray150Hovered: string;
        colorGray200: string;
        colorGray200Active: string;
        colorGray200Hovered: string;
        colorGray300: string;
        colorGray400: string;
        colorTransparentDarkGray: string;
        colorTransparentGray60: string;
        colorTransparentGray100: string;
        colorTransparentGray500: string;
        colorTransparentWhite: string;
        blueHovered: string;
        blueActive: string;
    };
    type Props = {
        children: Node;
        colorScheme?: ColorScheme;
        id?: string | null | undefined;
    };
    const ThemeContext: Context<Theme>;
    /**
     * https://gestalt.pinterest.systems/ColorSchemeProvider
     */
    export default function ColorSchemeProvider({ children, colorScheme, id, }: Props): Element<typeof ThemeContext.Provider>;
    export function useColorScheme(): Theme;
}
declare module "Column" {
    import type { Node } from "react";
    type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    type ColumnProps = {
        children?: Node;
        span: Columns;
        smSpan?: Columns;
        mdSpan?: Columns;
        lgSpan?: Columns;
    };
    /**
     * https://gestalt.pinterest.systems/Column
     */
    export default function Column(props: ColumnProps): Node;
}
declare module "Layer" {
    import type { Portal, Node } from "react";
    import type { Indexable } from "zIndex";
    import "zIndex";
    /**
     * https://gestalt.pinterest.systems/Layer
     */
    export default function Layer({ children, zIndex: zIndexIndexable, }: {
        children: Node;
        zIndex?: Indexable;
    }): Portal | Node;
}
declare module "Contents" {
    import type { Node } from "react";
    import type { ClientRect, MainDirections, Coordinates } from "./utils/positioningTypes";
    export type Role = "dialog" | "listbox" | "menu";
    type OwnProps = {
        anchor: HTMLElement;
        bgColor: "blue" | "darkGray" | "orange" | "red" | "white";
        border?: boolean;
        caret?: boolean;
        children?: Node;
        id: string | null | undefined;
        idealDirection?: MainDirections;
        onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
        onResize: () => void;
        positionRelativeToAnchor?: boolean;
        relativeOffset: Coordinates;
        role: Role | null | undefined;
        rounding?: 2 | 4;
        shouldFocus?: boolean;
        triggerRect: ClientRect;
        width: number | null | undefined;
    };
    export default function WrappedContents(props: OwnProps): Node;
}
declare module "Controller" {
    import type { Node as ReactNode } from "react";
    import type { Role } from "Contents";
    type OwnProps = {
        anchor: HTMLElement;
        bgColor: "blue" | "darkGray" | "orange" | "red" | "white";
        border?: boolean;
        caret?: boolean;
        children?: ReactNode;
        handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
        id?: string | null | undefined;
        idealDirection?: "up" | "right" | "down" | "left";
        onDismiss: () => void;
        positionRelativeToAnchor: boolean;
        role?: Role | null | undefined;
        rounding?: 2 | 4;
        shouldFocus?: boolean;
        size?: "xs" | "sm" | "md" | "lg" | "xl" | number | null;
    };
    const WrappedController: (props: OwnProps) => any;
    export default WrappedController;
}
declare module "Popover" {
    import type { Node } from "react";
    import type { Role } from "Contents";
    import "Contents";
    type Color = "blue" | "orange" | "red" | "white" | "darkGray";
    type Size = "xs" | "sm" | "md" | "lg" | "xl" | "flexible" | number;
    type IdealDirection = "up" | "right" | "down" | "left";
    type Props = {
        anchor: HTMLElement | null | undefined;
        children?: Node;
        color?: Color;
        handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
        id?: string;
        idealDirection?: IdealDirection;
        onDismiss: () => void;
        positionRelativeToAnchor?: boolean;
        role?: Role;
        shouldFocus?: boolean;
        showCaret?: boolean;
        size?: Size;
    };
    /**
     * https://gestalt.pinterest.systems/Popover
     */
    export default function Popover(props: Props): null | Node;
}
declare module "FormHelperText" {
    import type { Node } from "react";
    export default function FormHelperText({ text }: {
        text: string;
    }): Node;
}
declare module "FormLabel" {
    import type { Node } from "react";
    import type { LabelDisplay } from "Label";
    type Props = {
        id: string;
        label: string;
        labelDisplay?: LabelDisplay;
    };
    export default function FormLabel({ id, label, labelDisplay }: Props): Node;
}
declare module "Tag" {
    import type { Node } from "react";
    type Props = ({
        disabled: true;
        onRemove?: (arg0: {
            event: React.MouseEvent<HTMLButtonElement>;
        }) => void;
        removeIconAccessibilityLabel?: string;
    } | {
        disabled?: boolean;
        onRemove: (arg0: {
            event: React.MouseEvent<HTMLButtonElement>;
        }) => void;
        removeIconAccessibilityLabel: string;
    }) & {
        text: string;
        errorMessage?: string;
    };
    /**
     * https://gestalt.pinterest.systems/Tag
     */
    export default function Tag(props: Props): Node;
}
declare module "InternalTextField" {
    import type { Element, Node, AbstractComponent } from "react";
    import Tag from "Tag";
    import type { LabelDisplay } from "Label";
    import "Label";
    type Props = {
        id: string;
        onChange: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        accessibilityClearButtonLabel?: string;
        accessibilityControls?: string;
        accessibilityActiveDescendant?: string;
        autoComplete?: "current-password" | "new-password" | "on" | "off" | "username" | "email";
        disabled?: boolean;
        errorMessage?: Node;
        hasError?: boolean;
        helperText?: string;
        label?: string;
        labelDisplay?: LabelDisplay;
        name?: string;
        onBlur?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onClickIconButton?: () => void;
        onClick?: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onFocus?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        placeholder?: string;
        size?: "md" | "lg";
        tags?: ReadonlyArray<Element<typeof Tag>>;
        textfieldIconButton?: "clear" | "expand";
        type?: "date" | "email" | "number" | "password" | "text" | "url";
        value?: string;
    };
    const InternalTextFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default InternalTextFieldWithForwardRef;
}
declare module "Link" {
    import type { AbstractComponent, Node } from "react";
    import type { Rounding } from "getRoundingClassName";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        accessibilityLabel?: string;
        accessibilitySelected?: boolean;
        children?: Node;
        hoverStyle?: "none" | "underline";
        href: string;
        id?: string;
        inline?: boolean;
        onBlur?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>>;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        onFocus?: AbstractEventHandler<React.FocusEvent<HTMLAnchorElement>>;
        rel?: "none" | "nofollow";
        role?: "tab";
        rounding?: Rounding;
        tapStyle?: "none" | "compress";
        target?: null | "self" | "blank";
        disabled?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Link
     */
    const LinkWithForwardRef: AbstractComponent<Props, HTMLAnchorElement>;
    export default LinkWithForwardRef;
}
declare module "OptionItem" {
    import type { Node, AbstractComponent } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    import type { FontWeight } from "textTypes";
    import "textTypes";
    export type OptionItemType = {
        label: string;
        subtext?: string;
        value: string;
    };
    type Props = {
        badgeText?: string;
        children?: Node;
        hoveredItemIndex: number | null | undefined;
        href?: string;
        id: string;
        index: number;
        isExternal?: boolean;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        onSelect?: (arg0: {
            item: OptionItemType;
            event: React.SyntheticEvent<HTMLInputElement>;
        }) => void;
        option: OptionItemType;
        role?: "option" | "menuitem";
        selected?: OptionItemType | ReadonlyArray<OptionItemType> | null;
        setHoveredItemIndex: (arg0: number) => void;
        shouldTruncate?: boolean;
        textWeight?: FontWeight;
    };
    const OptionItemWithForwardRef: AbstractComponent<Props, HTMLElement | null | undefined>;
    export default OptionItemWithForwardRef;
}
declare module "ComboBox" {
    import type { Element, Node, AbstractComponent } from "react";
    import Tag from "Tag";
    import type { OptionItemType } from "OptionItem";
    import type { LabelDisplay } from "Label";
    import "Label";
    type Size = "md" | "lg";
    type Props = {
        accessibilityClearButtonLabel: string;
        id: string;
        label: string;
        options: ReadonlyArray<OptionItemType>;
        noResultText: string;
        disabled?: boolean;
        errorMessage?: Node;
        helperText?: string;
        inputValue?: string;
        labelDisplay?: LabelDisplay;
        onBlur?: (arg0: {
            event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onChange?: (arg0: {
            value: string;
            event: React.SyntheticEvent<HTMLInputElement>;
        }) => void;
        onClear?: () => void;
        onFocus?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onSelect?: (arg0: {
            event: React.SyntheticEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
            item: OptionItemType;
        }) => void;
        placeholder?: string;
        selectedOption?: OptionItemType;
        size?: Size;
        tags?: ReadonlyArray<Element<typeof Tag>>;
    };
    const ComboBoxWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default ComboBoxWithForwardRef;
}
declare module "Container" {
    import type { Node } from "react";
    type Props = {
        children?: Node;
    };
    /**
     * https://gestalt.pinterest.systems/Container
     */
    export default function Container(props: Props): Node;
}
declare module "useDebouncedCallback" {
    /**
     * Hook to debounce a particular function from being called until after a given
     * wait period. An important bit is that we clear the timeout when the component
     * unmounts. That way, we avoid React state updates on unmounted components which
     * result in a warning. See https://stackoverflow.com/a/60907638/117193 for more info
     */
    export default function useDebouncedCallback(callback: () => void, wait: number): () => void;
}
declare module "Tooltip" {
    import type { Node } from "react";
    import type { Indexable } from "zIndex";
    import "zIndex";
    type Props = {
        children: Node;
        link?: Node;
        idealDirection?: "up" | "right" | "down" | "left";
        inline?: boolean;
        text: string;
        zIndex?: Indexable;
    };
    /**
     * https://gestalt.pinterest.systems/Tooltip
     */
    export default function Tooltip({ children, link, idealDirection, inline, text, zIndex, }: Props): Node;
}
declare module "DatapointTrend" {
    import type { Node } from "react";
    type Sentiment = "good" | "bad" | "neutral" | "auto";
    type Props = {
        iconAccessibilityLabel: string;
        sentiment?: Sentiment;
        value: number;
    };
    export default function DatapointTrend({ iconAccessibilityLabel, sentiment, value, }: Props): Node;
}
declare module "Datapoint" {
    import type { Node } from "react";
    type TrendObject = {
        accessibilityLabel: string;
        value: number;
    };
    type Props = {
        tooltipText?: string;
        size?: "md" | "lg";
        title: string;
        trend?: TrendObject;
        trendSentiment?: "good" | "bad" | "neutral" | "auto";
        value: string;
    };
    /**
     * https://gestalt.pinterest.systems/Datapoint
     */
    export default function Datapoint({ tooltipText, size, title, trend, trendSentiment, value, }: Props): Node;
}
declare module "debounce" {
    /**
     * debounce prevents a particular function from being called until after a given
     * cooldown period (default 100ms). Every time the function is called, it resets
     * the cooldown.
     */
    export default function debounce(fn: (...args: any) => void, threshhold?: number): {
        (...args: any): void;
        clearTimeout(): void;
    };
}
declare module "defaultLayout" {
    import type { Cache } from "Cache";
    export type Position = {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    const defaultLayout: <T>({ cache, columnWidth, gutter, justify, minCols, rawItemCount, width, }: {
        columnWidth?: number;
        gutter?: number;
        justify: "center" | "start";
        cache: Cache<T, number>;
        minCols?: number;
        rawItemCount: number;
        width?: number | null | undefined;
    }) => (items: ReadonlyArray<any>) => ReadonlyArray<Position>;
    export default defaultLayout;
}
declare module "Divider" {
    import type { Node } from "react";
    /**
     * https://gestalt.pinterest.systems/Divider
     */
    export default function Divider(): Node;
}
declare module "DropdownContext" {
    type DropdownContextType = {
        id: string;
        hoveredItem: number;
        setHoveredItem: (n: number) => void;
        setOptionRef: (arg0: HTMLElement | null | undefined) => void;
    };
    const DropdownContextProvider: import("react").Provider<DropdownContextType>;
    const DropdownContextConsumer: import("react").Consumer<DropdownContextType>;
    export { DropdownContextProvider, DropdownContextConsumer };
}
declare module "DropdownItem" {
    import type { Node } from "react";
    import "react";
    import type { OptionItemType } from "OptionItem";
    type PublicProps = {
        badgeText?: string;
        children?: Node;
        onSelect: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement>;
            item: OptionItemType;
        }) => void;
        option: OptionItemType;
        selected?: OptionItemType | ReadonlyArray<OptionItemType> | null;
    };
    type PrivateProps = {
        index?: number;
    };
    type Props = PublicProps & PrivateProps;
    /**
     * https://gestalt.pinterest.systems/Dropdown
     */
    declare function DropdownItem({ badgeText, children, onSelect, index, option, selected, }: Props): Node;
    declare namespace DropdownItem {
        var displayName: string;
    }
    export default DropdownItem;
}
declare module "DropdownLink" {
    import type { Node } from "react";
    import "react";
    import type { OptionItemType } from "OptionItem";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type PublicProps = {
        badgeText?: string;
        children?: Node;
        href: string;
        isExternal?: boolean;
        onClick?: AbstractEventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        option: OptionItemType;
    };
    type PrivateProps = {
        index?: number;
    };
    type Props = PublicProps & PrivateProps;
    declare function DropdownLink({ badgeText, children, href, index, isExternal, onClick, option, }: Props): Node;
    declare namespace DropdownLink {
        var displayName: string;
    }
    export default DropdownLink;
}
declare module "DropdownSection" {
    import type { Node } from "react";
    type Props = {
        children: Node;
        label: string;
    };
    /**
     * https://gestalt.pinterest.systems/Dropdown
     */
    declare function DropdownSection({ label, children }: Props): Node;
    declare namespace DropdownSection {
        var displayName: string;
    }
    export default DropdownSection;
}
declare module "Dropdown" {
    import type { Node } from "react";
    import DropdownItem from "DropdownItem";
    import DropdownLink from "DropdownLink";
    import DropdownSection from "DropdownSection";
    import type { Indexable } from "zIndex";
    import "zIndex";
    import "./utils/keyboardNavigation";
    type IdealDirection = "up" | "right" | "down" | "left";
    type Props = {
        anchor?: HTMLElement | null | undefined;
        children: Node;
        dangerouslyRemoveLayer?: boolean;
        headerContent?: Node;
        id: string;
        idealDirection?: IdealDirection;
        onDismiss: () => void;
        zIndex?: Indexable;
    };
    /**
     * https://gestalt.pinterest.systems/Dropdown
     */
    declare function Dropdown({ anchor, children, dangerouslyRemoveLayer, headerContent, id, idealDirection, onDismiss, zIndex, }: Props): Node;
    declare namespace Dropdown {
        var Item: typeof DropdownItem;
        var Link: typeof DropdownLink;
        var Section: typeof DropdownSection;
    }
    export default Dropdown;
}
declare module "FetchItems" {
    type Props = {
        containerHeight: number;
        fetchMore?: () => void;
        isAtEnd?: boolean;
        isFetching: boolean;
        scrollHeight: number;
        scrollTop: number;
    };
    export default function FetchItems({ containerHeight, fetchMore, isAtEnd, isFetching, scrollHeight, scrollTop, }: Props): null;
}
declare module "Fieldset" {
    import type { Node } from "react";
    type Props = {
        children: Node;
        id?: string;
        errorMessage?: string;
        legend: string;
        legendDisplay?: "visible" | "hidden";
    };
    /**
     * https://gestalt.pinterest.systems/Fieldset
     */
    export default function Fieldset({ id, errorMessage, legend, legendDisplay, children, }: Props): Node;
}
declare module "fullWidthLayout" {
    import type { Cache } from "Cache";
    type Position = {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    const fullWidthLayout: <T>({ gutter, cache, minCols, idealColumnWidth, width, }: {
        gutter?: number;
        cache: Cache<T, number>;
        minCols?: number;
        idealColumnWidth?: number;
        width?: number | null | undefined;
    }) => ((items: ReadonlyArray<string>) => ReadonlyArray<Position>) | ((items: T[]) => readonly {
        height: number;
        left: number;
        top: number;
        width: number;
    }[]);
    export default fullWidthLayout;
}
declare module "keyboardNavigation" {
    export const KEYS: {
        UP: number;
        DOWN: number;
        ENTER: number;
    };
    export type DirectionOptionType = -1 | 0 | 1;
    type Props = {
        direction: DirectionOptionType;
        containerRef?: {
            current: HTMLElement | null | undefined;
        };
        currentHoveredOption: HTMLElement | null | undefined;
    };
    const handleContainerScrolling: ({ direction, containerRef, currentHoveredOption, }: Props) => void;
    export default handleContainerScrolling;
}
declare module "Letterbox" {
    import type { Node } from "react";
    type Props = {
        children?: Node;
        contentAspectRatio: number;
        height: number;
        width: number;
    };
    /**
     * https://gestalt.pinterest.systems/Letterbox
     */
    export default function Letterbox({ children, contentAspectRatio, height, width, }: Props): Node;
}
declare module "ScrollContainer" {
    /**
     * ScrollContainer is a pass-through component that simply sets up an onScroll
     * handler on the given scrollContainer element (or the element that is
     * returned as result of calling the scrollContainer method). This allows for
     * the event listener subscription of the scrollContainer to be managed inside
     * the React lifecycle without adding bloat to Masonry or other onScroll
     * subscribers.
     *
     * Note that this Component renders its children without creating any
     * additional content. Also note that, while the component is built to manage
     * onScroll inside of the React lifecycle, it doesn't change onScroll events
     * or the API at all, so it could easily be adapted to other event types.
     */
    import type { Node } from "react";
    import { Component } from "react";
    type Props = {
        children?: Node;
        onScroll: (event: Event) => void;
        scrollContainer: (HTMLElement | null | undefined) | (() => HTMLElement | null | undefined);
    };
    export default class ScrollContainer extends Component<Props> {
        scrollContainer: HTMLElement | null | undefined;
        componentDidMount(): void;
        componentDidUpdate(): void;
        componentWillUnmount(): void;
        getScrollContainerRef: () => HTMLElement | null | undefined;
        handleScroll: (event: Event) => void;
        updateScrollContainer(scrollContainer: HTMLElement): void;
        render(): Node;
    }
}
declare module "throttle" {
    /**
     * throttle limits the number of times a function can be called to a
     * given threshhold (100ms by default). The function is always called
     * on the leading and trailing edge.
     */
    export default function throttle(fn: (...args: any) => void, threshhold?: number): {
        (...args: any): void;
        clearTimeout(): void;
    };
}
declare module "MeasurementStore" {
    import type { Cache } from "Cache";
    export default class MeasurementStore<T extends {} | ReadonlyArray<unknown>, V> implements Cache<T, V> {
        map: WeakMap<T, V>;
        get(key: T): V | null | undefined;
        has(key: T): boolean;
        set(key: T, value: V): void;
        reset(): void;
    }
}
declare module "scrollUtils" {
    /**
     * Measuring scroll positions, element heights, etc is different between
     * different browsers and the window object vs other DOM nodes. These
     * utils abstract away these differences.
     */
    export function getElementHeight(element: HTMLElement): number;
    export function getWindowScrollPos(): number;
    export function getRelativeScrollTop(element: HTMLElement): number;
    export function getScrollHeight(element: HTMLElement): number;
    export function getScrollPos(element: HTMLElement): number;
}
declare module "uniformRowLayout" {
    import type { Cache } from "Cache";
    type Position = {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    const uniformRowLayout: <T>({ cache, columnWidth, gutter, width, minCols, }: {
        cache: Cache<T, number>;
        columnWidth?: number;
        gutter?: number;
        width?: number | null | undefined;
        minCols?: number;
    }) => (items: readonly T[]) => ReadonlyArray<Position>;
    export default uniformRowLayout;
}
declare module "Masonry" {
    import type { ComponentType, Node } from "react";
    import { Component as ReactComponent } from "react";
    import ScrollContainer from "ScrollContainer";
    import type { Cache } from "Cache";
    import MeasurementStore from "MeasurementStore";
    import LegacyMasonryLayout from "./layouts/MasonryLayout";
    import LegacyUniformRowLayout from "./layouts/UniformRowLayout";
    type Layout = LegacyMasonryLayout | LegacyUniformRowLayout | "default" | "basic" | "basicCentered" | "flexible" | "uniformRow";
    type Props<T> = {
        /**
         * The preferred/target item width. If `flexible` is set, the item width will
         * grow to fill column space, and shrink to fit if below min columns.
         */
        columnWidth?: number;
        /**
         * The component to render.
         */
        comp: ComponentType<{
            data: T;
            itemIdx: number;
            isMeasuring: boolean;
        }>;
        /**
         * The preferred/target item width. Item width will grow to fill
         * column space, and shrink to fit if below min columns.
         */
        flexible?: boolean;
        /**
         * The amount of space between each item.
         */
        gutterWidth?: number;
        /**
         * An array of all objects to display in the grid.
         */
        items: ReadonlyArray<T>;
        /**
         * Measurement Store
         */
        measurementStore?: Cache<T, any>;
        /**
         * Minimum number of columns to display.
         */
        minCols: number;
        /**
         * Layout system to use for items
         */
        layout?: Layout;
        /**
         * A callback which the grid calls when we need to load more items as the user scrolls.
         * The callback should update the state of the items, and pass those in as props
         * to this component.
         */
        loadItems?: false | ((arg0: {
            from: number;
        } | null | undefined) => void | boolean | any);
        /**
         * Function that the grid calls to get the scroll container.
         * This is required if the grid is expected to be scrollable.
         */
        scrollContainer?: () => HTMLElement;
        virtualBoundsTop?: number;
        virtualBoundsBottom?: number;
        /**
         * Whether or not to use actual virtualization
         */
        virtualize?: boolean;
    };
    type State<T> = {
        measurementStore: Cache<T, any>;
        hasPendingMeasurements: boolean;
        isFetching: boolean;
        items: ReadonlyArray<T>;
        scrollTop: number;
        width: number | null | undefined;
    };
    /**
     * https://gestalt.pinterest.systems/Masonry
     */
    export default class Masonry<T> extends ReactComponent<Props<T>, State<T>> {
        static createMeasurementStore<T1, T2>(): MeasurementStore<T1, T2>;
        /**
         * Delays resize handling in case the scroll container is still being resized.
         */
        handleResize: {
            (...args: any): void;
            clearTimeout(): void;
        };
        updateScrollPosition: {
            (...args: any): void;
            clearTimeout(): void;
        };
        measureContainerAsync: {
            (...args: any): void;
            clearTimeout(): void;
        };
        containerHeight: number;
        containerOffset: number;
        gridWrapper: HTMLElement | null | undefined;
        insertAnimationFrame: number;
        measureTimeout: number;
        scrollContainer: ScrollContainer | null | undefined;
        static defaultProps: {
            columnWidth?: number;
            layout?: Layout;
            loadItems?: false | ((arg0: {
                from: number;
            } | null | undefined) => void | boolean | any);
            minCols: number;
            virtualize?: boolean;
        };
        constructor(props: Props<T>);
        /**
         * Adds hooks after the component mounts.
         */
        componentDidMount(): void;
        componentDidUpdate(prevProps: Props<T>, prevState: State<T>): void;
        /**
         * Remove listeners when unmounting.
         */
        componentWillUnmount(): void;
        static getDerivedStateFromProps(props: Props, state: State): null | {
            hasPendingMeasurements: boolean;
            isFetching?: boolean;
            items: ReadonlyArray;
        };
        setGridWrapperRef: (ref: HTMLElement | null | undefined) => void;
        setScrollContainerRef: (ref: ScrollContainer | null | undefined) => void;
        fetchMore: () => void;
        measureContainer(): void;
        /**
         * Clear measurements/positions and force a reflow of the entire grid.
         * Only use this if absolutely necessary - ex: We need to reflow items if the
         * number of columns we would display should change after a resize.
         */
        reflow(): void;
        renderMasonryComponent: (itemData: T, idx: number, position: any) => Node;
        className: {
            [x: number]: any;
        };
        data: any;
    }
}
declare module "MasonryLayout" {
    export default class MasonryLayout {
    }
}
declare module "matchMedia" {
    export function addListener(mediaQuery: MediaQueryList, callback: MediaQueryList): void;
    export function removeListener(mediaQuery: MediaQueryList, callback: MediaQueryList): void;
}
declare module "ScrollBoundaryContainerWithForwardRef" {
    import type { Node, AbstractComponent } from "react";
    import type { Dimension, Padding } from "boxTypes";
    import "boxTypes";
    type ScrollBoundaryContainerOverflow = "scroll" | "scrollX" | "scrollY" | "auto";
    type InternalProps = {
        children?: Node;
        height?: Dimension;
        onScroll?: () => void;
        overflow?: ScrollBoundaryContainerOverflow;
        padding?: Padding;
    };
    const ScrollBoundaryContainerWithForwardRef: AbstractComponent<InternalProps, HTMLElement>;
    export default ScrollBoundaryContainerWithForwardRef;
}
declare module "Modal" {
    import type { Node } from "react";
    type Props = {
        /**
         * Temporary undocumented prop to disable ScrollBoundaryContainer.
         */
        _dangerouslyDisableScrollBoundaryContainer?: boolean;
        /**
         * String that clients such as VoiceOver will read to describe the modal. Always localize the label. See [Accessibility section](https://gestalt.pinterest.systems/modal#Accessibility) for more info.
         */
        accessibilityModalLabel: string;
        /**
         * Specify the alignment of `heading` & `subHeading` strings. See the [Heading variant](https://gestalt.pinterest.systems/modal#Heading) for more info.
         */
        align?: "start" | "center";
        /**
         * Supply the element(s) that will be used as Modal's main content. See the [Best Practices](https://gestalt.pinterest.systems/modal#Best-practices) for more info.
         */
        children?: Node;
        /**
         * Close the modal when you click outside of it. See the [outside click variant](https://gestalt.pinterest.systems/modal#Preventing-close-on-outside-click) for more info.
         */
        closeOnOutsideClick?: boolean;
        /**
         * Supply the element(s) that will be used as Modal's custom footer. See the [Best Practices](https://gestalt.pinterest.systems/modal#Best-practices) for more info.
         */
        footer?: Node;
        /**
         * The text used for Modal's heading. See the [Heading variant](https://gestalt.pinterest.systems/modal#Heading) for more info.
         */
        heading?: Node;
        /**
         * Callback fired when Modal is dismissed by clicking on the backdrop outside of the Modal (if `closeOnOutsideClick` is true).
         */
        onDismiss: () => void;
        /**
         * The underlying ARIA role for the Modal. See the [Accessibility Role section](https://gestalt.pinterest.systems/modal#Role) for more info.
         *
         * Default: 'dialog'
         */
        role?: "alertdialog" | "dialog";
        /**
         * Determines the width of the Modal. See the [size variant](https://gestalt.pinterest.systems/modal#Sizes) for more info.
         *
         * sm: `540px` | md: `720px` | lg: `900px` | number
         *
         * Default: 'sm'
         */
        size?: "sm" | "md" | "lg" | number;
        /**
         * Subtext for Modal, only renders with `heading` strings. See the [sub-heading variant](https://gestalt.pinterest.systems/modal#Sub-heading) for more info.
         */
        subHeading?: string;
    };
    /**
     * A [Modal](https://gestalt.pinterest.systems/modal) displays content that requires user interaction. Modals appear on a layer above the page and therefore block the content underneath, preventing users from interacting with anything else besides the Modal. The most common example of Modal is confirming an action the user has taken.
     */
    export default function Modal({ _dangerouslyDisableScrollBoundaryContainer, accessibilityModalLabel, align, children, closeOnOutsideClick, onDismiss, footer, heading, role, size, subHeading, }: Props): Node;
}
declare module "moduleTypes" {
    import { $Keys } from "utility-types";
    import type { Element, Node } from "react";
    import icons from "./icons/index";
    import IconButton from "IconButton";
    export type TypeOptions = "error" | "info";
    type BaseBadgeProps = {
        badgeText?: string;
    };
    type BaseIconProps = {
        icon?: $Keys<typeof icons>;
    };
    type BaseIconButtonProps = {
        iconButton?: Element<typeof IconButton>;
    };
    type BaseMutuallyExclusiveProps = BaseBadgeProps | BaseIconProps | BaseIconButtonProps;
    type BaseCombinedProps = BaseBadgeProps & BaseIconProps & BaseIconButtonProps;
    type BaseModuleTitleProps = {
        iconAccessibilityLabel?: string;
        title: string;
        type?: TypeOptions;
    };
    export type ModuleTitleProps = BaseModuleTitleProps & BaseCombinedProps;
    type BaseModuleProps = BaseModuleTitleProps & {
        children?: Node;
        id: string;
        title?: string;
    };
    export type PublicModuleProps = BaseModuleProps & BaseMutuallyExclusiveProps;
    type BaseModuleExpandableItemProps = BaseModuleTitleProps & {
        children?: Node;
        summary?: ReadonlyArray<string>;
    };
    export type PublicModuleExpandableItemProps = BaseModuleExpandableItemProps & BaseMutuallyExclusiveProps;
    export type ModuleExpandableItemProps = BaseModuleExpandableItemProps & BaseCombinedProps & {
        accessibilityCollapseLabel: string;
        accessibilityExpandLabel: string;
        id: string;
        isCollapsed: boolean;
        onModuleClicked: (arg0: boolean) => void;
    };
    export type PublicModuleExpandableProps = {
        accessibilityCollapseLabel: string;
        accessibilityExpandLabel: string;
        expandedIndex?: number | null | undefined;
        id: string;
        items: ReadonlyArray<PublicModuleExpandableItemProps>;
        onExpandedChange?: (arg0: number | null | undefined) => void;
    };
}
declare module "ModuleTitle" {
    import type { Node } from "react";
    import type { ModuleTitleProps } from "moduleTypes";
    /**
     * https://gestalt.pinterest.systems/Module
     */
    export default function ModuleTitle(props: ModuleTitleProps): Node;
}
declare module "ModuleExpandableItem" {
    import type { Node } from "react";
    import type { ModuleExpandableItemProps } from "moduleTypes";
    /**
     * https://gestalt.pinterest.systems/Module
     */
    export default function ModuleExpandableItem({ accessibilityCollapseLabel, accessibilityExpandLabel, children, iconAccessibilityLabel, id, isCollapsed, onModuleClicked, summary, title, type, ...props }: ModuleExpandableItemProps): Node;
}
declare module "ModuleExpandable" {
    import type { Node } from "react";
    import type { PublicModuleExpandableProps } from "moduleTypes";
    /**
     * https://gestalt.pinterest.systems/Module
     */
    export default function ModuleExpandable({ accessibilityExpandLabel, accessibilityCollapseLabel, expandedIndex, id, items, onExpandedChange, }: PublicModuleExpandableProps): Node;
}
declare module "Module" {
    import type { Node } from "react";
    import ModuleExpandable from "ModuleExpandable";
    import type { PublicModuleProps } from "moduleTypes";
    /**
     * https://gestalt.pinterest.systems/Module
     */
    declare function Module({ children, iconAccessibilityLabel, id, title, type, ...props }: PublicModuleProps): Node;
    declare namespace Module {
        var Expandable: typeof ModuleExpandable;
    }
    export default Module;
}
declare module "omit" {
    const omit: (keys: ReadonlyArray<string>, obj: Record<string, any>) => Record<string, any>;
    export default omit;
}
declare module "OnLinkNavigation" {
    import type { Node } from "react";
    type EventHandlerType = (arg0: {
        readonly event: React.SyntheticEvent;
    }) => void;
    type OnLinkNavigationArgs = {
        href: string;
        target?: null | "self" | "blank";
    };
    export type OnLinkNavigationType = (arg0: OnLinkNavigationArgs) => EventHandlerType | null | undefined;
    type Props = {
        children: Node;
        onNavigation: OnLinkNavigationType;
    };
    /**
     * https://gestalt.pinterest.systems/OnLinkNavigationProvider
     */
    export default function OnLinkNavigationProvider({ onNavigation, children, }: Props): Node;
    export function useOnLinkNavigation({ href, target, }: OnLinkNavigationArgs): EventHandlerType | null | undefined;
}
declare module "OutsideEventBehavior" {
    import type { Node as ReactNode } from "react";
    type Props = {
        children: ReactNode;
        onClick?: (event: MouseEvent) => void;
    };
    export default function OutsideEventBehavior({ children, onClick, }: Props): ReactNode;
}
declare module "PageHeader" {
    import type { Node, Element } from "react";
    import Button from "Button";
    import IconButton from "IconButton";
    import Link from "Link";
    import Tooltip from "Tooltip";
    import type { Dimension } from "boxTypes";
    import "boxTypes";
    type Props = {
        title: string;
        maxWidth?: Dimension;
        primaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>;
        secondaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>;
        subtext?: string;
    };
    /**
     * https://gestalt.pinterest.systems/PageHeader
     */
    export default function PageHeader({ maxWidth, primaryAction, secondaryAction, subtext, title, }: Props): Node;
}
declare module "positioningTypes" {
    export type MainDirections = "up" | "right" | "down" | "left";
    export type PopoverDir = MainDirections | null | undefined;
    export type CaretDir = MainDirections | "middle";
    export type Coordinates = {
        x: number;
        y: number;
    };
    export type Dimensions = {
        height: number;
        width: number;
    };
    export type ClientRect = Dimensions & {
        bottom: number;
        left: number;
        right: number;
        top: number;
    };
    export type Window = Dimensions & {
        scrollY: number;
        scrollX: number;
    };
    export type EdgeShift = {
        caret: Coordinates;
        popover: Coordinates;
    };
    export type Offset = {
        left: number;
        top: number;
    };
    export type CaretOffset = {
        left: null | number;
        top: null | number;
        bottom: null | number;
        right: null | number;
    };
    export type DerivedState = {
        caretOffset: CaretOffset;
        popoverOffset: Offset;
        popoverDir: MainDirections;
    };
}
declare module "positioningUtils" {
    import type { CaretDir, CaretOffset, ClientRect, Coordinates, Dimensions, EdgeShift, PopoverDir, MainDirections, Window, Offset } from "positioningTypes";
    export const CARET_HEIGHT = 4;
    export const BORDER_RADIUS = 8;
    export const CARET_WIDTH = 12;
    export const getContainerNode: ({ scrollBoundaryContainerRef, initialPositionRef, }: {
        scrollBoundaryContainerRef: HTMLElement | null | undefined;
        initialPositionRef: HTMLElement | null | undefined;
    }) => HTMLElement | null | undefined;
    /**
     * Controller
     */
    export const getTriggerRect: ({ anchor, positionRelativeToAnchor, scrollBoundaryContainerRef, }: {
        anchor: HTMLElement;
        positionRelativeToAnchor: boolean;
        scrollBoundaryContainerRef: HTMLElement | null | undefined;
    }) => any;
    /**
     * Determines the main direction the popover opens
     */
    export function getPopoverDir({ popoverSize, idealDirection, triggerRect, windowSize, isScrollBoundaryContainer, }: {
        popoverSize: Dimensions;
        idealDirection: PopoverDir;
        triggerRect: ClientRect;
        windowSize: Window;
        isScrollBoundaryContainer?: boolean;
    }): MainDirections;
    /**
     * Determines the sub direction of how the popover is positioned within the main dir
     */
    export function getCaretDir({ popoverSize, popoverDir, triggerRect, windowSize, }: {
        popoverSize: Dimensions;
        popoverDir: PopoverDir;
        triggerRect: ClientRect;
        windowSize: Window;
    }): CaretDir;
    /**
     * Calculates the amount the popover & caret need to shift over to align with designs
     */
    export function calcEdgeShifts({ triggerRect, windowSize, isScrollBoundaryContainer, }: {
        triggerRect: ClientRect;
        windowSize: Window;
        isScrollBoundaryContainer: boolean;
    }): {
        caret: Coordinates;
        popover: Coordinates;
    };
    /**
     * Calculates popover and caret offsets for styling
     */
    export function adjustOffsets({ base, edgeShift, popoverSize, popoverDir, caretDir, triggerRect, isScrollBoundaryContainer, }: {
        base: {
            top: number;
            left: number;
        };
        edgeShift: EdgeShift;
        popoverSize: Dimensions;
        popoverDir: PopoverDir;
        caretDir: CaretDir;
        triggerRect: ClientRect;
        isScrollBoundaryContainer: boolean;
    }): {
        caretOffset: CaretOffset;
        popoverOffset: Offset;
    };
    export function baseOffsets({ hasCaret, relativeOffset, popoverSize, popoverDir, triggerRect, windowSize, }: {
        hasCaret: boolean;
        relativeOffset: Coordinates;
        popoverSize: Dimensions;
        popoverDir: PopoverDir;
        triggerRect: ClientRect;
        windowSize: Window;
    }): Offset;
}
declare module "Pulsar" {
    import type { Node } from "react";
    type Props = {
        paused?: boolean;
        size?: number;
    };
    /**
     * https://gestalt.pinterest.systems/Pulsar
     */
    export default function Pulsar({ paused, size }: Props): Node;
}
declare module "RadioButton" {
    import type { Node, AbstractComponent } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        checked?: boolean;
        disabled?: boolean;
        id: string;
        image?: Node;
        label?: string;
        name?: string;
        onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, {
            checked: boolean;
        }>;
        subtext?: string;
        value: string;
        size?: "sm" | "md";
    };
    /**
     * https://gestalt.pinterest.systems/RadioButton
     */
    const RadioButtonWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default RadioButtonWithForwardRef;
}
declare module "ScrollBoundaryContainer" {
    /**
     * ScrollBoundaryContainer is an optional wrapper component that ensures that anchor-based
     * components such as Popover, Tooltip, Dropdown, and Typeahead, are  correctly positioned inside
     * scrolling containers.
     *
     * Note that this component requires ScrollBoundaryContainerProvider to store in context a node ref that
     * can be accessed by children components (Layer, Controller, and Contents) via getContainerNode() in * utils/positioningUtils.js
     *
     * By building ScrollBoundaryContainerProviders into ScrollBoundaryContainer, we override parent
     * ScrollBoundaryContainerProviders so that each context only has one ScrollBoundaryContainer.
     */
    import type { Node } from "react";
    type ScrollBoundaryContainerOverflow = "scroll" | "scrollX" | "scrollY" | "auto";
    type Props = {
        children: Node;
        /**
         * Use numbers for pixels: height={100} and strings for percentages: height="100%".
         *
         * Overflow property only works for elements with a specified height, however, it is not required if the parent component sets the height.
         *
         * Link: https://gestalt.pinterest.systems/text#align
         */
        height?: number | string;
        overflow?: ScrollBoundaryContainerOverflow;
    };
    /**
     * [ScrollBoundaryContainer](https://gestalt.pinterest.systems/ScrollBoundaryContainer) is used with anchored components such as Popover, Tooltip, Dropdown or Typeahead. A ScrollBoundaryContainer is needed for proper positioning when the Tooltip is anchored to an element that is located within a scrolling container. The use of ScrollBoundaryContainer ensures the Tooltip remains attached to its anchor when scrolling.
     */
    const ScrollBoundaryContainerWithProvider: {
        ({ children, height, overflow, }: Props): any;
        displayName: string;
    };
    export default ScrollBoundaryContainerWithProvider;
}
declare module "ScrollFetch" {
    import type { Node } from "react";
    import { PureComponent } from "react";
    type Props = {
        /**
         * The scroll container to use. Defaults to window.
         */
        container?: HTMLElement;
        isAtEnd?: boolean;
        isFetching: boolean;
        fetchMore?: () => void;
        renderHeight?: () => number;
    };
    type State = {
        containerHeight: number;
        scrollHeight: number;
        scrollTop: number;
    };
    export default class ScrollFetch extends PureComponent<Props, State> {
        /**
         * Fetches additional items if needed.
         */
        updatePosition: {
            (...args: any): void;
            clearTimeout(): void;
        };
        static defaultProps: {
            container?: HTMLElement;
        };
        state: State;
        /**
         * Adds scroll listener after the component mounts.
         */
        componentDidMount(): void;
        /**
         * Update scroll buffer and check after the component updates.
         */
        componentDidUpdate(): void;
        /**
         * Returns the scrollable content height.
         */
        getScrollHeight: () => number;
        getScrollState(): null | {
            scrollHeight: number;
            scrollTop: number;
        };
        render(): null | Node;
    }
}
declare module "SearchField" {
    import type { AbstractComponent } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type UnionRefs = HTMLDivElement | HTMLAnchorElement;
    type Props = {
        /**
         * String that clients such as VoiceOver will read to describe the element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/searchfield#Accessibility) for more info.
         */
        accessibilityLabel: string;
        /**
         * String that clients such as VoiceOver will read to describe the clear button element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/searchfield#Accessibility) for more info.
         */
        accessibilityClearButtonLabel?: string;
        /**
         * The type of autocomplete used, if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for more info.
         */
        autoComplete?: "on" | "off" | "username" | "name";
        /**
         * Error text displayed below the input field.
         */
        errorMessage?: string;
        /**
         * Must be unique!
         */
        id: string;
        /**
         * Text used to label the input. Be sure to localize the text. See the [Visible label variant](https://gestalt.pinterest.systems/searchfield#Visible-label) for more info.
         */
        label?: string;
        /**
         *
         */
        onBlur?: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>>;
        /**
         * Primary callback to handle keyboard input.
         */
        onChange: (arg0: {
            value: string;
            syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
        }) => void;
        /**
         *
         */
        onFocus?: (arg0: {
            value: string;
            syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
        }) => void;
        /**
         * Secondary callback for keyboard events. Possible uses include validation, form submission, etc.
         */
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        /**
         * Text displayed before the user has entered anything.
         */
        placeholder?: string;
        /**
         * Ref that is forwarded to the underlying input element.
         */
        ref?: UnionRefs;
        /**
         * md: 40px, lg: 48px
         */
        size?: "md" | "lg";
        /**
         * The current value of the input.
         */
        value?: string;
    };
    /**
     * [SearchField](https://gestalt.pinterest.systems/SearchField) allows users to search for free-form content.
     */
    const SearchFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default SearchFieldWithForwardRef;
}
declare module "SegmentedControl" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type OnChange = AbstractEventHandler<React.MouseEvent<HTMLButtonElement>, {
        activeIndex: number;
    }>;
    type Props = {
        items: ReadonlyArray<Node>;
        onChange: OnChange;
        responsive?: boolean;
        selectedItemIndex: number;
        size?: "md" | "lg";
    };
    /**
     * https://gestalt.pinterest.systems/SegmentedControl
     */
    export default function SegmentedControl({ items, onChange, responsive, selectedItemIndex, size, }: Props): Node;
}
declare module "SelectList" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        /**
         * Used to disable the entire SelectList.
         */
        disabled?: boolean;
        /**
         * Used to communicate error information to the user. Be sure to localize the text. See the [error message](https://gestalt.pinterest.systems/selectlist#Error-message) variant to learn more.
         */
        errorMessage?: string;
        /**
         * Used to provide more information about the form field. Be sure to localize the text. See the [helper text](https://gestalt.pinterest.systems/selectlist#Helper-text) variant to learn more.
         */
        helperText?: string;
        /**
         * A unique identifier to connect the underlying `<select>` with the associated label.
         */
        id: string;
        /**
         * The label shown above the input. Be sure to localize the label.
         */
        label?: string;
        /**
         * Used to specify the name of the control.
         */
        name?: string;
        /**
         * Callback triggered when the user selects a new option.  See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
         */
        onChange: AbstractEventHandler<React.SyntheticEvent<HTMLSelectElement>, {
            value: string;
        }>;
        /**
         * The options displayed in the dropdown list. Note that ``disabled`` here is used to disable a single option. Be sure to localize the label.
         */
        options: ReadonlyArray<{
            label: string;
            value: string;
            disabled?: boolean;
        }>;
        /**
         * If not provided, the first item in the list will be shown. Be sure to localize the text. See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
         */
        placeholder?: string;
        /**
         * md: 40px, lg: 48px. See the [size](https://gestalt.pinterest.systems/selectlist#Size) variant to learn more.
         */
        size?: "md" | "lg";
        /**
         * The currently-selected value. See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
         */
        value?: string | null | undefined;
    };
    /**
     * https://gestalt.pinterest.systems/SelectList
     */
    export default function SelectList({ disabled, errorMessage, helperText, id, label, name, onChange, options, placeholder, size, value, }: Props): Node;
}
declare module "Sheet" {
    import type { Node } from "react";
    type Size = "sm" | "md" | "lg";
    type OnAnimationEndStateType = "in" | "out";
    type SheetMainProps = {
        accessibilityDismissButtonLabel: string;
        accessibilitySheetLabel: string;
        children: Node;
        closeOnOutsideClick?: boolean;
        footer?: Node;
        onAnimationEnd?: (arg0: {
            animationState: OnAnimationEndStateType;
        }) => void;
        onDismiss: () => void;
        size?: Size;
    };
    type NodeOrRenderProp = Node | ((arg0: {
        onDismissStart: () => void;
    }) => Node);
    type AnimatedSheetMainProps = SheetMainProps & {
        children: NodeOrRenderProp;
        footer?: NodeOrRenderProp;
    };
    type AnimatedSheetWithHeadingProps = AnimatedSheetMainProps & {
        heading: string;
        subHeading?: NodeOrRenderProp;
    };
    type AnimatedSheetProps = AnimatedSheetMainProps | AnimatedSheetWithHeadingProps;
    /**
     * <AnimatedSheet> component: adds animation capabilities
     */
    /**
     * https://gestalt.pinterest.systems/Sheet
     */
    export default function AnimatedSheet(props: AnimatedSheetProps): Node;
}
declare module "Spinner" {
    import type { Node } from "react";
    type Props = {
        accessibilityLabel: string;
        delay?: boolean;
        show: boolean;
        size?: "sm" | "md";
    };
    /**
     * https://gestalt.pinterest.systems/Spinner
     */
    export default function Spinner({ accessibilityLabel, delay, show, size, }: Props): Node;
}
declare module "Status" {
    import type { Node } from "react";
    import "react";
    type StatusType = "unstarted" | "inProgress" | "halted" | "ok" | "problem" | "canceled" | "warning";
    type Props = {
        /**
         * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/status#Localization) the label.
         */
        accessibilityLabel?: string;
        /**
         * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/status#Localization) to learn more.
         */
        subtext?: string;
        /**
         * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/status#Localization) to learn more.
         */
        title?: string;
        /**
         * The type of status to display.
         */
        type: StatusType;
    };
    /**
     * https://gestalt.pinterest.systems/Status
     */
    export default function Status({ accessibilityLabel, subtext, title, type, }: Props): Node;
}
declare module "Sticky" {
    import type { Node } from "react";
    import type { Indexable } from "zIndex";
    type PositionType = number | string;
    type Threshold = {
        top: PositionType;
    } | {
        bottom: PositionType;
    } | {
        left: PositionType;
    } | {
        right: PositionType;
    } | {
        top: PositionType;
        bottom: PositionType;
    } | {
        left: PositionType;
        right: PositionType;
    } | {
        top: PositionType;
        left: PositionType;
        right: PositionType;
        bottom: PositionType;
    };
    type Props = Threshold & {
        children: Node;
        height?: number;
        zIndex?: Indexable;
    };
    export default function Sticky(props: Props): Node;
}
declare module "StopScrollBehavior" {
    import type { Node } from "react";
    import { Component } from "react";
    type Props = {
        children: Node;
    };
    export default class NoScrollBehavior extends Component<Props> {
        prevOverflow: string | null;
        constructor(props: Props);
        componentDidMount(): void;
        componentWillUnmount(): void;
        render(): Node;
    }
}
declare module "Switch" {
    import type { Node } from "react";
    type Props = {
        disabled?: boolean;
        id: string;
        name?: string;
        onChange: (arg0: {
            event: React.SyntheticEvent;
            value: boolean;
        }) => void;
        switched?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Switch
     */
    export default function Switch({ disabled, id, name, onChange, switched, }: Props): Node;
}
declare module "TableCell" {
    import type { Node } from "react";
    type Props = {
        children: Node;
        colSpan?: number;
        rowSpan?: number;
        shouldBeSticky?: boolean;
        shouldHaveShadow?: boolean;
        previousTotalWidth?: number;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableCell(props: Props): Node;
}
declare module "TableBody" {
    import type { Node } from "react";
    type Props = {
        children: Node;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableBody(props: Props): Node;
}
declare module "TableFooter" {
    import type { Node } from "react";
    type Props = {
        children: Node;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableFooter(props: Props): Node;
}
declare module "TableHeader" {
    import type { Node } from "react";
    type Props = {
        children: Node;
        sticky?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableHeader(props: Props): Node;
}
declare module "TableHeaderCell" {
    import type { Node } from "react";
    type Props = {
        children: Node;
        shouldBeSticky?: boolean;
        shouldHaveShadow?: boolean;
        colSpan?: number;
        rowSpan?: number;
        scope?: "col" | "colgroup" | "row" | "rowgroup";
        previousTotalWidth?: number;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableHeaderCell(props: Props): Node;
}
declare module "TableRowExpandable" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        accessibilityExpandLabel: string;
        accessibilityCollapseLabel: string;
        children: Node;
        expandedContents: Node;
        onExpand?: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            expanded: boolean;
        }>;
        hoverStyle?: "gray" | "none";
        id: string;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableRowExpandable(props: Props): Node;
}
declare module "TableRow" {
    import type { Node } from "react";
    type Props = {
        children: Node;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableRow(props: Props): Node;
}
declare module "TableSortableHeaderCell" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        children: Node;
        colSpan?: number;
        onSortChange: AbstractEventHandler<React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>, {
            dangerouslyDisableOnNavigation: () => void;
        }>;
        previousTotalWidth?: number;
        rowSpan?: number;
        scope?: "col" | "colgroup" | "row" | "rowgroup";
        shouldBeSticky?: boolean;
        shouldHaveShadow?: boolean;
        sortOrder: "asc" | "desc";
        status: "active" | "inactive";
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    export default function TableSortableHeaderCell(props: Props): Node;
}
declare module "Table" {
    import type { Node } from "react";
    import TableCell from "TableCell";
    import TableBody from "TableBody";
    import TableFooter from "TableFooter";
    import TableHeader from "TableHeader";
    import TableHeaderCell from "TableHeaderCell";
    import TableRowExpandable from "TableRowExpandable";
    import TableRow from "TableRow";
    import TableSortableHeaderCell from "TableSortableHeaderCell";
    type Props = {
        children: Node;
        accessibilityLabel: string;
        borderStyle?: "sm" | "none";
        maxHeight?: number | string;
        stickyColumns?: number | null | undefined;
    };
    /**
     * https://gestalt.pinterest.systems/Table
     */
    declare function Table(props: Props): Node;
    declare namespace Table {
        var Body: typeof TableBody;
        var Cell: typeof TableCell;
        var Footer: typeof TableFooter;
        var Header: typeof TableHeader;
        var HeaderCell: typeof TableHeaderCell;
        var Row: typeof TableRow;
        var SortableHeaderCell: typeof TableSortableHeaderCell;
        var RowExpandable: typeof TableRowExpandable;
    }
    export default Table;
}
declare module "TableContext" {
    import type { Node } from "react";
    type TableContextType = {
        stickyColumns: number | null | undefined;
    };
    type Props = {
        children: Node;
        stickyColumns: number | null | undefined;
    };
    function TableContextProvider({ children, stickyColumns }: Props): Node;
    function useTableContext(): TableContextType;
    export { TableContextProvider, useTableContext };
}
declare module "Tabs" {
    import type { AbstractComponent, Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type OnChangeHandler = AbstractEventHandler<React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>, {
        readonly activeTabIndex: number;
        dangerouslyDisableOnNavigation: () => void;
    }>;
    type TabType = {
        href: string;
        id?: string;
        indicator?: "dot" | number;
        text: Node;
    };
    type BgColor = "default" | "transparent";
    type TabProps = TabType & {
        bgColor: BgColor;
        index: number;
        isActive: boolean;
        onChange: OnChangeHandler;
    };
    export const TabWithForwardRef: AbstractComponent<TabProps, HTMLElement>;
    type Props = {
        activeTabIndex: number;
        bgColor?: BgColor;
        onChange: OnChangeHandler;
        tabs: ReadonlyArray<TabType & {
            ref?: {
                current: HTMLElement | null | undefined;
            };
        }>;
        wrap?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Tabs
     */
    export default function Tabs({ activeTabIndex, bgColor, onChange, tabs, wrap, }: Props): Node;
}
declare module "TextArea" {
    import type { Element, Node, AbstractComponent } from "react";
    import Tag from "Tag";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        disabled?: boolean;
        errorMessage?: Node;
        hasError?: boolean;
        helperText?: string;
        id: string;
        label?: string;
        name?: string;
        onBlur?: AbstractEventHandler<React.FocusEvent<HTMLTextAreaElement>, {
            value: string;
        }>;
        onChange: AbstractEventHandler<React.SyntheticEvent<HTMLTextAreaElement>, {
            value: string;
        }>;
        onFocus?: AbstractEventHandler<React.FocusEvent<HTMLTextAreaElement>, {
            value: string;
        }>;
        onKeyDown?: AbstractEventHandler<React.KeyboardEvent<HTMLTextAreaElement>, {
            value: string;
        }>;
        placeholder?: string;
        rows?: number;
        tags?: ReadonlyArray<Element<typeof Tag>>;
        value?: string;
    };
    /**
     * https://gestalt.pinterest.systems/TextArea
     */
    const TextAreaWithForwardRef: AbstractComponent<Props, HTMLTextAreaElement>;
    export default TextAreaWithForwardRef;
}
declare module "TextField" {
    import type { Element, Node, AbstractComponent } from "react";
    import Tag from "Tag";
    type Props = {
        autoComplete?: "current-password" | "new-password" | "on" | "off" | "username" | "email";
        disabled?: boolean;
        errorMessage?: Node;
        hasError?: boolean;
        helperText?: string;
        id: string;
        label?: string;
        name?: string;
        onBlur?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onChange: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onFocus?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        placeholder?: string;
        tags?: ReadonlyArray<Element<typeof Tag>>;
        type?: "date" | "email" | "number" | "password" | "text" | "url";
        size?: "md" | "lg";
        value?: string;
    };
    /**
     * https://gestalt.pinterest.systems/TextField
     */
    const TextFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default TextFieldWithForwardRef;
}
declare module "Toast" {
    import type { Element, Node } from "react";
    type Props = {
        button?: Node;
        text: string | Element<any>;
        thumbnail?: Node;
        thumbnailShape?: "circle" | "rectangle" | "square";
        variant?: "default" | "error";
        _dangerouslyUseDarkGray?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Toast
     */
    export default function Toast({ button, text, thumbnail, thumbnailShape, variant, _dangerouslyUseDarkGray, }: Props): Node;
}
declare module "TrapFocusBehavior" {
    import type { Node as ReactNode } from "react";
    import { Component } from "react";
    type Props = {
        children?: ReactNode;
    };
    export default class TrapFocusBehavior extends Component<Props> {
        el: HTMLDivElement | null | undefined;
        previouslyFocusedEl: HTMLElement | null | undefined;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setElRef: (el: HTMLDivElement | null | undefined) => void;
        handleFocus: (event: FocusEvent) => void;
        focusFirstChild(): void;
        render(): ReactNode;
    }
}
declare module "TypeaheadInputField" {
    import type { Element, Ref, AbstractComponent } from "react";
    import Tag from "Tag";
    import type { DirectionOptionType } from "./utils/keyboardNavigation";
    import "./utils/keyboardNavigation";
    type Props = {
        forwardedRef?: Ref<"input">;
        id: string;
        label?: string;
        onBlur: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
        }) => void;
        onChange: (arg0: {
            value: string;
            event: React.SyntheticEvent<HTMLInputElement>;
        }) => void;
        onClear: () => void;
        onFocus: (arg0: {
            value: string;
            event: React.FocusEvent<HTMLInputElement>;
        }) => void;
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onKeyNavigation: (arg0: React.KeyboardEvent<HTMLInputElement>, arg1: DirectionOptionType) => void;
        placeholder?: string;
        setContainer: (arg0: boolean) => void;
        size?: "md" | "lg";
        tags?: ReadonlyArray<Element<typeof Tag>>;
        value?: string;
    };
    const TypeaheadInputFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default TypeaheadInputFieldWithForwardRef;
}
declare module "Typeahead" {
    import type { Element, AbstractComponent } from "react";
    import type { OptionItemType } from "OptionItem";
    import Tag from "Tag";
    import type { Indexable } from "zIndex";
    import "zIndex";
    type Props = {
        id: string;
        label?: string;
        noResultText: string;
        onBlur?: (arg0: {
            event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onChange?: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onFocus?: (arg0: {
            event: React.FocusEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onKeyDown?: (arg0: {
            event: React.KeyboardEvent<HTMLInputElement>;
            value: string;
        }) => void;
        onSelect?: (arg0: {
            event: React.SyntheticEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>;
            item: OptionItemType | null | undefined;
        }) => void;
        options: ReadonlyArray<OptionItemType>;
        placeholder?: string;
        size?: "md" | "lg";
        tags?: ReadonlyArray<Element<typeof Tag>>;
        value?: string;
        zIndex?: Indexable;
    };
    /**
     * https://gestalt.pinterest.systems/Typeahead
     */
    const TypeaheadWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
    export default TypeaheadWithForwardRef;
}
declare module "UpsellForm" {
    import type { Node } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Props = {
        children: Node;
        onSubmit: AbstractEventHandler<React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>>;
        submitButtonText: string;
        submitButtonAccessibilityLabel: string;
        submitButtonDisabled?: boolean;
    };
    /**
     * https://gestalt.pinterest.systems/Upsell
     */
    export default function UpsellForm({ children, onSubmit, submitButtonText, submitButtonAccessibilityLabel, submitButtonDisabled, }: Props): Node;
}
declare module "Upsell" {
    import type { Element, Node } from "react";
    import Icon from "Icon";
    import Image from "Image";
    import UpsellForm from "UpsellForm";
    import type { ActionDataType, DismissButtonType } from "commonTypes";
    import "commonTypes";
    type Props = {
        children?: Element<typeof UpsellForm>;
        dismissButton?: DismissButtonType;
        imageData?: {
            component: Element<typeof Image | typeof Icon>;
            mask?: {
                rounding?: "circle" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
                wash?: boolean;
            };
            width?: number;
        };
        message: string;
        primaryAction?: ActionDataType;
        secondaryAction?: ActionDataType;
        title?: string;
    };
    /**
     * https://gestalt.pinterest.systems/Upsell
     */
    declare function Upsell({ children, dismissButton, imageData, message, primaryAction, secondaryAction, title, }: Props): Node;
    declare namespace Upsell {
        var Form: typeof UpsellForm;
    }
    export default Upsell;
}
declare module "VideoPlayhead" {
    import type { Node } from "react";
    import { PureComponent } from "react";
    type Props = {
        currentTime: number;
        duration: number;
        onPlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void;
        onPlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void;
        seek: (time: number) => void;
    };
    type State = {
        seeking: boolean;
    };
    export default class VideoPlayhead extends PureComponent<Props, State> {
        playhead: HTMLDivElement | null | undefined;
        state: State;
        setPlayheadRef: (ref: HTMLDivElement | null | undefined) => void;
        seek: (clientX: number) => void;
        stopClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
        handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
        handleMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
        handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
        handleMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void;
        render(): Node;
    }
}
declare module "VideoControls" {
    import type { Node } from "react";
    type Props = {
        accessibilityHideCaptionsLabel: string;
        accessibilityShowCaptionsLabel: string;
        accessibilityMaximizeLabel: string;
        accessibilityMinimizeLabel: string;
        accessibilityMuteLabel: string;
        accessibilityPauseLabel: string;
        accessibilityPlayLabel: string;
        accessibilityUnmuteLabel: string;
        captionsButton: "enabled" | "disabled" | null;
        currentTime: number;
        duration: number;
        fullscreen: boolean;
        onCaptionsChange: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        onFullscreenChange: () => void;
        onPause: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        onPlay: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        onPlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void;
        onPlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void;
        onVolumeChange: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        playing: boolean;
        seek: (time: number) => void;
        volume: number;
    };
    function VideoControls({ accessibilityHideCaptionsLabel, accessibilityShowCaptionsLabel, accessibilityMaximizeLabel, accessibilityMinimizeLabel, accessibilityMuteLabel, accessibilityPauseLabel, accessibilityPlayLabel, accessibilityUnmuteLabel, captionsButton, currentTime, duration, fullscreen, onCaptionsChange, onFullscreenChange, onPause, onPlay, onPlayheadDown, onPlayheadUp, onVolumeChange, playing, seek, volume, }: Props): Node;
    export default VideoControls;
}
declare module "Video" {
    import type { Node } from "react";
    import { PureComponent } from "react";
    import type { AbstractEventHandler } from "AbstractEventHandler";
    import "AbstractEventHandler";
    type Source = string | ReadonlyArray<{
        type: "video/m3u8" | "video/mp4" | "video/ogg";
        src: string;
    }>;
    type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down";
    type CrossOrigin = "anonymous" | "use-credentials";
    type BackgroundColor = "black" | "transparent";
    type Props = {
        accessibilityHideCaptionsLabel?: string;
        accessibilityShowCaptionsLabel?: string;
        accessibilityMaximizeLabel: string;
        accessibilityMinimizeLabel: string;
        accessibilityMuteLabel: string;
        accessibilityPauseLabel: string;
        accessibilityPlayLabel: string;
        accessibilityUnmuteLabel: string;
        aspectRatio: number;
        backgroundColor: BackgroundColor;
        captions: string;
        crossOrigin?: CrossOrigin;
        children?: Node;
        controls?: boolean;
        disableRemotePlayback?: boolean;
        loop?: boolean;
        objectFit?: ObjectFit;
        onDurationChange?: (arg0: {
            event: React.SyntheticEvent<HTMLVideoElement>;
            duration: number;
        }) => void;
        onEnded?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onError?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onFullscreenChange?: AbstractEventHandler<Event, {
            fullscreen: boolean;
        }>;
        onLoadedChange?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, {
            loaded: number;
        }>;
        onLoadStart?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onPlay?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>>;
        onPlaying?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onPlayheadDown?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
        onPlayheadUp?: AbstractEventHandler<React.MouseEvent<HTMLDivElement>>;
        onPause?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>>;
        onReady?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onSeek?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onSeeking?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onStalled?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        onTimeChange?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>, {
            time: number;
        }>;
        onVolumeChange?: AbstractEventHandler<React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>, {
            volume: number;
        }>;
        onWaiting?: AbstractEventHandler<React.SyntheticEvent<HTMLVideoElement>>;
        playbackRate: number;
        playing: boolean;
        playsInline?: boolean;
        poster?: string;
        preload: "auto" | "metadata" | "none";
        src: Source;
        volume: number;
    };
    type State = {
        currentTime: number;
        duration: number;
        fullscreen: boolean;
        captionsButton: "enabled" | "disabled" | null;
    };
    /**
     * https://gestalt.pinterest.systems/Video
     */
    export default class Video extends PureComponent<Props, State> {
        video: HTMLVideoElement | null | undefined;
        player: HTMLDivElement | null | undefined;
        static defaultProps: {
            disableRemotePlayback: boolean;
            backgroundColor: BackgroundColor;
            playbackRate: number;
            playing: boolean;
            preload: "auto" | "metadata" | "none";
            volume: number;
        };
        state: State;
        /**
         * React lifecycle hooks pertinent to Video
         */
        componentDidMount(): void;
        componentDidUpdate(prevProps: Props): void;
        componentWillUnmount(): void;
        /**
         * DOM reference housekeeping that is needed for functionality
         */
        setPlayerRef: (ref: HTMLDivElement | null | undefined) => void;
        setVideoRef: (ref: HTMLVideoElement | null | undefined) => void;
        /**
         * Functions that directly interact with the HTML video element
         */
        setPlaybackRate: (playbackRate: number) => void;
        setVolume: (volume: number) => void;
        load: () => void;
        pause: () => void;
        play: () => void;
        seek: (time: number) => void;
        toggleCaptions: () => void;
        toggleFullscreen: () => void;
        /**
         * Handlers for various media events on the video
         */
        handleCanPlay: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleDurationChange: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleEnded: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleError: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleFullscreenChange: EventListener;
        handleLoadStart: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handlePlay: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        handlePlaying: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handlePlayheadDown: (event: React.MouseEvent<HTMLDivElement>) => void;
        handlePlayheadUp: (event: React.MouseEvent<HTMLDivElement>) => void;
        handlePause: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        handleProgress: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleSeek: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleSeeking: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleStalled: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleTimeUpdate: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        handleVolumeChange: (event: React.SyntheticEvent<HTMLDivElement> | React.SyntheticEvent<HTMLAnchorElement>) => void;
        handleWaiting: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
        render(): Node;
    }
}
declare module "wrapWithComponent" {
    import type { ComponentType, Node } from "react";
    export default function wrapWithComponent<P>({ element, Component, props, }: {
        element: Node | null | undefined;
        Component: ComponentType<P>;
        props: P;
    }): Node;
}
