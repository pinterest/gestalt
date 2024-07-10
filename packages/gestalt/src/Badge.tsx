import { ComponentProps } from 'react';
import cx from 'classnames';
import styles from './Badge.css';
import Box from './Box';
import Flex from './Flex';
import Icon from './Icon';
import TapArea from './TapArea';
import Text from './Text';
import Tooltip from './Tooltip';
import useInExperiment from './useInExperiment';
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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const shouldUseTooltip = tooltip?.text;

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

  const COLOR_ICON_MAP = Object.freeze({
    'info': 'info',
    'error': 'error',
    'warning': 'warning',
    'success': 'success',
    'neutral': isInVRExperiment ? 'default' : 'inverse',
    'recommendation': 'recommendation',
    'darkWash': 'light',
    'lightWash': 'dark',
  });

  const COLOR_TEXT_MAP = Object.freeze({
    'info': 'shopping',
    'error': 'error',
    'warning': 'warning',
    'success': 'success',
    'neutral': isInVRExperiment ? 'default' : 'inverse',
    'recommendation': 'recommendation',
    'darkWash': 'light',
    'lightWash': 'dark',
  });

  let styleType: TypeOptions | InteractiveTypeOptions = type;

  if (shouldUseTooltip) {
    styleType = `interactive-${type}`;
  }

  const csBadge = cx(styles.Badge, styles[position], styles[styleType], {
    [styles.focusInnerBorder]: isInVRExperiment,
  });

  const badgeComponent = (
    <div className={csBadge}>
      <Flex alignItems="center" gap={1}>
        {shouldUseTooltip ? (
          <Icon
            accessibilityLabel=""
            color={isInVRExperiment ? COLOR_ICON_MAP[type] : 'inverse'}
            icon={ICON_MAP[type] as ComponentProps<typeof Icon>['icon']}
            inline
            size={isInVRExperiment ? '12' : '14'}
          />
        ) : null}
        <Box dangerouslySetInlineStyle={{ __style: { marginTop: '1px' } }} display="inlineBlock">
          <Text
            color={isInVRExperiment ? COLOR_TEXT_MAP[type] : 'inverse'}
            size="200"
            weight={isInVRExperiment ? 'bold' : 'normal'}
          >
            {text}
          </Text>
        </Box>
      </Flex>
    </div>
  );

  return shouldUseTooltip ? (
    <Tooltip
      accessibilityLabel=""
      idealDirection={tooltip.idealDirection}
      inline
      text={tooltip.text}
      zIndex={tooltip.zIndex}
    >
      <TapArea
        accessibilityLabel={tooltip.accessibilityLabel}
        mouseCursor="default"
        rounding={1}
        tapStyle="none"
      >
        {badgeComponent}
      </TapArea>
    </Tooltip>
  ) : (
    badgeComponent
  );
}

Badge.displayName = 'Badge';
