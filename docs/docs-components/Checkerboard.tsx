import { Box, useColorScheme } from 'gestalt';
import { TOKEN_COLOR_BACKGROUND_DARK } from 'gestalt-design-tokens';

export default function Checkerboard() {
  const { colorSchemeName } = useColorScheme();
  const color =
    colorSchemeName === 'lightMode' ? TOKEN_COLOR_BACKGROUND_DARK : '#efefef'.replace('#', '%23');

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          backgroundImage: `
          url('data:image/svg+xml;utf8,
            <svg preserveAspectRatio="none"  viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="5" height="5" fill-opacity="0.1" fill="${color}" />
              <rect x="5" y="5" width="5" height="5" fill-opacity="0.1" fill="${color}" />
              <rect x="5" y="0" width="5" height="5" fill-opacity="0.1" fill="transparent" />
              <rect x="0" y="5" width="5" height="5" fill-opacity="0.1" fill="transparent" />
            </svg>
          ')`
            .split('\n')
            .join(''),
          backgroundSize: '16px 16px',
        },
      }}
      height="100%"
      width="100%"
    />
  );
}
