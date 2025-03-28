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
  language,
}: {
  forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
  language?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
}) => {
  // GET COLOR SCHEME MODE
  const themeColorScheme = useColorScheme();
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
  Object.keys(themeColorScheme).forEach((key) => {
    styles += `  --gestalt-theme: ${tokens.name};\n`;
    // @ts-expect-error - TS7053
    styles += `  --gestalt-color-scheme: ${themeColorScheme[key]};\n`;
    styles += `  --gestalt-line-height: ${language}Mode;\n`;
  });

  // BUILDS TOKENS
  if (themeColorScheme.colorSchemeName === 'darkMode') {
    Object.keys(tokens.dark).forEach((key) => {
      if (!isClassic && key.match(/lineheight/)) {
        // @ts-expect-error - TS7053
        styles += `  --${key}: ${tokens[language][key]};\n`;
      } else {
        // @ts-expect-error - TS7053
        styles += `  --${key}: ${tokens.dark[key]};\n`;
      }
    });
  } else {
    Object.keys(tokens.light).forEach((key) => {
      if (!isClassic && key.match(/lineheight/)) {
        // @ts-expect-error - TS7053
        styles += `  --${key}: ${tokens[language][key]};\n`;
      } else {
        styles += `  --${key}: ${
          // @ts-expect-error - TS7053
          tokens.light[key]
        };\n`;
      }
    });
  }

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
   * Sets the line height for the selected language.
   */
  languageMode?: 'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi';
  __forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
  __rootSelector?: string;
};

/**
 * [DesignTokensProvider](https://gestalt.pinterest.systems/web/utilities/designtokensprovider).
 */
export default function DesignTokensProvider({
  children,
  id,
  languageMode = 'default',
  __forceTheme,
  __rootSelector = '',
}: Props) {
  const [languageLineHeight, setLanguageLineHeight] = useState(languageMode);

  const className = id ? `__gestaltTheme${id}` : undefined;
  const root = __rootSelector ? `:root .${__rootSelector}` : ':root';
  const selector = id ? `.${className}` : root;

  useEffect(() => {
    setLanguageLineHeight(languageMode);
  }, [languageMode]);

  const styles = useThemeToStyles({ language: languageLineHeight, forceTheme: __forceTheme });

  return (
    <Fragment>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `${selector} {
${styles} }`,
        }}
      />
      <div className={classnames(className)}>{children}</div>
    </Fragment>
  );
}
