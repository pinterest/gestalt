import { Box, Flex, IconButtonLink } from 'gestalt';

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
            <IconButtonLink
              accessibilityLabel="Go to Pinterest"
              focusColor="lightBackground"
              href="www.pinterest.com"
              icon="visit"
              iconColor="red"
              tooltip={{
                accessibilityLabel: 'Go to Pinterest',
                text: 'Go to Pinterest',
                idealDirection: 'up',
              }}
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
            <IconButtonLink
              accessibilityLabel="Go to Pinterest"
              focusColor="darkBackground"
              href="www.pinterest.com"
              icon="visit"
              iconColor="red"
              tooltip={{
                accessibilityLabel: 'Go to Pinterest',
                text: 'Go to Pinterest',
                idealDirection: 'up',
              }}
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
            <IconButtonLink
              accessibilityLabel="Go to Pinterest"
              focusColor="lightBackground"
              href="www.pinterest.com"
              icon="visit"
              iconColor="red"
              tooltip={{
                accessibilityLabel: 'Go to Pinterest',
                text: 'Go to Pinterest',
                idealDirection: 'up',
              }}
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
            <IconButtonLink
              accessibilityLabel="Go to Pinterest"
              focusColor="darkBackground"
              href="www.pinterest.com"
              icon="visit"
              iconColor="red"
              tooltip={{
                accessibilityLabel: 'Go to Pinterest',
                text: 'Go to Pinterest',
                idealDirection: 'up',
              }}
            />
          </Box>
          focusColor=&quot;darkBackground&quot;
        </Flex>
      </Flex>
    </Flex>
  );
}
