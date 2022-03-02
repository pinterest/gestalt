// @flow strict
import ActivationCard from './ActivationCard.js';

const Valid = (
  <ActivationCard
    status="pending"
    statusMessage="Pending"
    title="Claiming your website"
    message="We will notify you via email as soon as your site has been successfully claimed"
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ActivationCard nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <ActivationCard />;
