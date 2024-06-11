import { Fragment, useState } from 'react';
import { Image, OverlayPanel, PageHeader, Text } from 'gestalt';

export default function PageHeaderTitleExample() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <PageHeader
        badge={{ text: 'New', type: 'info', tooltip: { text: 'New integration' } }}
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
        title="Pinterest app"
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
