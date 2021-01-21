// @flow strict
import React, { type Node } from 'react';
import MainSectionCard from './MainSectionCard.js';
import Card from './Card.js';
import MainSectionSubsection from './MainSectionSubsection.js';

type Props = {|
  description?: string,
  name: string,
  children: Node,
|};

const MainSection = ({ children, description, name }: Props): Node => {
  return (
    <Card name={name} description={description}>
      {children}
    </Card>
  );
};

MainSection.Card = MainSectionCard;

MainSection.Subsection = MainSectionSubsection;
export default MainSection;
