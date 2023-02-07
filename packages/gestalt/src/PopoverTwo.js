// @flow strict

import { type Node, useState, Fragment } from 'react';
import { usePopper } from 'react-popper';
import Box from './Box.js';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

function Example() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  console.log(attributes);

  return (
    <Fragment>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

      <Box
        ref={setPopperElement}
        style={styles.popper}
        dangerouslySetInlineStyle={{ __style: { backgroundColor: 'red' } }}
      >
        Popper element
        <Box ref={setArrowElement} style={styles.arrow} />
      </Box>
    </Fragment>
  );
}

/**
 * [PopoverTwo] https://gestalt.pinterest.systems/web/popovertwo component should be used for ... on the page.
 * ![PopoverTwo light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverTwo.spec.mjs-snapshots/PopoverTwo-chromium-darwin.png)
 * ![PopoverTwo dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverTwo-dark.spec.mjs-snapshots/PopoverTwo-dark-chromium-darwin.png)
 */
export default function PopoverTwo({ accessibilityLabel }: Props): Node {
  return <Example />;
}
