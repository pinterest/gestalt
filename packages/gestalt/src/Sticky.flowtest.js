// @flow strict
import Sticky from './Sticky.js';
import { FixedZIndex } from './zIndex.js';

const ValidDefaultStickyType = <Sticky top={0}>Content</Sticky>;

const ValidZIndex = (
  <Sticky top={0} zIndex={new FixedZIndex(1)}>
    Content
  </Sticky>
);

const InValidZIndex = (
  // $FlowExpectedError[incompatible-type]
  <Sticky top={0} zIndex={1}>
    Content
  </Sticky>
);

// $FlowExpectedError[incompatible-type]
const MissingProp = <Sticky />;

const IncompatibleLegacyZIndexProp = (
  // $FlowExpectedError[incompatible-type]
  <Sticky top={0} dangerouslySetZIndex={1}>
    Content
  </Sticky>
);
