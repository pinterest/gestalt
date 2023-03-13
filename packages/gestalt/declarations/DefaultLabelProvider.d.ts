import { $Keys, $ElementType } from "utility-types";
import type { Node } from "react";
/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 * - Update these files with the new labels:
 *   - Test file for this Provider
 *      packages/gestalt/src/contexts/DefaultLabelProvider.jsdom.test.js
 *   - Docs example for this Provider
 *      docs/examples/defaultlabelprovider/translations.js
 */
export declare type DefaultLabelContextType = {
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
};
export declare const fallbackLabels: DefaultLabelContextType;
declare type Props = {
    children: Node;
    /**
     * An object describing the default strings to be used by supported component labels throughout your app. If your app supports i18n, don't forget to translate your strings!
     *
     * Note that all supported labels for all supported components must be provided if using this Provider. Omit this prop to use default (English) strings for supported labels.
     *
     * See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.js) for the specific shape of this object.
     */
    labels?: null | DefaultLabelContextType;
};
/**
 * [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to provide default strings for Gestalt component labels that support it. This allows for faster development by reducing boilerplate props at the callsite.
 */
export default function DefaultLabelProvider({ children, labels, }: Props): Node;
declare type ValidComponent = $Keys<DefaultLabelContextType>;
export declare function useDefaultLabelContext<C extends ValidComponent>(componentName: C): $ElementType<DefaultLabelContextType, C>;
export {};
