import { Box, TextField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <TextField
        id="textfieldexamplevisibleLabel"
        label="First name"
        labelDisplay="visible"
        onChange={() => {}}
        size="lg"
      />
    </Box>
  );
}
