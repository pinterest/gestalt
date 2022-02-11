// @flow strict
import Masonry from './Masonry.js';

function Item() {
  return <div />;
}
const Valid = <Masonry items={[]} comp={Item} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Masonry />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Masonry nonexisting={33} />;
