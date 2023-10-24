// @flow strict
import { type Node } from 'react';
import { Link, List, Module, Text } from 'gestalt';
import Card from './Card.js';

type Props = { items: $ReadOnlyArray<{ href: string, text: string }> };

export default function InternalDocumentationSection({ items }: Props): Node {
  return (
    <Card name="Internal documentation" showHeading>
      <Module.Expandable
        accessibilityExpandLabel="Expand the module"
        accessibilityCollapseLabel="Collapse the module"
        id="internal-documentation-module"
        items={[
          {
            title: 'PDocs available',
            icon: 'lock',
            iconAccessibilityLabel: 'Access is restricted to Pinterest employees.',
            children: (
              <List label="PDocs available" type="unordered" labelDisplay="hidden">
                {items.map(({ href, text }) => (
                  <List.Item
                    key={text}
                    text={
                      <Text>
                        <Link
                          externalLinkIcon="default"
                          underline="always"
                          href={href}
                          target="blank"
                          rel="nofollow"
                        >
                          {text}
                        </Link>
                      </Text>
                    }
                  />
                ))}
              </List>
            ),
          },
        ]}
      />
    </Card>
  );
}
