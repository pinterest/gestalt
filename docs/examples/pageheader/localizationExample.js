// @flow strict
import React, { type Node } from 'react';
import { Button, Datapoint, Dropdown, PageHeader } from 'gestalt';
import LINKS from '../../docs-components/LINK_REPOSITORY.js';

export default function PageHeaderLocalizationExample(): Node {
  return (
    <PageHeader
      title="Anzeigenübersicht"
      subtext="5 aktive Kampagnen."
      helperLink={{
        text: 'Mehr erfahren.',
        accessibilityLabel: 'Erfahren Sie mehr auf Pinterest.com',
        href: LINKS.PINTEREST_CANONICAL,
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
            href={LINKS.PINTEREST_CANONICAL}
          />,
        ],
      }}
      dropdownAccessibilityLabel="Mehr Optionen"
    />
  );
}
