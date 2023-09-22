// @flow strict
import { type Node } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Women',
      'Users': 100,
      'Clickthroughs': 200,
    },
    {
      name: 'Men',
      'Users': 200,
      'Clickthroughs': 300,
    },
  ];

  return (
    <ChartGraph
      title="Eindrücke"
      description="Leistung im Laufe der Zeit. Impressionen geben an, wie oft Ihr Pin auf dem Bildschirm angezeigt wurde."
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      accessibilityLabel="Beispiel für ein Liniendiagramm"
      type="bar"
      data={data}
      labelMap={{
        'Women': 'Frauen',
        'Men': 'Männer',
        'Users': 'Benutzer',
        'Clickthroughs': 'Durchklicken',
      }}
      elements={[
        { type: 'bar', id: 'Users' },
        { type: 'bar', id: 'Clickthroughs' },
      ]}
    />
  );
}
