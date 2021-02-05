// @flow strict
import React, { type Node } from 'react';
import MainSectionCard from './MainSectionCard.js';
import Card from './Card.js';
import MainSectionSubsection, { convertToSentenceCase } from './MainSectionSubsection.js';

type Props = {|
  children?: Node,
  description?: string,
  name: string,
  showHeading?: boolean,
|};

const MainSection = ({ children, description, name, showHeading = true }: Props): Node => {
  return (
    <Card name={convertToSentenceCase(name)} showHeading={showHeading} description={description}>
      {children}
    </Card>
  );
};

MainSection.Card = MainSectionCard;

MainSection.Subsection = MainSectionSubsection;
export default MainSection;
