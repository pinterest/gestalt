// @flow strict-local
import { forwardRef, useImperativeHandle, useRef, type AbstractComponent, type Node } from 'react';
import { Box } from 'gestalt';

type Props = {||};

/**
 * [DateField](https://gestalt.pinterest.systems/web/DateField)
 *
 * ![DateField closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed.spec.mjs-snapshots/DateField-closed-chromium-darwin.png)
 * ![DateField closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed-dark.spec.mjs-snapshots/DateField-closed-dark-chromium-darwin.png)
 */
const DateFieldWithForwardRef: AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement,
>(function DatePicker(props: Props, ref): Node {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);

  return <Box height={50} width={50} color="errorBase" ref={innerRef} />;
});

DateFieldWithForwardRef.displayName = 'DateField';

export default DateFieldWithForwardRef;
