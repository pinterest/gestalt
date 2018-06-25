import A11YCheck from './containers/A11YCheck.js';
import MasonryExample from './containers/MasonryExample.js';
import classicGridServerStyles from './containers/classicGridServerStyles.js';
import flexibleGridServerStyles from './containers/flexibleGridServerStyles.js';
import masonryPins from './utils/pins.js';

const RenderConfig = {
  A11y: {
    Component: A11YCheck,
  },
  FlexibleMasonry: {
    Component: MasonryExample,
    styles: flexibleGridServerStyles,
    props: { flexible: true, initialPins: masonryPins },
  },
  Masonry: {
    Component: MasonryExample,
    styles: classicGridServerStyles,
    props: { initialPins: masonryPins, virtualize: true },
  },
};

export default RenderConfig;
