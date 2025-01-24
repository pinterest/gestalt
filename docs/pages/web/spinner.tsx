import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import delay from '../../examples/spinner/delay';
import doLocation from '../../examples/spinner/doLocation';
import dontLabel from '../../examples/spinner/dontLabel';
import dontMultiple from '../../examples/spinner/dontMultiple';
import dontWait from '../../examples/spinner/dontWait';
import doOverlay from '../../examples/spinner/doOverlay';
import doWait from '../../examples/spinner/doWait';
import grayscale from '../../examples/spinner/grayscale';
import label from '../../examples/spinner/label';
import localizationLabels from '../../examples/spinner/localizationLabels';
import main from '../../examples/spinner/main';
import white from '../../examples/spinner/white';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name="Primary Spinner example"
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - When loading or updating content on a surface.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - To communicate that a UI element, such as a button, is performing an action that takes a perceptible amount of time. Contact us if this is needed.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best Practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Only show Spinner if the expected wait time is perceptible — typically more than a second. Remember that wait times can vary based on the user's network connection."
            sandpackExample={
              <SandpackExample code={doWait} hideEditor name="Do - Wait" previewHeight={400} />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use Spinner if the wait time is likely longer than 10 seconds. Show incremental loading/completion progress instead."
            sandpackExample={
              <SandpackExample
                code={dontWait}
                hideControls
                hideEditor
                name="Don't - Wait"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Show Spinner where the content is being loaded or updated to create a clear association with where results will appear."
            sandpackExample={
              <SandpackExample
                code={doLocation}
                hideEditor
                name="Do - Location"
                previewHeight={400}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Show more than one Spinner at a time to avoid an overly-busy interface. Show a single Spinner over the collection of loading content instead."
            sandpackExample={
              <SandpackExample
                code={dontMultiple}
                hideControls
                hideEditor
                name="Don't - Multiple"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Screen underlying content when overlaid by Spinner."
            sandpackExample={
              <SandpackExample
                code={doOverlay}
                hideEditor
                name="Do - Overlay"
                previewHeight={400}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Display a loading label adjacent to Spinner when the label is redundant."
            sandpackExample={
              <SandpackExample
                code={dontLabel}
                hideControls
                hideEditor
                name="Don't - Label"
                previewHeight={400}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description={`
      \`accessibilityLabel\` should relate to the specific part of the product where Spinner is being used (e.g. "Loading homefeed" when used on the homefeed surface).

      Note that \`accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.

      If \`label\` is provided, \`accessibilityLabel\` is not needed. \`accessibilityLabel\` overrides \`label\` for assistive technologies. Therefore, avoid overriding \`label\` if \`accessibilityLabel\` is less specific.

      The override order for labels:  \`accessibilityLabel\` overrides \`label\`, \`label\` overrides default label from DefaultLabelProvider. DefaultLabelProvider is only accessible if there is not \`accessibilityLabel\` not \`label\`.
      `}
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`Note that \`accessibilityLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific. DefaultLabelProvider is override by \`label\`.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          columns={2}
          description={`
    By default, Spinner has color-change animation. Non-default color variant are \`grayscale\` and \`white\`.
  `}
          title="Colors"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={grayscale} layout="column" name="Delay variant" />
            }
            title="Grayscale"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={white} layout="column" name="Delay variant" />}
            title="White"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Spinner supports a label. See the [Accessibility guidelines](#Accessibility) for more information"
          title="Label"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={label} name="Label variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    By default, Spinner uses a 300ms delay to improve perceived performance. This can be disabled if needed.
  `}
          title="Delay"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={delay} name="Delay variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Spinner') },
  };
}
