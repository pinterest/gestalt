// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new translations:
 * - Create a type for the component's translations (these types need to be flat, *not* nested)
 * - Add component translation type to I18nContextType keyed by component name
 * - Add component translation object to initialContext using `null` for all values
 */

type TextTranslations = {|
  accessibilityHidePasswordLabel: ?string,
  accessibilityShowPasswordLabel: ?string,
|};

type I18nContextType = {|
  Text: TextTranslations,
|};

const initialContext = {
  Text: {
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

  // No translation provided for the entire component
  if (!componentTranslations) {
    throw new Error(
      `${componentName} translations not available — please add translations to I18nProvider`,
    );
  }

  const translationPropNames = Object.keys(componentTranslations);
  // Translations that are still nullish (less likely)
  const nullTranslations = translationPropNames.filter(
    (propName) => typeof componentTranslations[propName] !== 'string',
  );
  const expectedTranslations = Object.keys(initialContext[componentName]);
  // Translations that weren't provided in the Provider (more likely)
  const missingTranslations = expectedTranslations.filter(
    (item) => !translationPropNames.includes(item),
  );
  const missingAndNullTranslations = [...nullTranslations, ...missingTranslations];
  if (missingAndNullTranslations.length > 0) {
    const multipleMissing = missingTranslations.length > 1;
    throw new Error(
      `${componentName} prop${multipleMissing ? 's' : ''} ${missingTranslations.join(', ')} ${
        multipleMissing ? 'are' : 'is'
      } missing translations — please add translations to I18nProvider`,
    );
  }

  return componentTranslations;
}
