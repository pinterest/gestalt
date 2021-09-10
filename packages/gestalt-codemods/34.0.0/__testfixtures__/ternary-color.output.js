// @flow strict
import { Toast } from 'gestalt';

export default function TestComponent() {
  return (
    // eslint-disable-next-line no-constant-condition
    <Toast color={true ? 'red' : 'white'} text="Toasty McToasterFace" />
  );
}
