import { ReactNode, useState } from 'react';
import { DefaultLabelProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  return (
    <DefaultLabelProvider
// @ts-expect-error - TS2740 - Type '{ ChartGraph: { accessibilityLabelPrefixText: string; defaultViewText: string; accessibleViewText: string; tabularData: string; accessibilityLabelDismissModal: string; tableSeriesText: string; tableXAxisText: string; tableYAxisText: string; downloadCsvButtonText: string; cancelButtonText: string; }; }' is missing the following properties from type '{ Accordion: { accessibilityCollapseLabel: string; accessibilityExpandLabel: string; }; ActivationCard: { accessibilityDismissButtonLabel: string; }; BannerOverlay: { accessibilityDismissButtonLabel: string; }; ... 17 more ...; Toast: { ...; }; }': Accordion, ActivationCard, BannerOverlay, BannerCallout, and 16 more.
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
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
            name: 'Women',
            'Users': 100,
            'Clickthroughs': 200,
          },
          {
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
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
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </DefaultLabelProvider>
  );
}
