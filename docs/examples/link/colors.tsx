import { useState } from 'react';
import { Box, Flex, Label, Link, Switch, Text } from 'gestalt';

export default function Example() {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Flex gap={{ column: 0, row: 2 }}>
        <Switch
          id="compress-buttons"
          onChange={() => setShowIcon((value) => !value)}
          switched={showIcon}
        />
        <Box flex="grow" paddingX={2}>
          <Label htmlFor="compress-buttons">
            <Text>Show external icon</Text>
          </Label>
        </Box>
      </Flex>

      <Flex alignItems="start" direction="column" gap={{ column: 3, row: 0 }}>
        <Text color="default">
          <Link
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
          <Link
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
            <Link
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
          <Link
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
          <Link
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
          <Link
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
          <Link
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
          <Link
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
          <Link
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
          <Link
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
            <Link
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
            <Link
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
