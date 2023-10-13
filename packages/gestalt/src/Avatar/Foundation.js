// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import avatarStyles from '../AvatarGroup.css';
import Box from '../Box.js';
import colors from '../Colors.css';
import { useColorScheme } from '../contexts/ColorSchemeProvider.js';
import styles from '../Icon.css';
import icons from '../icons/index.js';
import typography from '../Typography.css';

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = { children: Node, outline: boolean };

function ResponsiveFitSizeBox({ children, outline }: ResponsiveFitSizeBoxProps): Node {
  const { colorGray0 } = useColorScheme();

  return (
    <Box
      color="secondary"
      dangerouslySetInlineStyle={{
        __style: {
          // When specifying a padding by percentage, it's always based on the width of the parent container so we get a property that's equal to the width.s
          paddingBottom: '100%',
          boxShadow: outline ? `0 0 0 1px ${colorGray0}` : undefined,
        },
      }}
      position="relative"
      rounding="circle"
    >
      <Box
        position="absolute"
        // top left bottom right constrains the circle to the exact dimensions of the responsive parent square
        top
        left
        bottom
        right
        display="flex"
        justifyContent="center"
      >
        {children}
      </Box>
    </Box>
  );
}

type Props = {
  children?: string | number,
  fontSize?: string,
  outline?: boolean,
  textAnchor?: 'start' | 'middle' | 'end',
  title?: string,
  translate?: 'translateX10',
  content?: 'text' | 'icon',
};

export default function AvatarFoundation({
  children,
  fontSize,
  outline = false,
  textAnchor = 'middle',
  title,
  translate,
  content = 'text',
}: Props): Node {
  const { colorGray300 } = useColorScheme();

  const cs = classnames(styles.icon, colors.darkGray);

  return (
    <ResponsiveFitSizeBox outline={outline}>
      {content === 'text' ? (
        <svg
          width="100%"
          viewBox="-50 -50 100 100"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {title ? <title>{title}</title> : null}
          <text
            fontSize={fontSize}
            fill={colorGray300}
            dy="0.35em"
            textAnchor={textAnchor}
            className={[
              typography.antialiased,
              typography.sansSerif,
              typography.fontWeightSemiBold,
              translate && avatarStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
            ].join(' ')}
          >
            {children}
          </text>
        </svg>
      ) : null}
      {content === 'icon' ? (
        <svg
          className={cs}
          width={`${ICON_SIZE_RATIO}%`} // percentual width to the parent container, reduces icon to 20px on a 48px parent container and keeps proportions upon resizing
          viewBox="0 0 24 24" // full icon size
          role="img"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Icon</title>
          <path d={icons.add} />
        </svg>
      ) : null}
    </ResponsiveFitSizeBox>
  );
}
