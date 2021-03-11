// @flow strict
import { Touchable } from 'gestalt';

export default function Circle() {
  return (
    // Disabling the eslint rule because yes it's wrong to write code like this but it's in the codebase already
    // eslint-disable-next-line react/jsx-curly-brace-presence
    <Touchable rounding="circle">
      circle
    </Touchable>
  );
}
