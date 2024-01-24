// @flow strict
import BannerUpsellForm from './BannerUpsellForm';
import TextField from './TextField';

const Valid = (
  <BannerUpsellForm
    onSubmit={() => {}}
    submitButtonText="Submit"
    submitButtonAccessibilityLabel="Submit button"
  >
    <TextField id="name" placeholder="Name" onChange={() => {}} />
  </BannerUpsellForm>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <BannerUpsellForm />;

// $FlowExpectedError[prop-missing]
const InvalidProps = <BannerUpsellForm nonexisting={33} />;
