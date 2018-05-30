import A11YCheck from '../containers/A11YCheck';
import MasonryExample from '../containers/MasonryExample';
import classicGridServerStyles from '../containers/classicGridServerStyles';
import flexibleGridServerStyles from '../containers/flexibleGridServerStyles';
import masonryPins from './pins';

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
