// @flow strict
import TagData from './TagData';

const Valid = <TagData onTap={() => {}} selected text="Text Impressions" />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <TagData nonexisting={33} />;

const wrongColor = (
  // $FlowExpectedError[incompatible-type]
  <TagData color="99" onTap={() => {}} selected text="Text Impressions" />
);
