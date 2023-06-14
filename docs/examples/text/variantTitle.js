// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" alignItems="start" gap={2}>
        <Flex alignItems="center" direction="column" gap={{ column: 2, row: 0 }}>
          <Text size="200" weight="bold">
            Hover over the examples below for a few seconds to see the title text:
          </Text>

          <Box borderStyle="sm" maxWidth={400} padding={1}>
            <Flex direction="column" gap={{ column: 3, row: 0 }}>
              <Flex direction="column" gap={{ column: 1, row: 0 }}>
                <Text italic size="100">
                  This title attribute is automatically added because lineClamp is used and children
                  is a string.
                </Text>
                <Text lineClamp={1}>
                  This is a long and Supercalifragilisticexpialidocious sentence.
                  次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                </Text>
              </Flex>

              <Flex direction="column" gap={{ column: 1, row: 0 }}>
                <Text italic size="100">
                  This example uses lineClamp but has no title attribute, because children is a
                  React.Node.
                </Text>
                <Text lineClamp={1}>
                  <Link href="#">
                    This is a long and Supercalifragilisticexpialidocious sentence.
                    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                  </Link>
                </Text>
              </Flex>

              <Flex direction="column" gap={{ column: 1, row: 0 }}>
                <Text italic size="100">
                  This example uses lineClamp and children is a React.Node, but uses the title prop.
                </Text>
                <Text
                  lineClamp={1}
                  title="This is a long and Supercalifragilisticexpialidocious sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉"
                >
                  <Link href="#">
                    This is a long and Supercalifragilisticexpialidocious sentence.
                    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
