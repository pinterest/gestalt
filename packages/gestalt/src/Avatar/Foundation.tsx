import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import classnames from 'classnames';
import { TOKEN_COLOR_BORDER_AVATAR, TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
<<<<<<< HEAD
import foundationStyles from './AvatarFoundation.css';
=======
<<<<<<< HEAD
import avatarStyles from './AvatarFoundation.css';
=======
import foundationStyles from './AvatarFoundation.css';
>>>>>>> 80cd4e984 (working on docs)
>>>>>>> 1d7a86c2a (working on docs)
import getAvatarColorToken from './getAvatarColorToken';
import avatarStyles from '../AvatarGroup.css';
import Box from '../Box';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { useColorScheme } from '../contexts/ColorSchemeProvider';
=======
>>>>>>> cff195f61 (fixed pressed state)
>>>>>>> 51f88bc1b (fixed pressed state)
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = {
  avatarColor?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
  children: ReactNode;
  content: string;
  isCollaboratorCount?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  outline: boolean;
};

type ColorScheme = 'light' | 'dark';
const colorSchemeKey = 'gestalt-color-scheme';

function ResponsiveFitSizeBox({
  avatarColor,
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const [cookies] = useCookies([colorSchemeKey]);
  const colorScheme: ColorScheme = cookies[colorSchemeKey] === 'dark' ? 'dark' : 'light';
=======
<<<<<<< HEAD
=======
>>>>>>> 6a2c8216a (fixed colors)
=======
>>>>>>> 1d7a86c2a (working on docs)
=======
>>>>>>> bf4255802 (building examples)
=======
>>>>>>> 83ae6ab77 (dark mode support for temp color values)
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';
>>>>>>> dcdd556c4 (fixed)

  const avatarBackgroundColor =
    content === 'icon' || isCollaboratorCount
<<<<<<< HEAD
      ? getAvatarColorToken('default', isHovered, isPressed, colorScheme)
      : getAvatarColorToken(avatarColor || 'default', isHovered, isPressed, colorScheme);
=======
<<<<<<< HEAD
      ? getAvatarColorToken('default', isHovered, isPressed, isDarkMode)
      : getAvatarColorToken(avatarColor || 'default', isHovered, isPressed, isDarkMode);
=======
      ? TOKEN_COLOR_BACKGROUND_BOX_SECONDARY
      : getAvatarColorToken(avatarColor || '06', isHovered, isPressed);
>>>>>>> b81f81405 (fixed prop naming)
<<<<<<< HEAD
>>>>>>> 50df2c38e (fixed prop naming)
=======
=======
  const avatarBackgroundColor = getAvatarColorToken(content === 'icon' || isCollaboratorCount ? 'default' : avatarColor || 'default', isHovered, isPressed);
>>>>>>> 80cd4e984 (working on docs)
<<<<<<< HEAD
>>>>>>> 1d7a86c2a (working on docs)
=======
=======
  const avatarBackgroundColor =
    content === 'icon' || isCollaboratorCount
      ? getAvatarColorToken('default', isHovered, isPressed)
      : getAvatarColorToken(avatarColor || 'default', isHovered, isPressed);
>>>>>>> a8d098199 (building examples)
<<<<<<< HEAD
>>>>>>> bf4255802 (building examples)
=======
=======
  const [cookies] = useCookies([colorSchemeKey]);
  const colorScheme: ColorScheme = cookies[colorSchemeKey] === 'dark' ? 'dark' : 'light';

  const avatarBackgroundColor =
    content === 'icon' || isCollaboratorCount
      ? getAvatarColorToken('default', isHovered, isPressed, colorScheme)
      : getAvatarColorToken(avatarColor || 'default', isHovered, isPressed, colorScheme);
>>>>>>> 9c35bc114 (dark mode support for temp color values)
>>>>>>> 83ae6ab77 (dark mode support for temp color values)

  return isInVRExperiment ? (
    <div
<<<<<<< HEAD
<<<<<<< HEAD
      className={classnames({
        [foundationStyles.container]: true,
        [foundationStyles.outline]: !isInVRExperiment && outline,
        [foundationStyles.outlineVR]: isInVRExperiment && outline,
      })}
=======
      className={foundationStyles.container}
>>>>>>> 950395011 (fixed focus outline)
=======
      className={classnames({
        [foundationStyles.container]: true,
        [foundationStyles.outline]: !isInVRExperiment && outline,
        [foundationStyles.outlineVR]: isInVRExperiment && outline,
      })}
>>>>>>> 4707f0fa6 (fixed container)
      role="button"
      style={{
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        backgroundColor: avatarBackgroundColor,
=======
        backgroundColor: isInVRExperiment ? avatarBackgroundColor : '06',
>>>>>>> 245f695f5 (prettier)
=======
        backgroundColor: avatarBackgroundColor
>>>>>>> 80cd4e984 (working on docs)
=======
        backgroundColor: avatarBackgroundColor,
>>>>>>> a8d098199 (building examples)
      }}
    >
<<<<<<< HEAD
      <div className={foundationStyles.innerDiv}>{children}</div>
=======
      <div className={avatarStyles.innerDiv}>{children}</div>
>>>>>>> 6a2c8216a (fixed colors)
    </div>
  ) : (
    <Box
      color="secondary"
      dangerouslySetInlineStyle={{
        __style: {
          // When specifying a padding by percentage, it's always based on the width of the parent container so we get a property that's equal to the width.s
          paddingBottom: '100%',
          boxShadow: outline ? `0 0 0 1px ${TOKEN_COLOR_BORDER_AVATAR}` : undefined,
        },
      }}
      position="relative"
      rounding="circle"
    >
<<<<<<< HEAD
=======
      <div className={foundationStyles.innerDiv}>{children}</div>
    </div>
  ) : (
    <Box
      color="secondary"
      dangerouslySetInlineStyle={{
        __style: {
          // When specifying a padding by percentage, it's always based on the width of the parent container so we get a property that's equal to the width.s
          paddingBottom: '100%',
          boxShadow: outline ? `0 0 0 1px ${TOKEN_COLOR_BORDER_AVATAR}` : undefined,
        },
      }}
      position="relative"
      rounding="circle"
    >
>>>>>>> dcdd556c4 (fixed)
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
  avatarColor?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10';
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
  avatarColor,
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> cff195f61 (fixed pressed state)
=======
>>>>>>> 8e95c0684 (cleanup)
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <ResponsiveFitSizeBox
      avatarColor={avatarColor}
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
              translate && avatarStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
              {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                [foundationStyles.text]: !isInVRExperiment,
                [foundationStyles.vrText]: isInVRExperiment,
=======
<<<<<<< HEAD
=======
>>>>>>> 4e0fbafb8 (fixed focus outline)
                [avatarStyles.text]: !isInVRExperiment,
                [avatarStyles.vrText]: isInVRExperiment,
=======
                [foundationStyles.text]: !isInVRExperiment,
<<<<<<< HEAD
                [foundationStyles.textVR]: isInVRExperiment,
>>>>>>> 6408ebbaf (fixed)
>>>>>>> dcdd556c4 (fixed)
=======
                [avatarStyles.text]: !isInVRExperiment,
                [avatarStyles.vrText]: isInVRExperiment,
>>>>>>> 6a2c8216a (fixed colors)
=======
                [foundationStyles.vrText]: isInVRExperiment,
>>>>>>> 950395011 (fixed focus outline)
>>>>>>> 4e0fbafb8 (fixed focus outline)
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
<<<<<<< HEAD
<<<<<<< HEAD
          className={classnames({
<<<<<<< HEAD
            [avatarStyles.text]: true,
            [foundationStyles.icon]: true,
=======
            [avatarStyles.icon]: true,
            [avatarStyles.iconFillDefault]: isInVRExperiment && !isDarkMode,
            [avatarStyles.iconFillDarkMode]: isInVRExperiment && isDarkMode,
>>>>>>> 6a2c8216a (fixed colors)
          })}
=======
        className={classnames({
          // [avatarStyles.text]: true,
          [foundationStyles.icon]: true,
        })}
>>>>>>> cff195f61 (fixed pressed state)
=======
          className={classnames({
            [avatarStyles.text]: true,
            [foundationStyles.icon]: true,
          })}
>>>>>>> 8e95c0684 (cleanup)
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
