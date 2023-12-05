// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Link, List, Text } from 'gestalt';
import Card from './Card';

type Props = { items: $ReadOnlyArray<{ href: string, text: string }> };

export default function InternalDocumentationSection({ items }: Props): ReactNode {
  return (
    <Card name="Internal documentation" showHeading>
      <Accordion.Expandable
        accessibilityExpandLabel="Expand the accordion"
        accessibilityCollapseLabel="Collapse the accordion"
        id="internal-documentation-accordion"
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
