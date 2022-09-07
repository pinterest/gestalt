// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new translations:
 * - Add component default translations to defaultTranslations keyed by component name
 * - Add default translations to the mock file (./__mocks__/I18nProvider.js)
 */

export type I18nContextType = {|
  [string]: {| [string]: string |},
|};

export const defaultTranslations: I18nContextType = {
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
  Video: {
    accessibilityHideCaptionsLabel: 'Hide captions',
    accessibilityShowCaptionsLabel: 'Show captions',
    accessibilityMaximizeLabel: 'Maximize',
    accessibilityMinimizeLabel: 'Minimize',
    accessibilityMuteLabel: 'Mute',
    accessibilityPauseLabel: 'Pause',
    accessibilityPlayLabel: 'Play',
    accessibilityProgressBarLabel: 'Progress bar',
    accessibilityUnmuteLabel: 'Unmute',
  },
};

const I18nContext: Context<I18nContextType> = createContext<I18nContextType>(defaultTranslations);

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
const I18nProvider = I18nContext.Provider;
export default I18nProvider;

type ValidComponent = $Keys<typeof defaultTranslations>;

export function useI18nContext<C: ValidComponent>(
  componentName: C,
): $ElementType<I18nContextType, C> {
  // Without a I18nProvider set in the app, propsTranslations will contain the default values
  // If a I18nProvider is set in the app, propsTranslations will contain the newly set context values and override the default ones
  const propsTranslations = useContext(I18nContext);

  // Check if a I18nProvider is set in the app but the key-values for a particular component are missed
  const providedTranslations = propsTranslations[componentName];

  // Get the default key-values for a particular component
  const defaultComponentTranslations = defaultTranslations[componentName];

  // If all key-values for a particular component are missed in the I18nProvider, used the default ones for that component
  if (!providedTranslations) return defaultComponentTranslations;

  // Shallow cloning (copies first level, references second level) to support debugging
  const componentTranslations = { ...providedTranslations };

  const translationPropNames = Object.keys(componentTranslations);

  // Check if there's any values set in the I18nProvider that are nullish
  const nullTranslations = translationPropNames.filter(
    (propName) => typeof componentTranslations[propName] !== 'string',
  );

  const expectedTranslations = Object.keys(defaultComponentTranslations);

  // Check if there's any particular key-values in a component that weren't provided in the I18nProvider but do exist as defaults
  const missingTranslations = expectedTranslations.filter(
    (item) => !translationPropNames.includes(item),
  );

  const missingAndNullTranslations = [...nullTranslations, ...missingTranslations];

  // For those nullish and missing key-values, complete them with the default values
  if (missingAndNullTranslations.length > 0) {
    expectedTranslations.forEach((propName) => {
      if (!componentTranslations[propName]) {
        componentTranslations[propName] = defaultComponentTranslations[propName];
      }
    });
  }

  return componentTranslations;
}
