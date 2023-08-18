import { Button as ButtonAlias, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonAlias
        text="ButtonLink"
        accessibilityLabel="This Button was renamed to ButtonAlias"
        role="link"
        target="blank"
        href="https://www.pinterest.com"
        size="lg" />
    </Flex>
  );
}
