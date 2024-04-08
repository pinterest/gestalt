// @flow strict
import TileData from './TileData';

const Valid = <TileData onTap={() => {}} selected title="Text Impressions" value="1.23M" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TileData nonexisting={33} />;

const wrongColor = (
  // $FlowExpectedError[incompatible-type]
  <TileData color="1" onTap={() => {}} selected title="Text Impressions" value="1.23M" />
);
