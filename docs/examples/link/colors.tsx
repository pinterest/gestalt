import { useState } from 'react';
import { Box, Flex, Label, Link, Switch, Text } from 'gestalt';

export default function Example() {
  const [showIcon, setShowIcon] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Flex gap={7}>
        <Flex gap={2}>
          <Switch id="display" onChange={() => setDisplay((value) => !value)} switched={display} />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="display">
              <Text>{display ? 'Inlined link' : 'Standalone link'}</Text>
            </Label>
          </Box>
        </Flex>
        <Flex gap={2}>
          <Switch
            id="icon-display"
            onChange={() => setShowIcon((value) => !value)}
            switched={showIcon}
          />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="icon-display">
              <Text>Show external icon</Text>
            </Label>
          </Box>
        </Flex>
      </Flex>

      <Flex alignItems="start" direction="column" gap={{ column: 3, row: 0 }}>
        <Text color="default">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Default
          </Link>
        </Text>
        <Text color="subtle">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Subtle
          </Link>
        </Text>
        <Box color="inverse" padding={1}>
          <Text color="inverse">
            <Link display={display ? 'inline' : undefined}
              externalLinkIcon={showIcon ? 'default' : 'none'}
              href="www.pinterest.com"
              onClick={({ event, dangerouslyDisableOnNavigation }) => {
                event.preventDefault();
                dangerouslyDisableOnNavigation();
              }}
            >
              Inverse
            </Link>
          </Text>
        </Box>
        <Text color="disabled">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Disabled
          </Link>
        </Text>
        <Text color="error">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Error
          </Link>
        </Text>
        <Text color="success">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Success
          </Link>
        </Text>
        <Text color="warning">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Warning
          </Link>
        </Text>
        <Text color="recommendation">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Recommendation
          </Link>
        </Text>
        <Text color="link">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Link
          </Link>
        </Text>
        <Text color="shopping">
          <Link display={display ? 'inline' : undefined}
            externalLinkIcon={showIcon ? 'default' : 'none'}
            href="www.pinterest.com"
            onClick={({ event, dangerouslyDisableOnNavigation }) => {
              event.preventDefault();
              dangerouslyDisableOnNavigation();
            }}
          >
            Shopping
          </Link>
        </Text>
        <Box color="primary" padding={1}>
          <Text color="light">
            <Link display={display ? 'inline' : undefined}
              externalLinkIcon={showIcon ? 'default' : 'none'}
              href="www.pinterest.com"
              onClick={({ event, dangerouslyDisableOnNavigation }) => {
                event.preventDefault();
                dangerouslyDisableOnNavigation();
              }}
            >
              Light
            </Link>
          </Text>
        </Box>
        <Box color="infoWeak" padding={1}>
          <Text color="dark">
            <Link display={display ? 'inline' : undefined}
              externalLinkIcon={showIcon ? 'default' : 'none'}
              href="www.pinterest.com"
              onClick={({ event, dangerouslyDisableOnNavigation }) => {
                event.preventDefault();
                dangerouslyDisableOnNavigation();
              }}
            >
              Dark
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
