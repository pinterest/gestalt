// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, IconButton, Text, useDefaultLabel } from 'gestalt';

export default function Header({
  title,
  readyToRender,
  description,
  onVisualPatternChange,
  visualPatternSelected,
}: {|
  readyToRender: boolean,
  title?: string,
  description?: string,
  onVisualPatternChange: () => void,
  visualPatternSelected: ?'accessible' | 'default' | 'disabled',
|}): Node {
  const { accessibleViewText, defaultViewText } = useDefaultLabel('ChartGraph');

  return (
    <Box width="100%" marginBottom={5}>
      <Flex width="100%">
        <Flex.Item flex="grow">
          <Flex direction="column">
            <Heading color={readyToRender ? 'default' : 'inverse'} size="300">
              {title}
            </Heading>
            {/* We need this hack to tick the eye while chart is not rendered and title/description is repositioning. This prevents from seeing title/description flick. */}
            <Text color={readyToRender ? 'subtle' : 'inverse'} size="100">
              {description}
            </Text>
          </Flex>
        </Flex.Item>
        {visualPatternSelected === 'disabled' ? null : (
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
            selected={visualPatternSelected === 'accessible'}
            size="xs"
            tooltip={{
              text: visualPatternSelected ? defaultViewText : accessibleViewText,
            }}
          />
        )}
      </Flex>
    </Box>
  );
}
