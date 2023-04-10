// @flow strict
import TileData from './TileData.js';

const Valid = <TileData />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TileData nonexisting={33} />;
