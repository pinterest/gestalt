// @flow strict
import React from 'react';
import Upsell from './Upsell.js';

const Valid = <Upsell message="Upsell message" />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Upsell nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Upsell />;
