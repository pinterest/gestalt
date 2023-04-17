// @flow strict
import { type Node } from 'react';
import { Checkbox, Flex, Label, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="row" width="90%" alignItems="center" wrap>
        <Flex gap={{ column: 0, row: 2 }}>
          <Checkbox checked id="1" onChange={() => {}} size="sm" />
          <Label htmlFor="1">
            <Text>
              Use sites you visit to improve which recommendations and ads you see on Pinterest.{' '}
              <Link
                accessibilityLabel="Learn more about personalization and data"
                display="inline"
                href="https://pinterest.com/_/_/help/article/personalization-and-data#info-ad"
              >
                Learn more
              </Link>
            </Text>
          </Label>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Checkbox checked id="2" onChange={() => {}} size="sm" />
          <Label htmlFor="2">
            <Text>
              Share activity for ads performance reporting.{' '}
              <Link
                accessibilityLabel="Learn more about ads performance reporting"
                display="inline"
                href="https://www.pinterest.com/_/_/help/article/ads-performance-reporting"
              >
                Learn more
              </Link>
            </Text>
          </Label>
        </Flex>
        <Flex gap={{ column: 0, row: 2 }}>
          <Checkbox checked id="3" onChange={() => {}} size="sm" />
          <Label htmlFor="3">
            <Text>
              Use your activity to improve ads you see about Pinterest on other sites or apps you
              may visit.{' '}
              <Link
                accessibilityLabel="Learn more about third-party analytics"
                display="inline"
                href="https://www.pinterest.com/_/_/help/article/third-party-analytics-or-advertising-providers-pinterest-uses-or-allows"
              >
                Learn more
              </Link>
            </Text>
          </Label>
        </Flex>
      </Flex>
    </Flex>
  );
}
