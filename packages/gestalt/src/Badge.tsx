import { ComponentProps } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import Box from './Box';
import Flex from './Flex';
import Icon from './Icon';
import InternalIcon from './sharedSubcomponents/InternalIcon';
import Tooltip from './Tooltip';
import useInExperiment from './useInExperiment';
import useInteractiveStates from './utils/useInteractiveStates';
import { Indexable } from './zIndex';

type Position = 'middle' | 'top';

type TooltipProps = {
  accessibilityLabel?: string;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  text: string;
  zIndex?: Indexable;
};

export type TypeOptions =
  | 'info'
  | 'error'
  | 'warning'
  | 'success'
  | 'neutral'
  | 'recommendation'
  | 'darkWash'
  | 'lightWash';

type InteractiveTypeOptions =
  | 'interactive-info'
  | 'interactive-error'
  | 'interactive-warning'
  | 'interactive-success'
  | 'interactive-neutral'
  | 'interactive-recommendation'
  | 'interactive-darkWash'
  | 'interactive-lightWash';

type Props = {
  /**
   * Badge position relative to its parent element. See the [positioning](https://gestalt.pinterest.systems/web/badge#Positioning) variant to learn more.
   */
  position?: Position;
  /**
   * Text displayed inside of the Badge. Sentence case is preferred.
   */
  text: string;
  /**
   *  Adds a [Tooltip](https://gestalt.pinterest.systems/web/tooltip) on hover/focus of the Badge. To convey the interaction, it also displays an Icon. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
   */
  tooltip?: TooltipProps;
  /**
   * Determines the style of the badge. See the [type](https://gestalt.pinterest.systems/web/badge#Type) variant to learn more.
   */
  type?: TypeOptions;
};

/**
 * [Badge](https://gestalt.pinterest.systems/web/badge) is a label that indicates status or importance. Badges should provide quick recognition.
 *
 * ![Badge light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge.spec.ts-snapshots/Badge-chromium-darwin.png)
 * ![Badge dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Badge-dark.spec.ts-snapshots/Badge-dark-chromium-darwin.png)
 *
 */
export default function Badge({ position = 'middle', text, type = 'info', tooltip }: Props) {
  const shouldUseTooltip = tooltip?.text;

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const ICON_MAP = Object.freeze({
    'info': 'info-circle',
    'error': 'workflow-status-problem',
    'warning': 'workflow-status-warning',
    'success': 'check-circle',
    'neutral': 'lock',
    'recommendation': 'sparkle',
    'darkWash': 'info-circle',
    'lightWash': 'info-circle',
  });

  let styleType: TypeOptions | InteractiveTypeOptions = type;

  if (shouldUseTooltip && (type === 'info' || isInVRExperiment)) {
    styleType = `interactive-${type}`;
  }

  const csBadge = cx(styles.Badge, styles[position], styles[styleType]);

  const { handleOnBlur, handleOnFocus, handleOnMouseEnter, handleOnMouseLeave, isHovered } =
    useInteractiveStates();

  const getIconColor = () => {
    if (isInVRExperiment && isHovered) return `${type}-hover`;

    if (!isInVRExperiment) return type === 'lightWash' ? 'dark' : 'light';

    return type;
  };

  const badgeComponent = (
    <div
      className={csBadge}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Flex alignItems="center" gap={1} height="100%">
        {shouldUseTooltip ? (
          <Box aria-hidden>
            {isInVRExperiment ? (
              <InternalIcon
                accessibilityLabel=""
                color={getIconColor() as ComponentProps<typeof InternalIcon>['color']}
                icon={ICON_MAP[type] as ComponentProps<typeof Icon>['icon']}
                inline
                size="12"
              />
            ) : (
              <Icon
                accessibilityLabel=""
                color={
                  type === 'lightWash' || type === 'darkWash'
                    ? getIconColor() as "light" | "dark"
                    : 'inverse'
                }
                icon={ICON_MAP[type] as ComponentProps<typeof Icon>['icon']}
                inline
                size="14"
              />
            )}
          </Box>
        ) : null}
        <Box
          dangerouslySetInlineStyle={{ __style: { marginTop: isInVRExperiment ? '3px' : '2px' } }}
          display="inlineBlock"
        >
          {text}
        </Box>
      </Flex>
    </div>
  );

  return shouldUseTooltip ? (
    <Tooltip
      accessibilityLabel={tooltip.accessibilityLabel}
      idealDirection={tooltip.idealDirection}
      inline
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      {badgeComponent}
    </Tooltip>
  ) : (
    badgeComponent
  );
}

Badge.displayName = 'Badge';
