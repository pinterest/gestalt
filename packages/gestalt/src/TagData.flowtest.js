// @flow strict
import TagData from './TagData.js';

const Valid = <TagData text="Text Impressions" selected onTap={() => {}} />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TagData nonexisting={33} />;

const wrongColor = (
  // $FlowExpectedError[incompatible-type]
  <TagData text="Text Impressions" color="99" selected onTap={() => {}} />
);
