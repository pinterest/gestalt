// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';
import SandpackExample from '../../../docs-components/SandpackExample';
import checkbox from '../../../examples/checkbox/main';
import combobox from '../../../examples/combobox/main';
import datepicker from '../../../examples/datepicker/main';
import fieldset from '../../../examples/fieldset/main';
import numberfield from '../../../examples/numberfield/main';
import radiogroup from '../../../examples/radiogroup/main';
import selectlist from '../../../examples/selectlist/main';
import textarea from '../../../examples/textarea/main';
import textfield from '../../../examples/textfield/main';

const SM_PREVIEW_HEIGHT = 150;
const MD_PREVIEW_HEIGHT = 200;
const LG_PREVIEW_HEIGHT = 400;
const XL_PREVIEW_HEIGHT = 500;

export default function DocsPage(): ReactNode {
  return (
    <Page title="Available form components">
      <PageHeader name="Available form components" type="guidelines" />

      <MainSection name="Components">
        <MainSection.Subsection
          description={`TextField is used for single lines of text. It also allows for other types of inputs like passwords and Tags.

[Go to the TextField component](/web/textfield)`}
          title="TextField"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={textfield}
                hideEditor
                name="TextField example"
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`TextArea is used for inputting longer, paragraph-length text. An example is asking users to write out their opinion of a feature.

[Go to the TextArea component](/web/textarea)`}
          title="TextArea"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={textarea}
                hideEditor
                name="TextArea example"
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`NumberField allows for numerical input only.

[Go to the NumberField component](/web/numberfield)`}
          title="NumberField"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={numberfield}
                hideEditor
                name="NumberField example"
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ComboBox is the combination of a Textfield and an associated Dropdown that allows the user to filter a list when selecting an option.

[Go to the ComboBox component](/web/combobox)`}
          title="ComboBox"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={combobox}
                hideEditor
                name="ComboBox example"
                previewHeight={LG_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`DatePicker is used when the user has to select a date or date range..

[Go to the DatePicker component](/web/datepicker)`}
          title="DatePicker"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={datepicker}
                hideEditor
                name="DatePicker example"
                previewHeight={XL_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`SelectList displays a list of actions or options using the browser’s native select.

[Go to the SelectList component](/web/selectlist)`}
          title="SelectList"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={selectlist}
                hideEditor
                name="SelectList example"
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`SelCheckbox is used for multi-select.

[Go to the CheckBox component](/web/checkbox)`}
          title="CheckBox"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={checkbox}
                hideEditor
                name="CheckBox example"
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`RadioGroup is used for single-select.

[Go to the RadioGroup component](/web/radiogroup)`}
          title="RadioGroup"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={radiogroup}
                hideEditor
                name="RadioGroup example"
                previewHeight={MD_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Fieldset creates a fieldset and legend for a group of related form items, like CheckBoxes, in order to clearly indicate related form items.

[Go to the Fieldset component](/web/fieldset)`}
          title="Fieldset"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={fieldset}
                hideEditor
                name="FieldSet example"
                previewHeight={MD_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Heading](/web/heading)**
To use as a main title, and for subsection titles in your form

**[Text](/web/text)**
To use as helper text or subtext underneath form titles

**[Button](/web/button)**
For submitting a form or performing other actions to the form
      `}
        />
      </MainSection>
    </Page>
  );
}
