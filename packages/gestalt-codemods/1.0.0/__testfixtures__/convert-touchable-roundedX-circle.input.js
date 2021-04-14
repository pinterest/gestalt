// @flow strict
import { Touchable } from 'gestalt';

export default function Circle() {
  return (
    <Touchable onTouch={() => {}} shape="circle">
      circle
    </Touchable>
  );
}
