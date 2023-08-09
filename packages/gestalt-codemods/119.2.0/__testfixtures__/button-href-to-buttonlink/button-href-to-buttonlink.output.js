import { Button, ButtonLink, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button
        text="Button"
        accessibilityLabel="This Button is a normal button"
        size="lg" />
      <ButtonLink
        text="ButtonLink"
        accessibilityLabel="This is a new ButtonLink, which work as a Button acting as a link"
        target="blank"
        href="https://www.pinterest.com"
        size="lg" />
    </Flex>
  );
}
