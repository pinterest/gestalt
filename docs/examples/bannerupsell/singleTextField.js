// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { BannerUpsell, Box, Icon, TextField } from 'gestalt';

type SubmitHandler = ({
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
}) => void;

export default function FormExample(): ReactNode {
  const [value, setValue] = useState('');
  const handleSubmit: SubmitHandler = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon icon="pinterest" accessibilityLabel="Pin" color="default" size={32} />,
        }}
        message="Earn $60 of ads credit, and give $30 of ads credit to a friend"
        title="Give $30, get $60 in ads credit"
      >
        <BannerUpsell.Form
          onSubmit={handleSubmit}
          submitButtonAccessibilityLabel="Submit name for ads credit"
          submitButtonText="Submit"
        >
          <TextField
            id="nameField"
            onChange={(e) => setValue(e.value)}
            placeholder="Name"
            value={value}
            label="Full name"
            labelDisplay="hidden"
          />
        </BannerUpsell.Form>
      </BannerUpsell>
    </Box>
  );
}
