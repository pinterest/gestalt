// @flow strict
import { Accordion, Text} from 'gestalt';

export default function Test() {

  return (
      <Accordion.Expandable
        id="ModuleExample3"
        items={[
          {
            children: <Text size="200">Children1</Text>,
            icon: 'lock',
            iconAccessibilityLabel: "title icon",
            title: 'Example with icon',
          },
          {
            badgeText: 'New',
            children: <Text size="200">Children2</Text>,
            title: 'Example with badge',
          },
          {
            children: <Text size="200">Children3</Text>,
            title: 'Example with icon button',
          }
        ]} />

  );
}
