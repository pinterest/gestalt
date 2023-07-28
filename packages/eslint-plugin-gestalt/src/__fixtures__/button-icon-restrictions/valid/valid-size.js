import { ButtonLink } from 'gestalt';

export default function TestElement() {
  return (
    <Box>
      <Button color="white" iconEnd="arrow-down" size="lg" text="Menu" />
      <ButtonLink iconEnd="visit" size="lg" text="link" />
    </Box>
  );
}
