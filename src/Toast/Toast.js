// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Mask from '../Mask/Mask';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

type Props = {|
  color?: 'darkGray' | 'orange',
  icon?: 'arrow-circle-forward', // leaving open to additional icons in the future
  text: string | Array<string>,
  thumbnail?: React.Element<any>,
|};

export default function Toast(props: Props) {
  const { color = 'darkGray', icon, thumbnail, text } = props;

  let contents;
  // Confirmation Toasts
  if (text instanceof Array && text.length > 1) {
    contents = (
      <Box xs={{ display: 'flex' }}>
        <Box xs={{ display: 'flexColumn' }} justifyContent="center">
          {thumbnail ? (
            <Mask shape="rounded" height={48} width={48}>
              {thumbnail}
            </Mask>
          ) : null}
        </Box>
        <Box
          xs={{ display: 'flexColumn' }}
          justifyContent="center"
          dangerouslySetInlineStyle={{ __style: { paddingLeft: 10 } }}
        >
          <Box
            dangerouslySetInlineStyle={{ __style: { fontWeight: 'normal' } }}
          >
            <Text color="white" size="lg">
              {text[0]}
            </Text>
          </Box>
          <Text bold color="white" size="lg">
            {text[1]}
          </Text>
        </Box>
      </Box>
    );
  } else {
    // Toasts as Guides
    contents = (
      <Box
        xs={{ display: 'flex' }}
        justifyContent="between"
        alignItems="center"
      >
        <Text bold color="white" size="lg">
          {text}
        </Text>
        {icon && (
          <Box dangerouslySetInlineStyle={{ __style: { paddingLeft: 24 } }}>
            <Icon accessibilityLabel="" color="white" icon={icon} size={36} />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box marginBottom={3} paddingX={4} maxWidth={376} width="100vw">
      <Box color={color} fit paddingX={8} paddingY={5} shape="pill">
        {contents}
      </Box>
    </Box>
  );
}
