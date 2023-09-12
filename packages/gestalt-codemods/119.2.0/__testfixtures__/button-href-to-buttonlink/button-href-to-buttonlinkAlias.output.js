import { ButtonLink, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        text="ButtonLink"
        accessibilityLabel="This Button was renamed to ButtonAlias"
        target="blank"
        href="https://www.pinterest.com"
        size="lg" />
    </Flex>
  );
}
