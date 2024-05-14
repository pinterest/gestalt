import { Box, Checkbox } from 'gestalt';

export default function CheckboxExample() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Checkbox
        errorMessage="You must agree to the Terms and Conditions"
        id="error"
        label="I agree to the Terms and Conditions"
        name="error"
        onChange={() => {}}
      />
    </Box>
  );
}
