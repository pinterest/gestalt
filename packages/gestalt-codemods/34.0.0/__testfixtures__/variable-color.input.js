// @flow strict
import { Toast } from 'gestalt';

export default function TestComponent() {
  const colorVar = 'red';

  return (
    <Toast color={colorVar} text="Toasty McToasterFace" />
  );
}
