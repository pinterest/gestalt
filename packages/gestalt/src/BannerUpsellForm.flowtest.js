// @flow strict
import BannerUpsellForm from './BannerUpsellForm';
import TextField from './TextField';

const Valid = (
  <BannerUpsellForm
    onSubmit={() => {}}
    submitButtonAccessibilityLabel="Submit button"
    submitButtonText="Submit"
  >
    <TextField id="name" onChange={() => {}} placeholder="Name" />
  </BannerUpsellForm>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerUpsellForm />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <BannerUpsellForm nonexisting={33} />;
