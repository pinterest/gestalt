import { Fragment, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useColorScheme } from './ColorSchemeProvider';
import useDesignTokens from './useDesignTokens';
import useInExperiment from '../useInExperiment';

/**
 * Appends tokens as injected CSS tokens
 */
const useThemeToStyles = ({
  forceTheme,
  languageMode = 'default',
}: {
  forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
  languageMode?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
}) => {
  // GET COLOR SCHEME MODE
  const { colorSchemeName: colorSchemeMode } = useColorScheme();
  // GET DEFAULT DESIGN SYSTEM TOKEN SET OR APPLICABLE FROM EXPERIMENT
  const tokens = useDesignTokens({ forceTheme });

  // DEFINE THEME UNDER EXPERIMENT
  const isVR = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const isCalico01 = useInExperiment({
    webExperimentName: 'web_gestalt_calico01',
    mwebExperimentName: 'web_gestalt_calico01',
  });

  const isClassic = forceTheme === 'classic' || (!isVR && !isCalico01);

  // BUILD STYLE SHEET FROM TOKENS FILES
  let styles = '';

  // ADDS METADATA
  styles += `  --gestalt-theme: ${tokens.name};\n`;
  styles += `  --gestalt-color-scheme: ${colorSchemeMode};\n`;
  if (!isClassic) {
    styles += `  --gestalt-line-height: ${languageMode}Mode;\n`;
  }

  // BUILDS TOKENS
  const colorSchemeModeTokenSet = colorSchemeMode === 'darkMode' ? tokens.dark : tokens.light;
  // @ts-expect-error - TS7053
  const languageModeTokenSet = languageMode ? tokens[languageMode] : '';

  Object.keys(colorSchemeModeTokenSet).forEach((key) => {
    if (!isClassic && key.match(/lineheight/)) {
      styles += `  --${key}: ${languageModeTokenSet[key]};\n`;
    } else {
      // @ts-expect-error - TS7053
      styles += `  --${key}: ${colorSchemeModeTokenSet[key]};\n`;
    }
  });

  return styles;
};

type Props = {
  /**
   * Context lets a parent component provide data to the entire tree below it. Only components within the ColorSchemeProvider tree will be able to subscribe to it.
   */
  children: ReactNode;
  /**
   * Use with caution! Set an id in your provider to limit the scope of the provider to just the children. This should only be used for cases where you want to enable dark mode in delimited sections to examplify dark mode itself.
   * If not passed in, settings will be applied as globally as possible (ex. setting color scheme variables at :root). A global implementation is critical for displaying dark mode correctly: when dark mode is not set globally, [React Portal](https://react.dev/reference/react-dom/createPortal)-based components, mostly Popovers and Tooltips, will not render in dark mode. The main ColorSchemeProvider in your app should NOT have an id set.
   */
  id?: string | null | undefined;
  /**
   * Sets the language mode that manages the line height for the selected language.
   */
  languageMode?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
  /**
   * Forces a theme. It should be accompanied of a root selector. It allows applying a theme on delimited sections.
   */
  forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
  rootSelector?: string;
};

/**
 * [DesignTokensProvider](https://gestalt.pinterest.systems/web/utilities/designtokensprovider).
 */
export default function DesignTokensProvider({
  children,
  id,
  languageMode = 'default',
  forceTheme,
  rootSelector = '',
}: Props) {
  const className = id ? `__gestaltTheme${id}` : undefined;
  const root = rootSelector ? `:root .${rootSelector}` : ':root';

  return (
    <Fragment>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `${id ? `.${className}` : root} {
${useThemeToStyles({ languageMode, forceTheme })} }`,
        }}
      />
      <div className={classnames(className)}>{children}</div>
    </Fragment>
  );
}
