import { ReactNode } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_BORDER_AVATAR, TOKEN_COLOR_TEXT_DEFAULT } from 'gestalt-design-tokens';
import avatarStyles from '../AvatarGroup.css';
import Box from '../Box';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import typographyStyle from '../Typography.css';
import useInExperiment from '../useInExperiment';

const ICON_SIZE_RATIO = (20 / 48) * 100; // For pixel perfect icon button, we use the icon (20px) to parent container (48px) size ratio

type ResponsiveFitSizeBoxProps = {
  children: ReactNode;
  outline: boolean;
};

function ResponsiveFitSizeBox({ children, outline }: ResponsiveFitSizeBoxProps) {
  return (
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

type Props = {
  children?: string | number;
  fontSize?: string;
  outline?: boolean;
  textAnchor?: 'start' | 'middle' | 'end';
  title?: string;
  translate?: 'translateX10';
  content?: 'text' | 'icon';
};

export default function AvatarFoundation({
  children,
  fontSize,
  outline = false,
  textAnchor = 'middle',
  title,
  translate,
  content = 'text',
}: Props) {
  const cs = classnames(styles.icon, avatarStyles.text);
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  return (
    <ResponsiveFitSizeBox outline={outline}>
      {content === 'text' ? (
        <svg
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          viewBox="-50 -50 100 100"
          width="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          {title ? <title>{title}</title> : null}
          <text
            className={[
              typographyStyle.antialiased,
              typographyStyle.sansSerif,
              typographyStyle.fontWeightSemiBold,
              translate && avatarStyles[translate], // if addCollaborator button is present, translateX moves numbers closer to the edge
            ].join(' ')}
            dy="0.35em"
            fill={TOKEN_COLOR_TEXT_DEFAULT}
            fontSize={fontSize}
            textAnchor={textAnchor}
          >
            {children}
          </text>
        </svg>
      ) : null}
      {content === 'icon' ? (
        <svg
          className={cs}
          preserveAspectRatio="xMidYMid meet" // percentual width to the parent container, reduces icon to 20px on a 48px parent container and keeps proportions upon resizing
          role="img" // full icon size
          version="1.1"
          viewBox="0 0 24 24"
          width={`${ICON_SIZE_RATIO}%`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Icon</title>
          <path d={(isInExperiment ? vrIcons : icons)['person-add']} />
        </svg>
      ) : null}
    </ResponsiveFitSizeBox>
  );
}
