// @flow strict
import ActivationCard from './ActivationCard';

const Valid = (
  <ActivationCard
    message="We will notify you via email as soon as your site has been successfully claimed"
    status="pending"
    statusMessage="Pending"
    title="Claiming your website"
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ActivationCard nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <ActivationCard />;
