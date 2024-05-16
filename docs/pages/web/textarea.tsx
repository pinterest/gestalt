import {ReactNode} from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import defaultVariant from '../../examples/textarea/defaultVariant';
import disabledVariant from '../../examples/textarea/disabledVariant';
import dontSetRowPropToLessThan2 from '../../examples/textarea/dontSetRowPropToLessThan2';
import dontUsePlaceholderAsReplacementForLabel from '../../examples/textarea/dontUsePlaceholderAsReplacementForLabel';
import dontUsePlaceholderToProvideAny from '../../examples/textarea/dontUsePlaceholderToProvideAny';
import dontUseWhenTextInputIsASingle from '../../examples/textarea/dontUseWhenTextInputIsASingle';
import errorMessageVariant from '../../examples/textarea/errorMessageVariant';
import helperTextVariant from '../../examples/textarea/helperTextVariant';
import labelVisibilityVariant from '../../examples/textarea/labelVisibilityVariant';
import main from '../../examples/textarea/main';
import maximumLengthExample1 from '../../examples/textarea/maximumLengthExample1';
import maximumLengthExample2 from '../../examples/textarea/maximumLengthExample2';
import readOnlyVariant from '../../examples/textarea/readOnlyVariant';
import setHeightOfUsingRowTo from '../../examples/textarea/setHeightOfUsingRowTo';
import useAsAffordanceToInputLongerText from '../../examples/textarea/useAsAffordanceToInputLongerText';
import useHelperTextToProvideAdditional from '../../examples/textarea/useHelperTextToProvideAdditional';
import useLabelToClearlyDenoteWhat from '../../examples/textarea/useLabelToClearlyDenoteWhat';
import withRowsExample from '../../examples/textarea/withRowsExample';
import withTagsExample from '../../examples/textarea/withTagsExample';

