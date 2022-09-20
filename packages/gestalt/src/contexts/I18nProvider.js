// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new translations:
 * - Create a type for the component's translations (these types need to be flat, *not* nested)
 * - Add component translation type to I18nContextType keyed by component name
 * - Add component translation object to initialContext using `null` for all values
 * - Add default translations to the mock file (./__mocks__/I18nProvider.js) and docs/components/contexts/DocsExperimentProvider.js
 */

type nullOrString = null | string;

export type I18nContextType = {|
  ComboBox: {|
    accessibilityClearButtonLabel: nullOrString,
  |},
  TextField: {|
    accessibilityHidePasswordLabel: nullOrString,
    accessibilityShowPasswordLabel: nullOrString,
  |},
|};

export const initialContext = {
  ComboBox: {
    accessibilityClearButtonLabel: null,
  },
  TextField: {
    accessibilityHidePasswordLabel: null,
    accessibilityShowPasswordLabel: null,
  },
};

const I18nContext: Context<I18nContextType> = createContext<I18nContextType>(initialContext);

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
const I18nProvider = I18nContext.Provider;
export default I18nProvider;

type ValidComponent = $Keys<I18nContextType>;

export function useI18nContext<C: ValidComponent>(
  componentName: C,
): $ElementType<I18nContextType, C> {
  const propsTranslations = useContext(I18nContext);
  const componentTranslations = propsTranslations[componentName];

  // No translation provided for the entire component even in initialContext
  if (!componentTranslations) {
    throw new Error(
      `${componentName} translations not available — please add translations to I18nProvider`,
    );
  }

  const areMissingTranslations = Object.values(componentTranslations).some(
    (item) => item === null || item === '',
  );

  if (areMissingTranslations) {
    const isNotProd = process.env.NODE_ENV !== 'production';

    if (isNotProd) {
      // Ideally we would throw an actual error here (at least in dev), but this wasn't working with the mocks in Pinboard
      // eslint-disable-next-line no-console
      console.error(
        `Translations missing in Gestalt's I18nProvider for ${componentName}. Please provide translations to ensure users see the correct text.`,
      );
    }
  }

  return componentTranslations;
}
