// @flow strict
import TileData from './TileData.js';

const Valid = <TileData title="Text Impressions" value="1.23M" selected onTap={() => {}} />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TileData nonexisting={33} />;

const wrongColor = (
  // $FlowExpectedError[incompatible-type]
  <TileData title="Text Impressions" color="1" value="1.23M" selected onTap={() => {}} />
);
