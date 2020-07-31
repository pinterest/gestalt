// @flow strict
import React from 'react';
import Masonry from './Masonry.js';

const Item = () => <div />;
const Valid = <Masonry items={[]} comp={Item} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Masonry />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Masonry nonexisting={33} />;
