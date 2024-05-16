import { ReactNode } from 'react';
import { Accordion, Link, List, Text } from 'gestalt';
import Card from './Card';

type Props = {
  items: ReadonlyArray<{
    href: string;
    text: string;
  }>;
};

export default function InternalDocumentationSection({ items }: Props) {
  return (
    <Card name="Internal documentation" showHeading>
{ /* @ts-expect-error - TS2739 - Type '{ id: string; items: { title: string; icon: "lock"; iconAccessibilityLabel: string; children: Element; }[]; }' is missing the following properties from type 'AccordionExpandableProps': accessibilityCollapseLabel, accessibilityExpandLabel */}
      <Accordion.Expandable
        id="internal-documentation-accordion"
        items={[
          {
            title: 'PDocs available',
            icon: 'lock',
            iconAccessibilityLabel: 'Access is restricted to Pinterest employees.',
            children: (
              <List label="PDocs available" labelDisplay="hidden" type="unordered">
                {items.map(({ href, text }) => (
                  <List.Item
                    key={text}
                    text={
                      <Text>
                        <Link
                          externalLinkIcon="default"
                          href={href}
                          rel="nofollow"
                          target="blank"
                          underline="always"
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
