// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new translations:
 * - Create a type for the component's translations (these types need to be flat, *not* nested)
 * - Add component translation type to I18nContextType keyed by component name
 * - Add component translation object to initialContext using `null` for all values
 * - Add default translations to the mock file (./__mocks__/I18nProvider.js) and docs/components/contexts/DocsExperimentProvider.js
 */

export type I18nContextType = {|
  TextField: {|
    accessibilityHidePasswordLabel: ?string,
    accessibilityShowPasswordLabel: ?string,
  |},
|};

export const initialContext = {
  TextField: {
    accessibilityHidePasswordLabel: null,
    accessibilityShowPasswordLabel: null,
  },
};

const defaultTranslations: I18nContextType = {
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
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
    const multipleMissing = missingAndNullTranslations.length > 1;
    const isNotProd = process.env.NODE_ENV !== 'production';

    if (isNotProd) {
      // Ideally we would throw an actual error here (at least in dev), but this wasn't working with the mocks in Pinboard
      // eslint-disable-next-line no-console
      console.error(
        `${componentName} prop${multipleMissing ? 's' : ''} ${missingAndNullTranslations.join(
          ', ',
        )} ${
          multipleMissing ? 'are' : 'is'
        } missing translations — please add translations to I18nProvider`,
      );
    }
    const defaultComponentTranslations = defaultTranslations[componentName];
    Object.keys(defaultComponentTranslations).forEach((propName) => {
      if (!componentTranslations[propName]) {
        componentTranslations[propName] = defaultComponentTranslations[propName];
      }
    });
  }

  return componentTranslations;
}
