// @flow strict
import React, { type Node } from 'react';
import { Image, PageHeader, Sheet, Text } from 'gestalt';

export default function PageHeaderTitleExample(): Node {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <PageHeader
        title="Pinterest app"
        badge={{ text: 'New', tooltipText: 'New integration' }}
        helperIconButton={{
          accessibilityControls: '',
          accessibilityExpanded: false,
          accessibilityLabel: 'Read more information about the new Pinterest integration',
          onClick: () => setOpen(true),
        }}
        thumbnail={
          <Image
            alt="square"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/LQc8ynn/image.png"
          />
        }
      />
      {open ? (
        <Sheet
          accessibilityDismissButtonLabel="Close"
          accessibilitySheetLabel="Example sheet for demonstration"
          heading="Guidance"
          onDismiss={() => setOpen(false)}
          size="md"
        >
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </Sheet>
      ) : null}
    </React.Fragment>
  );
}
