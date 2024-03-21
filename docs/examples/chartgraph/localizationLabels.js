// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { DefaultLabelProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        ChartGraph: {
          accessibilityLabelPrefixText: 'ChartGraph',
          defaultViewText: 'Standard-Ansichtsmodus.',
          accessibleViewText: 'Ansichtsmodus für Barrierefreiheit.',
          tabularData: 'Tabellarische Darstellung.',
          accessibilityLabelDismissModal: 'Tabellendarstellung modal aufheben.',
          tableSeriesText: 'Reihe.',
          tableXAxisText: 'x-Achsen-Werte.',
          tableYAxisText: 'y-Achsen-Werte.',
          downloadCsvButtonText: 'Als .csv herunterladen.',
          cancelButtonText: 'Abbrechen.',
        },
      }}
    >
      <ChartGraph
        accessibilityLabel="Beispiel für ein Liniendiagramm"
        data={[
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
        ]}
        description="Leistung im Laufe der Zeit. Impressionen geben an, wie oft Ihr Pin auf dem Bildschirm angezeigt wurde."
        elements={[
          { type: 'bar', id: 'Users' },
          { type: 'bar', id: 'Clickthroughs' },
        ]}
        labelMap={{
          'Women': 'Frauen',
          'Men': 'Männer',
          'Users': 'Benutzer',
          'Clickthroughs': 'Durchklicken',
        }}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        title="Eindrücke"
        type="bar"
        visualPatternSelected={visualPatternSelected}
      />
    </DefaultLabelProvider>
  );
}
