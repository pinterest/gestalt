// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  Datapoint,
  Dropdown,
  FixedZIndex,
  Layer,
  ModalAlert,
  PageHeader,
  Text,
} from 'gestalt';

const HEADER_ZINDEX = new FixedZIndex(10);
const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

export default function DoOverlayPage(): Node {
  const [showModal, setShowModal] = useState(true);

  return (
    <Box padding={3}>
      <PageHeader
        title="Ads overview"
        items={[
          <Datapoint
            size="md"
            title="Impressions"
            key="impressions"
            value="$1.25M"
            trend={{ value: 30, accessibilityLabel: 'Trending up' }}
          />,
          <Datapoint
            size="md"
            title="Engagement"
            key="engagement"
            value="10%"
            trend={{ value: 5, accessibilityLabel: 'Trending up' }}
          />,
        ]}
        primaryAction={{
          component: <Button color="red" size="lg" text="Promote" />,
          dropdownItems: [
            <Dropdown.Item
              key="promote"
              option={{ value: 'Promote', label: 'Promote' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="View analytics" />,
          dropdownItems: [
            <Dropdown.Link
              option={{ value: 'View analytics', label: 'View analytics' }}
              key="view-analytics"
              href="https://pinterest.com"
            />,
          ],
        }}
        dropdownAccessibilityLabel="More options"
      />
      {showModal && (
        <Layer zIndex={zIndex}>
          <ModalAlert
            accessibilityModalLabel="Delete board 70s Furniture"
            heading="Delete this board"
            primaryAction={{
              accessibilityLabel: 'Confirm delete board',
              label: 'Yes, delete',
              onClick: () => {},
            }}
            secondaryAction={{
              accessibilityLabel: 'Cancel board deletion',
              label: 'No, keep',
              onClick: () => {},
            }}
            onDismiss={() => {
              setShowModal((currVal) => !currVal);
            }}
          >
            <Text>
              Your board and all of its Pins will be deleted forever. Other Pinners who have access
              to this board will also lose access. This cannot be undone.
            </Text>
          </ModalAlert>
        </Layer>
      )}
    </Box>
  );
}