export default function DocsPage(
  {
    generatedDocGen,
  }: {
    generatedDocGen: DocGen
  },
) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={main}
          hideEditor
          name={`Main ${generatedDocGen?.displayName} example`}
          previewHeight={150}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - Allowing users to input long portions of free-form text while ensuring all text entered remains visible.
          - Allowing users to type free-form options that get converted into [Tags](/web/tag) within the TextArea.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - For inputs that expect a certain format, like a date or email. Use a [DatePicker](/web/datepicker) or [TextField](/web/textfield) instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use TextArea as an affordance to input longer-form text content — typically anything longer than a brief sentence."
            sandpackExample={
              <SandpackExample
                code={useAsAffordanceToInputLongerText}
                hideEditor
                layout="column"
                name="Use As Affordance To Input Longer Text"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use TextArea when the text input is a single, non-sentence response — even in cases with long content. Use [TextField](/web/textfield) instead."
            sandpackExample={
              <SandpackExample
                code={dontUseWhenTextInputIsASingle}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use When Text Input Is A Single"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use `label` to clearly denote what information the user should input. Use `placeholder` sparingly as [they can erode usability of form fields](https://www.nngroup.com/articles/form-design-placeholders/)."
            sandpackExample={
              <SandpackExample
                code={useLabelToClearlyDenoteWhat}
                hideEditor
                layout="column"
                name="Use Label To Clearly Denote What"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use `placeholder` as a replacement for `label`, as this creates accessibility and usability issues."
            sandpackExample={
              <SandpackExample
                code={dontUsePlaceholderAsReplacementForLabel}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Placeholder As Replacement For Label"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use `helperText` to provide additional context that will aid the user in most effectively inputing information."
            sandpackExample={
              <SandpackExample
                code={useHelperTextToProvideAdditional}
                hideEditor
                layout="column"
                name="Use Helper Text To Provide Additional"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use `placeholder` to provide any information necessary to filling out the form field. Placeholder text disappears after the user begins entering data and should not contain crucial information."
            sandpackExample={
              <SandpackExample
                code={dontUsePlaceholderToProvideAny}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Placeholder To Provide Any"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>

        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Set the height of TextArea using `row` to ensure that the typical amount of text entered will be visible without needing to scroll."
            sandpackExample={
              <SandpackExample
                code={setHeightOfUsingRowTo}
                hideEditor
                layout="column"
                name="Set The Height Of Using Row To"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Set the `row` prop to less than 2. Use TextField when expecting only a single line of text."
            sandpackExample={
              <SandpackExample
                code={dontSetRowPropToLessThan2}
                hideControls
                hideEditor
                layout="column"
                name="Don't Set The Row Prop To Less Than 2"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen?.displayName}>
        <MainSection.Subsection
          description="Be sure to [provide instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) to help users understand how to complete the form and use individual form controls."
          title="Comprehension"
        />
        <MainSection.Subsection
          description="Ensure the labels are precise and concise. Labels should only describe the text field they are associated with, and they must be visible. If you cannot use the `label` prop, ensure the alternative label's `htmlFor` attribute matches the TextArea's `id`. Labels are properly associated when clicking the label focuses the TextArea."
          title="Labels"
        />
        <MainSection.Subsection
          description={`
    When providing a validation message, make sure the instructions are clear and help users complete the field. For example, "This field is required to submit". In addition, use the helper text to provide instructions to help users understand how to complete the text field or to indicate any needed input, allowed formats, timing limitations, or other pertinent information.

    These practices give users of assistive technologies more information about the form, helping them to fill it out.
  `}
          title="Validation"
        />
        <MainSection.Subsection
          description={`
    TextArea has conventional keyboard support.
    - Users relying on the keyboard expect to move focus to each TextArea by using the tab key or shift+tab when moving backwards.
    - Setting \`disabled\` will prevent TextArea from receiving keyboard focus or input.
  `}
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
    TextArea intentionally lacks support for autofocus. Generally speaking, autofocus interrupts normal page flow for screen readers making it an anti-pattern for accessibility.
  `}
          title="Autofocus"
        />
        <MainSection.Subsection
          description={`
    TextArea is commonly used as an input in forms alongside submit buttons. In these cases, users expect that pressing Enter or Return with the input focused will submit the form.

    Out of the box, TextArea doesn't expose an \`onSubmit\` handler or individual key event handlers due to the complexities of handling these properly. Instead, developers are encouraged to wrap TextField in a \`<form>\` with an \`onSubmit\` handler.
  `}
          title="onSubmit"
        />
      </AccessibilitySection>

      <LocalizationSection name={generatedDocGen?.displayName} noDefaultLabelProvider />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
      \`TextArea\` will expand to fill the width of the parent container by default.
    `}
          title="Default"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={defaultVariant} name="Default Example 1" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Whenever you want to provide more information about a form field, you should use \`helperText\`.`}
          title="Helper text"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={helperTextVariant} name="Helper Text Example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`In some cases, the label for a TextArea is represented in a different way visually, as demonstrated below. In these instances, you can set \`labelDisplay="hidden"\` to ensure TextArea is properly labeled for screen readers while using a different element to represent the label visually.`}
          title="Label visibility"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={labelVisibilityVariant} name="Label Visibility Example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      \`TextArea\` can be in read-only mode in order to present information to the user without allowing them to edit the content. Typically this variation is used to show content or information that the user does not have permission or access to edit.
    `}
          title="Read-only"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={readOnlyVariant} name="Read-Only Example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
      \`TextArea\` can be disabled to indicate the user is unable to interact with it, either by mouse or keyboard. Disabled fields do not need to pass contrast requirements, so do not use a \`disabled\` TextArea to present information to the user (use \`readOnly\` instead).
    `}
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabledVariant} name="Disabled Example" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`
TextArea can display an error message. Simply pass in an \`errorMessage\` when there is an error present and TextArea will handle the rest.

Don't use \`errorMessage\` to provide feedback on character count errors. See the [maximum length variant](https://gestalt.pinterest.systems/web/textarea#Maximum-length) for more details.`}
          title="Error message"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={errorMessageVariant} name="Error Message Example" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`TextArea supports the native [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength) input attribute. \`maxLength\` sets the maximum number of characters allowed to be entered by the user in TextArea. \`maxLength\` must be an integer value 0 or higher.

The user cannot exceed the maximum number of characters interacting with the component. Whenever possible, avoid setting initial values from the parent component's state that already exceed the \`maxLength\`.

When \`maxLength\` is passed to TextArea, the component displays a character counter as well as a [warning or problem Status](/web/status) when the user reaches or the prepopulated controlled value exceeds the maximum length of characters.

The first example shows an empty TextArea with \`maxLength\` set to 200 characters. The second example shows the warning and problem Status.`}
          title="Maximum length"
        >
          <MainSection.Card
            cardSize="sm"
            sandpackExample={
              <SandpackExample code={maximumLengthExample1} name="Maximum Length Example 1" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={maximumLengthExample2}
                name="Maximum Length Example 2"
                previewHeight={440}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
    You can include [Tag](/web/tag) elements in the input using the \`tags\` prop. You can use the \`rows\` prop to limit the number of lines for tags.

    Note that the \`TextArea\` component does not internally manage tags. That should be handled in the application state through the component's event callbacks. We recommend creating new tags on enter key presses, and removing them on backspaces when the cursor is in the beginning of the field. We also recommend filtering out empty tags.

    This example showcases the recommended behavior.`}
          title="With tags"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={withTagsExample} name="With Tags Example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
          The rows prop sets the number of rows shown in TextArea. The input will show a scrollbar if the content exceeds the rows limit.`}
          title="With rows"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={withRowsExample} name="With Rows Example" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[TextField](/web/textfield)**
      TextField is ideal for short-form, single answer text input.

      **[Tag](/web/tag)**
      Tag can be used in conjunction with TextArea to display separate elements of content.

      **[ComboBox](/web/combobox)**
      ComboBox + Tag is the recommended alternative to [TextArea + Tag](/web/textarea#With-tags) when selecting from a finite list list of items.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen
  }
}> {
  return {
    props: { generatedDocGen: await docGen('TextArea') },
  };
}
