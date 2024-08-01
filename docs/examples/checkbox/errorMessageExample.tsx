import { Checkbox, Flex } from 'gestalt';

export default function CheckboxExample() {
  return (
    <Flex alignItems="start" direction="column" gap={6} height="100%" justifyContent="center">
      <Checkbox
        errorMessage="You must agree to the Terms and Conditions"
        id="error"
        label="I agree to the Terms and Conditions"
        name="error"
        onChange={() => {}}
      />
      <Checkbox
        checked
        errorMessage="You must read the privacy policy first!"
        id="error"
        label="I agree with the Privacy Policy"
        name="error"
        onChange={() => {}}
      />
    </Flex>
  );
}
