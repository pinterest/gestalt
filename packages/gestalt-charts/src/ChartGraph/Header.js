// @flow strict
import { type Element, type Node } from 'react';
import { Box, Flex, Heading, HelpButton, IconButton, Text, useDefaultLabel } from 'gestalt';
import { useChartContext } from './ChartGraphContext.js';

export default function Header({
  title,
  readyToRender,
  description,
  onVisualPatternChange,
  helpButton,
  titleDisplay,
  toggleTabularDataModal,
  showTabularData,
}: {|
  readyToRender: boolean,
  title?: string,
  description?: string,
  onVisualPatternChange: () => void,
  helpButton?: Element<typeof HelpButton>,
  titleDisplay?: 'visible' | 'hidden',
  toggleTabularDataModal: () => void,
  showTabularData: boolean,
|}): Node {
  const { accessibleViewText, defaultViewText, tabularData } = useDefaultLabel('ChartGraph');
  const { decal: showVisualPattern } = useChartContext();

  return (
    <Box width="100%" marginBottom={5}>
      <Flex width="100%">
        <Flex.Item flex="grow">
          {titleDisplay === 'hidden' ? null : (
            <Flex direction="column">
              <Flex gap={2} alignItems="center">
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
          icon="apps"
          iconColor={readyToRender ? 'darkGray' : 'white'}
          bgColor={readyToRender ? undefined : 'transparent'}
          onClick={toggleTabularDataModal}
          selected={showTabularData}
          size="xs"
          tooltip={{ text: tabularData }}
        />
        {showVisualPattern === 'disabled' ? null : (
          <IconButton
            accessibilityLabel=""
            dangerouslySetSvgPath={{
              __path:
                'M16 11h-3v2.667l2.8 3.733a1 1 0 0 1-1.6 1.2L12 15.667 9.8 18.6a1 1 0 1 1-1.6-1.2l2.8-3.733V11H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2zm-4-7a2 2 0 1 1-.001 4.001A2 2 0 0 1 12 4zm0-4C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12z',
            }}
            // We need this hack to tick the eye while chart is not rendered and title/description is repositioning. This prevents from seeing title/description flick.
            iconColor={readyToRender ? 'darkGray' : 'white'}
            bgColor={readyToRender ? undefined : 'transparent'}
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
