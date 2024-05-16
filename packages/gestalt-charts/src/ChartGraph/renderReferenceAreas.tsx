import { ReactNode } from 'react';
import { Rectangle, ReferenceArea as RechartsReferenceArea } from 'recharts';

export default function renderReferenceAreas({
  referenceAreas,
}: {
  referenceAreas: ReadonlyArray<{
    id: string;
    label: string;
    x1: string | number;
    x2: string | number;
    y1: string | number;
    y2: string | number;
    yAxisId: string;
    style?: 'default';
  }>;
}): ReadonlyArray<ReactNode> {
  return referenceAreas.map((values) => (
    // Recharts doesn't recognize wrappers on their components, therefore, needs to be build within ChartGraph
    <RechartsReferenceArea
      key={values.id}
      isFront
      shape={(props) => <Rectangle {...props} fill="url(#pattern-referencearea-01)" />}
      strokeOpacity={0.3}
      x1={values.x1}
      x2={values.x2}
      y1={values.y1}
      y2={values.y2}
      yAxisId={values.yAxisId}
    />
  ));
}
