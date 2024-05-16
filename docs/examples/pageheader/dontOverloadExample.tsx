import {Fragment, ReactNode, useState} from 'react';
import { Button, Datapoint, Dropdown, OverlayPanel, PageHeader, Text } from 'gestalt';

export default function DontOverloadExample() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <PageHeader
        dropdownAccessibilityLabel="More options"
        helperIconButton={{
          accessibilityControls: '',
          accessibilityExpanded: open,
          accessibilityLabel: 'Read more information about Ads overview',
          onClick: () => setOpen(true),
        }}
        helperLink={{
          text: 'Learn more.',
          accessibilityLabel: 'Learn more Pinterest.com',
          href: 'http://www.pinterest.com',
          onClick: () => setOpen(true),
        }}
        items={[
          <Datapoint
            key="impressions"
            size="md"
            title="Impressions"
            tooltipText="The number of times your ads were seen."
            trend={{ value: 30, accessibilityLabel: 'Trending up' }}
            value="$1.25M"
          />,
          <Datapoint
            key="engagement"
            size="md"
            title="Engagement"
            tooltipText="The number of times your ads were clicked."
            trend={{ value: 5, accessibilityLabel: 'Trending up' }}
            value="10%"
          />,
        ]}
        primaryAction={{
          component: <Button color="red" size="lg" text="Promote" />,
          dropdownItems: [
            <Dropdown.Item
              key="promote"
              onSelect={() => {}}
              option={{ value: 'Promote', label: 'Promote' }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="View analytics" />,
          dropdownItems: [
            <Dropdown.Link
              key="view-analytics"
              href="https://pinterest.com"
              option={{ value: 'View analytics', label: 'View analytics' }}
            />,
          ],
        }}
        subtext="5 active campaigns."
        title="Ads overview"
      />
      {open ? (
        <OverlayPanel
          accessibilityDismissButtonLabel="Close"
          accessibilityLabel="Example overlay panel for demonstration"
          heading="Guidance"
          onDismiss={() => setOpen(false)}
          size="md"
        >
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </OverlayPanel>
      ) : null}
    </Fragment>
  );
}
