// @flow strict
import { type Node, useState } from 'react';
import { Box, Icon, TextField, Upsell } from 'gestalt';

type SubmitHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
|}) => void;

export default function FormExample(): Node {
  const [value, setValue] = useState('');
  const handleSubmit: SubmitHandler = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
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
        <Upsell.Form
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
        </Upsell.Form>
      </Upsell>
    </Box>
  );
}
