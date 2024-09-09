import { Box, Flex, Link, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={2}>
        <Flex alignItems="center" direction="column" gap={2}>
          <TextCompact weight="emphasis">
            Hover over the examples below for a few seconds to see the title text:
          </TextCompact>

          <Box borderStyle="sm" maxWidth={400} padding={1}>
            <Flex direction="column" gap={3}>
              <Flex direction="column" gap={1}>
                <TextCompact italic>
                  This title attribute is automatically added because lineClamp is used and children
                  is a string.
                </TextCompact>
                <TextCompact lineClamp={1}>
                  This is a long and Supercalifragilisticexpialidocious sentence.
                  次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                </TextCompact>
              </Flex>

              <Flex direction="column" gap={1}>
                <TextCompact italic>
                  This example uses lineClamp but has no title attribute, because children is a
                  React.Node.
                </TextCompact>
                <TextCompact lineClamp={1}>
                  <Link href="#">
                    This is a long and Supercalifragilisticexpialidocious sentence.
                    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                  </Link>
                </TextCompact>
              </Flex>

              <Flex direction="column" gap={1}>
                <TextCompact italic>
                  This example uses lineClamp and children is a React.Node, but uses the title prop.
                </TextCompact>
                <TextCompact
                  lineClamp={1}
                  title="This is a long and Supercalifragilisticexpialidocious sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉"
                >
                  <Link href="#">
                    This is a long and Supercalifragilisticexpialidocious sentence.
                    次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
                  </Link>
                </TextCompact>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
