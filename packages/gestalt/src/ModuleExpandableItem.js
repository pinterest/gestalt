// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import ModuleTitle from './ModuleTitle.js';
import TapArea from './TapArea.js';
import Text from './Text.js';
import { type ModuleExpandableItemBaseProps } from './moduleTypes.js';

type Props = {|
  ...ModuleExpandableItemBaseProps,
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  id: string,
  isCollapsed: boolean,
  onModuleClicked: (boolean) => void,
|};

/**
 * https://gestalt.pinterest.systems/Module
 */
export default function ModuleExpandableItem({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  children,
  id,
  isCollapsed,
  onModuleClicked,
  summary,
  title,
  type = 'info',
  ...props
}: Props): Node {
  let moduleTitle;
  if (title) {
    const commonProps = { title, type };
    if (props.badgeText) {
      moduleTitle = <ModuleTitle {...commonProps} badgeText={props.badgeText} />;
    } else if (props.icon || props.iconAccessibilityLabel) {
      moduleTitle = (
        <ModuleTitle
          {...commonProps}
          icon={props.icon}
          iconAccessibilityLabel={props.iconAccessibilityLabel}
        />
      );
    } else if (props.iconButton) {
      moduleTitle = <ModuleTitle {...commonProps} iconButton={props.iconButton} />;
    } else {
      moduleTitle = <ModuleTitle {...commonProps} />;
    }
  }

  return (
    <Box padding={6}>
      <Flex direction="column" gap={6}>
        <TapArea
          accessibilityControls={id}
          accessibilityExpanded={!isCollapsed}
          accessibilityLabel={isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel}
          onTap={() => {
            onModuleClicked(!isCollapsed);
          }}
        >
          <Flex>
            <Box alignItems="baseline" display="flex" flex="grow" marginEnd={6}>
              <Box column={isCollapsed && summary ? 6 : 12}>{moduleTitle}</Box>

              {summary && isCollapsed && (
                <Box column={6} marginStart={6}>
                  <Flex direction="column" gap={2}>
                    {summary.map((item, i) => (
                      <Text key={i} size="md" lineClamp={1}>
                        {item}
                      </Text>
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>

            {Boolean(children) && (
              <Box id={id} padding={1}>
                <Icon
                  accessibilityLabel={
                    isCollapsed ? accessibilityExpandLabel : accessibilityCollapseLabel
                  }
                  color="darkGray"
                  icon={isCollapsed ? 'arrow-down' : 'arrow-up'}
                  size="12"
                />
              </Box>
            )}
          </Flex>
        </TapArea>

        {/* Flex.Item necessary to prevent gap from being applied to each child */}
        {!isCollapsed && <Flex.Item>{children}</Flex.Item>}
      </Flex>
    </Box>
  );
}
