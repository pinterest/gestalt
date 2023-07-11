// @flow strict
import { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';

export default function PageHeaderLocalizationExample(): Node {
  return (
    <PageHeader
      title="Anzeigenübersicht"
      subtext="5 aktive Kampagnen."
      helperLink={{
        text: 'Mehr erfahren.',
        accessibilityLabel: 'Erfahren Sie mehr auf Pinterest.com',
        href: 'http://www.pinterest.com',
        onClick: () => {},
      }}
      items={[
        <Datapoint
          key="imporessions"
          size="md"
          title="Impressionen"
          value="$1.25M"
          trend={{ value: 30, accessibilityLabel: 'Aufwärtstrend' }}
        />,
      ]}
      primaryAction={{
        component: <Button color="red" size="lg" text="Fördern" />,
        dropdownItems: [
          <Dropdown.Item
            option={{ value: 'Fördern', label: 'Fördern' }}
            onSelect={() => {}}
            key="fordern"
          />,
        ],
      }}
      secondaryAction={{
        component: <Button size="lg" text="Analysen anzeigen" />,
        dropdownItems: [
          <Dropdown.Link
            key="analysen"
            option={{ value: 'Analysen anzeigen', label: 'Analysen anzeigen' }}
            href="https://pinterest.com"
          />,
        ],
      }}
      dropdownAccessibilityLabel="Mehr Optionen"
    />
  );
}
