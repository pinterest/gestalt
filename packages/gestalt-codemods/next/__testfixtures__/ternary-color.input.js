// @flow strict
import { Toast } from 'gestalt';

export default function TestComponent() {
  return (
    <Toast color={true ? 'red' : 'white'} text="Toasty McToasterFace" />
  );
}
