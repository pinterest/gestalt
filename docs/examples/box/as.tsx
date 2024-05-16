import { Box, Flex, Heading, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" direction="column" flex="grow" height="100%" width="100%">
      <Flex height="100%" width="100%">
        <Box
          as="nav"
          borderStyle="sm"
          color="successBase"
          column={6}
          padding={2}
          title="as prop example nav"
          width="100%"
        >
          <Text color="light" weight="bold">
            Top Nav Menu: <code>as=&quot;nav&quot;</code>
          </Text>
        </Box>
        <Box borderStyle="sm" column={6} display="inlineBlock">
          <Box padding={2} width="100%">
            <Text>
              HTML output:
              <br />
              <code>{'<nav>Menu</nav>'}</code>
            </Text>
          </Box>
        </Box>
      </Flex>

      <Flex height="100%" width="100%">
        <Box as="article" borderStyle="sm" color="successBase" column={6} padding={2} width="100%">
          <Heading color="light" size="500">
            Article 1
          </Heading>
          <Text color="light" weight="bold">
            Article: <code>as=&quot;article&quot;</code>
          </Text>
        </Box>
        <Box borderStyle="sm" column={6} display="inlineBlock">
          <Box padding={2} width="100%">
            <Text>
              HTML output:
              <br />
              <code>
                {'<article>'}
                <br />
                {'  <h2>Article 1</h2>'}
                <br />
                {'</article>'}
              </code>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
