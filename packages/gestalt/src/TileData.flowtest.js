// @flow strict
import TileData from './TileData.js';

const Valid = <TileData />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TileData nonexisting={33} />;

// $FlowExpectedError[incompatible-type]
const wrongColor = <TileData selectedColor="my-no-good-color" />;
