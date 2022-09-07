// @flow strict
import { createContext, type Context, useContext } from 'react';
// eslint-disable-next-line import/no-relative-parent-imports
import { type I18nContextType } from '../I18nProvider.js';

const translations: I18nContextType = {
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

const MockContext: Context<I18nContextType> = createContext<I18nContextType>(translations);
const I18nProvider = MockContext.Provider;
export default I18nProvider;

type ValidComponent = $Keys<I18nContextType>;

export function useI18nContext<C: ValidComponent>(
  componentName: C,
): $ElementType<I18nContextType, C> {
  const propsTranslations = useContext(MockContext);
  return propsTranslations[componentName];
}
