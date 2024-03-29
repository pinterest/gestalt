// @flow strict
import { type Element, type Node as ReactNode } from 'react';
import { Box, Flex, Heading, HelpButton, IconButton, Text, useDefaultLabel } from 'gestalt';
import { useChartContext } from './ChartGraphContext';

export default function Header({
  title,
  readyToRender,
  description,
  onVisualPatternChange,
  helpButton,
  titleDisplay,
  toggleTabularDataModal,
  showTabularData,
}: {
  readyToRender: boolean,
  title?: string,
  description?: string,
  onVisualPatternChange: () => void,
  helpButton?: Element<typeof HelpButton>,
  titleDisplay?: 'visible' | 'hidden',
  toggleTabularDataModal: () => void,
  showTabularData: boolean,
}): ReactNode {
  const { accessibleViewText, defaultViewText, tabularData } = useDefaultLabel('ChartGraph');
  const { decal: showVisualPattern } = useChartContext();

  return (
    <Box marginBottom={5} width="100%">
      <Flex width="100%">
        <Flex.Item flex="grow">
          {titleDisplay === 'hidden' ? null : (
            <Flex direction="column">
              <Flex alignItems="center" gap={2}>
                <Heading color={readyToRender ? 'default' : 'inverse'} size="300">
                  {title}
                </Heading>
                {helpButton || null}
              </Flex>
              {/* We need this hack to tick the eye while chart is not rendered and title/description is repositioning. This prevents from seeing title/description flick. */}
              <Text color={readyToRender ? 'subtle' : 'inverse'} size="100">
                {description}
              </Text>
            </Flex>
          )}
        </Flex.Item>
        <IconButton
          accessibilityLabel=""
          bgColor={readyToRender ? undefined : 'transparent'}
          icon="table"
          iconColor={readyToRender ? 'darkGray' : 'white'}
          name="table"
          onClick={toggleTabularDataModal}
          selected={showTabularData}
          size="xs"
          tooltip={{ text: tabularData }}
        />
        {showVisualPattern === 'disabled' ? null : (
          <IconButton
            accessibilityLabel=""
            bgColor={readyToRender ? undefined : 'transparent'}
            icon="accessibility"
            // We need this hack to tick the eye while chart is not rendered and title/description is repositioning. This prevents from seeing title/description flick.
            iconColor={readyToRender ? 'darkGray' : 'white'}
            name="accessibility"
            onClick={onVisualPatternChange}
            selected={showVisualPattern === 'visualPattern'}
            size="xs"
            tooltip={{
              text: showVisualPattern === 'visualPattern' ? defaultViewText : accessibleViewText,
            }}
          />
        )}
      </Flex>
    </Box>
  );
}
