import { Box, Flex, IconButton } from 'gestalt';

export default function Example() {
  return (
    <Flex gap={6}>
      <Flex direction="column" gap={6}>
        <Flex direction="column">
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundImage: 'url("https://i.ibb.co/rcdDzVh/image.png")' },
            }}
            display="flex"
            height="100%"
            justifyContent="center"
            padding={8}
          >
            <IconButton
              accessibilityLabel="heart"
              focusColor="lightBackground"
              icon="heart"
              iconColor="red"
            />
          </Box>
          focusColor=&quot;lightBackground&quot;
        </Flex>
        <Flex direction="column">
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundImage: 'url("https://i.ibb.co/DC0sQrx/image.png")' },
            }}
            display="flex"
            height="100%"
            justifyContent="center"
            padding={8}
          >
            <IconButton
              accessibilityLabel="heart"
              focusColor="darkBackground"
              icon="heart"
              iconColor="red"
            />
          </Box>
          focusColor=&quot;darkBackground&quot;
        </Flex>
      </Flex>
      <Flex direction="column" gap={6}>
        <Flex direction="column">
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundImage: 'url("https://i.ibb.co/rcdDzVh/image.png")' },
            }}
            display="flex"
            height="100%"
            justifyContent="center"
            padding={8}
          >
            <IconButton
              accessibilityLabel="heart"
              focusColor="lightBackground"
              icon="heart"
              iconColor="red"
            />
          </Box>
          focusColor=&quot;lightBackground&quot;
        </Flex>
        <Flex direction="column">
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundImage: 'url("https://i.ibb.co/DC0sQrx/image.png")' },
            }}
            display="flex"
            height="100%"
            justifyContent="center"
            padding={8}
          >
            <IconButton
              accessibilityLabel="heart"
              focusColor="darkBackground"
              icon="heart"
              iconColor="red"
            />
          </Box>
          focusColor=&quot;darkBackground&quot;
        </Flex>
      </Flex>
    </Flex>
  );
}
