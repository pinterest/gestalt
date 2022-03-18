// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new translations:
 * - Create a type for the component's translations
 * - Add component translation type to I18nContextType keyed by component name
 * - Add component translation type to useI18nContext return type
 * - When consuming useI18nContext in component, throw an error if any translation isn't available
 */

type TextTranslations = {|
  accessibilityHidePasswordLabel: string,
  accessibilityShowPasswordLabel: string,
|};

type I18nContextType = ?{|
  Text: TextTranslations,
|};

const I18nContext: Context<I18nContextType> = createContext<I18nContextType>(null);

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
const I18nProvider = I18nContext.Provider;
export default I18nProvider;

export function useI18nContext(componentName: string): Text {
  const propsTranslations = useContext(I18nContext) ?? {};
  const componentTranslations = propsTranslations[componentName];

  if (!componentTranslations) {
    throw new Error(
      `${componentName} translations not available — please add translations to I18nProvider`,
    );
  }

  return componentTranslations;
}
