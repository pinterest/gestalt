// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable gestalt/only-valid-tokens */
import { useExperimentalTheme } from 'gestalt';

export default function DocsVisualRefreshTypographyStyle() {
  const theme = useExperimentalTheme();

  return theme.MAIN ? (
    <style
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
        @font-face {
          font-family: 'Pin-Sans';
          src: url('https://s.pinimg.com/webapp/Pin-Sans-MacOS-Regular-708c49dd.woff2') format('woff2');
          font-weight: 400;
        }

        @font-face {
          font-family: 'Pin-Sans';
          src: url('https://s.pinimg.com/webapp/Pin-Sans-MacOS-Medium-704a4f34.woff2') format('woff2');
          font-weight: 500;
        }

        @font-face {
          font-family: 'Pin-Sans';
          src: url('https://s.pinimg.com/webapp/Pin-Sans-MacOS-Bold-ce475d98.woff2') format('woff2');
          font-weight: 700;
        }

        body, button, input, select, textarea {
          font-family: 'Pin-Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica, 'ヒラギノ角ゴ Pro W3', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', Arial, sans-serif !important;
        }
        :root {
          --font-family-default-latin: 'Pin-Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica, 'ヒラギノ角ゴ Pro W3', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', Arial, sans-serif;
        }
      `,
      }}
    />
  ) : null;
}
