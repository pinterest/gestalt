import { ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
import avatarStyles from './AvatarFoundation.css';
import getAvatarColorToken from './getAvatarColorToken';
import avatarGroupStyles from '../AvatarGroup.css';
import Box from '../Box';
import { useColorScheme } from '../contexts/ColorSchemeProvider';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = {
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  children: ReactNode;
  content: string;
  isCollaboratorCount?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  outline: boolean;
};

function ResponsiveFitSizeBox({
  color,
  content,
  children,
  isCollaboratorCount,
  isHovered,
  isPressed,
  outline,
}: ResponsiveFitSizeBoxProps) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const avatarBackgroundColor =
    content === 'icon' || isCollaboratorCount
      ? getAvatarColorToken('default', isHovered, isPressed, isDarkMode)
      : getAvatarColorToken(color || 'default', isHovered, isPressed, isDarkMode);

  return isInVRExperiment ? (
    <div
      className={classnames({
        [avatarStyles.container]: true,
        [avatarStyles.outlineVR]: isInVRExperiment && outline,
      })}
      role="button"
      style={{
        backgroundColor: avatarBackgroundColor,
      }}
    >
      <div className={avatarStyles.innerDiv}>{children}</div>
    </div>
  ) : (
    <Box
      color="secondary"
      dangerouslySetInlineStyle={{
        __style: {
          // When specifying a padding by percentage, it's always based on the width of the parent container so we get a property that's equal to the width.s
          paddingBottom: '100%',
          borderRadius: outline ? `50%` : undefined,
          outline: outline ? `1px solid rgb(255 255 255)` : undefined,
        },
      }}
      position="relative"
      rounding="circle"
    >
      <Box
        bottom
        // top left bottom right constrains the circle to the exact dimensions of the responsive parent square
        display="flex"
        justifyContent="center"
        left
        position="absolute"
        right
        top
      >
        {children}
      </Box>
    </Box>
  );
}

type AvatarFoundationProps = {
  color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  children?: string | number;
  isCollaboratorCount?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  fontSize?: string;
  outline?: boolean;
  textAnchor?: 'start' | 'middle' | 'end';
  title?: string;
  translate?: 'translateX10';
  content?: 'text' | 'icon';
};

export default function AvatarFoundation({
  color,
  children,
  fontSize,
  isCollaboratorCount,
  isHovered,
  isPressed,
  outline = false,
  textAnchor = 'middle',
  title,
  translate,
  content = 'text',
}: AvatarFoundationProps) {
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  return (
    <ResponsiveFitSizeBox
      color={color}
      content={content}
      isCollaboratorCount={isCollaboratorCount}
      isHovered={isHovered}
      isPressed={isPressed}
      outline={outline}
    >
      {content === 'text' ? (
        <svg
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          viewBox={isInVRExperiment ? '-25 -25 50 50' : '-50 -50 100 100'}
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {title ? <title>{title}</title> : null}
          <text
            className={classnames(
              translate && avatarGroupStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
              {
                [avatarStyles.text]: !isInVRExperiment,
                [avatarStyles.vrText]: isInVRExperiment,
              },
            )}
            dy="0.35em"
            fill={TOKEN_COLOR_TEXT_DEFAULT}
            fontSize={!isInVRExperiment ? fontSize : undefined}
            textAnchor={textAnchor}
          >
            {children}
          </text>
        </svg>
      ) : null}
      {content === 'icon' ? (
        <svg
          className={classnames({
            [avatarStyles.icon]: true,
            [avatarStyles.iconFillDefault]: isInVRExperiment && !isDarkMode,
            [avatarStyles.iconFillDarkMode]: isInVRExperiment && isDarkMode,
          })}
          preserveAspectRatio="xMidYMid meet" // percentual width to the parent container, reduces icon to 20px on a 48px parent container and keeps proportions upon resizing
          role="img" // full icon size
          version="1.1"
          viewBox="0 0 24 24"
          width={`${ICON_SIZE_RATIO}%`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Icon</title>
          <path d={(isInVRExperiment ? vrIcons : icons)['person-add']} />
        </svg>
      ) : null}
    </ResponsiveFitSizeBox>
  );
}
