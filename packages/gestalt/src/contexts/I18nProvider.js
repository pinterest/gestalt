// @flow strict
import { type Context, createContext, useContext } from 'react';

type PropTranslations = {|
  [propName: string]: string,
|};

type I18nContextType = {|
  [componentName: string]: PropTranslations,
|};

const I18nContext: Context<I18nContextType> = createContext<I18nContextType>({});

/**
 * *ALPHA - DO NOT USE YET - MAY HAVE BREAKING CHANGES IN THE NEAR FUTURE*
 */
const I18nProvider = I18nContext.Provider;
export default I18nProvider;

export function useI18nContext(componentName: string): PropTranslations {
  const propsTranslations = useContext(I18nContext) ?? {};
  return propsTranslations[componentName];
}
