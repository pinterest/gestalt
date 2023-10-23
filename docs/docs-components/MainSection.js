// @flow strict
import { type Node } from 'react';
import Card from './Card.js';
import MainSectionCard from './MainSectionCard.js';
import MainSectionSubsection from './MainSectionSubsection.js';

type Props = {
  badge?: { text: string, tooltipText: string },
  children?: Node,
  description?: string,
  name: string,
  showHeading?: boolean,
};

function MainSection({ badge, children, description, name, showHeading = true }: Props): Node {
  return (
    <Card badge={badge} name={name} showHeading={showHeading} description={description}>
      {children}
    </Card>
  );
}
MainSection.Card = MainSectionCard;
MainSection.Subsection = MainSectionSubsection;
export default MainSection;
