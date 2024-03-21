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
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: <Icon accessibilityLabel="Pin" color="default" icon="pinterest" size={32} />,
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
            label="Full name"
            labelDisplay="hidden"
            onChange={(e) => setValue(e.value)}
            placeholder="Name"
            value={value}
          />
        </BannerUpsell.Form>
      </BannerUpsell>
    </Box>
  );
}
