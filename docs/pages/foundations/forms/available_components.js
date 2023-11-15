// @flow strict
import { type Node as ReactNode } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';
import SandpackExample from '../../../docs-components/SandpackExample.js';
import checkbox from '../../../examples/checkbox/main.js';
import combobox from '../../../examples/combobox/main.js';
import datepicker from '../../../examples/datepicker/main.js';
import fieldset from '../../../examples/fieldset/main.js';
import numberfield from '../../../examples/numberfield/main.js';
import radiogroup from '../../../examples/radiogroup/main.js';
import selectlist from '../../../examples/selectlist/main.js';
import textarea from '../../../examples/textarea/main.js';
import textfield from '../../../examples/textfield/main.js';

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
          title="TextField"
          description={`TextField is used for single lines of text. It also allows for other types of inputs like passwords and Tags.

[Go to the TextField component](/web/textfield)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={textfield}
                name="TextField example"
                hideEditor
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="TextArea"
          description={`TextArea is used for inputting longer, paragraph-length text. An example is asking users to write out their opinion of a feature.

[Go to the TextArea component](/web/textarea)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={textarea}
                name="TextArea example"
                hideEditor
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="NumberField"
          description={`NumberField allows for numerical input only.

[Go to the NumberField component](/web/numberfield)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={numberfield}
                name="NumberField example"
                hideEditor
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="ComboBox"
          description={`ComboBox is the combination of a Textfield and an associated Dropdown that allows the user to filter a list when selecting an option.

[Go to the ComboBox component](/web/combobox)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={combobox}
                name="ComboBox example"
                hideEditor
                previewHeight={LG_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="DatePicker"
          description={`DatePicker is used when the user has to select a date or date range..

[Go to the DatePicker component](/web/datepicker)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={datepicker}
                name="DatePicker example"
                hideEditor
                previewHeight={XL_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="SelectList"
          description={`SelectList displays a list of actions or options using the browser’s native select.

[Go to the SelectList component](/web/selectlist)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={selectlist}
                name="SelectList example"
                hideEditor
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="CheckBox"
          description={`SelCheckbox is used for multi-select.

[Go to the CheckBox component](/web/checkbox)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={checkbox}
                name="CheckBox example"
                hideEditor
                previewHeight={SM_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="RadioGroup"
          description={`RadioGroup is used for single-select.

[Go to the RadioGroup component](/web/radiogroup)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={radiogroup}
                name="RadioGroup example"
                hideEditor
                previewHeight={MD_PREVIEW_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Fieldset"
          description={`Fieldset creates a fieldset and legend for a group of related form items, like CheckBoxes, in order to clearly indicate related form items.

[Go to the Fieldset component](/web/fieldset)`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={fieldset}
                name="FieldSet example"
                hideEditor
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
