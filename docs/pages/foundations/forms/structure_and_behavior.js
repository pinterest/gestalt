// @flow strict
import React, { type Node } from 'react';
import { Box, Image, Mask, SlimBanner, Table, Text } from 'gestalt';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function StructureBehaviorPage(): Node {
  return (
    <Page title="Structure and behavior">
      <PageHeader name="Structure and behavior" type="guidelines" />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - When prompting a person to submit information in text format.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - To present information that has already been submitted by a person. Use a list instead. If the information needs to be edited, provide an edit button and then show the information as a form once it is ready for text input.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Anatomy">
        <MainSection.Subsection
          description={`
          A form can contain a wide variety of elements, but the main thing is to organize them in a clear hierarchy.
`}
        />
        <Box maxWidth={600} maxHeight={802} borderStyle="sm" rounding={4}>
          <Mask rounding={4}>
            <Image
              alt="The parts of a form numbered to show corrolation with the descriptions of its anatomy."
              naturalHeight={4041}
              naturalWidth={3024}
              src="https://i.pinimg.com/originals/83/e9/ab/83e9ab46de0583d2cb0ca134e822e31b.png"
            />
          </Mask>
        </Box>

        <MainSection.Subsection
          title="1. Title"
          description="A form title informs someone of the primary task associated with the form."
        />
        <MainSection.Subsection
          title="2. Sections"
          description="Sections should be used to group form fields and controls in a logical way. This helps users more easily digest content and allows users to skim the contents of the form."
        />
        <MainSection.Subsection
          title="3. Form fields and controls"
          description="These components allow us to gather information from users when they fill out forms. Gestalt has a wide variety of form fields and other user inputs that can be used in forms. Some examples include check boxes, radio buttons, combo boxes. For a full list, see [Available components](/foundations/forms/available_components)"
        />
        <MainSection.Subsection
          title="4. Buttons"
          description="Buttons allow users to submit forms or perform other actions."
        />
        <MainSection.Subsection
          title="5. Navigation"
          description="Use a local, in-page navigation or table of contents to navigate between sections of a form and keep the control distinct from primary and side navigation."
        />
        <SlimBanner
          type="info"
          iconAccessibilityLabel="Information"
          message="A local TableofContents component coming soon!"
        />
      </MainSection>
      <MainSection name="Hierarchy">
        <MainSection.Subsection
          title="Form and section titles"
          description="Titles describe the form at a high level and should be the largest text size in the form hierarchy. We recommend Heading/lg (font size 600). The title can also be followed by subtext if additional context is needed with a recommended text size of Body/lg (font size 300).
          Section titles describe a group of form fields and controls within the form and should fit within the form hierarchy by being one header size smaller than the heading while remaining larger than form field text sizes. We recommend Heading/md (font size 500) for section headers. Subtext can be added to sections if needed, we recommend Body/lg (font size 300) for subtext."
        />
        <MainSection.Subsection title="Recommended text sizes" />
        <Table accessibilityLabel="Recommended text sizes">
          <Table.Header>
            <Table.Row>
              {['Item', 'Figma style', 'Design token', 'Color', 'Platform'].map((item) => (
                <Table.HeaderCell key={item}>
                  <Text size="200" weight="bold">
                    {item}
                  </Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {[
                'Title',
                'Heading/lg',
                '$font-size-600; $font-weight-semibold',
                '$color-text-default',
                'Web',
              ].map((item) => (
                <Table.Cell key={item}>
                  <Text size="200">{item}</Text>
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              {[
                'Section title',
                'Heading/md',
                '$font-size-500; $font-weight-semibold',
                '$color-text-default',
                'Web',
              ].map((item) => (
                <Table.Cell key={item}>
                  <Text size="200">{item}</Text>
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row>
              {[
                'Subtext',
                'Body/lg regular',
                '$font-size-300; $font-weight-normal',
                '$color-text-subtle',
                'Web',
              ].map((item) => (
                <Table.Cell key={item}>
                  <Text size="200">{item}</Text>
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Body>
        </Table>
      </MainSection>

      <MainSection name="Form fields and controls">
        <MainSection.Subsection description="Form fields and controls should match the text size determined by their individual components and be organized in a logical way to increase user comprehension." />
        <MainSection name="Buttons">
          <MainSection.Subsection
            title="Placement"
            description="Buttons should be at the bottom of the form.

            If a form is in the context of a page, buttons should be start-aligned and in line to the form contents."
          />
          <Box maxWidth={570} maxHeight={586} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="A form on a page with the buttons start-aligned along with the form text and controls."
                naturalHeight={1758}
                naturalWidth={1710}
                src="https://i.pinimg.com/originals/ea/2c/3b/ea2c3b5c9adc67ebfff55309f713d96e.png"
              />
            </Mask>
          </Box>
          <MainSection.Subsection description="However, if a form is in the context of a [Modal](../../web/modal) or [OverlayPanel](../../web/overlaypanel), end-aligned buttons are appropriate, in order to be consistent with placement of buttons in other overlays." />
          <Box maxWidth={570} maxHeight={565} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="A form in a modal with the buttons end-aligned consistent with other overlays."
                naturalHeight={2142}
                naturalWidth={2160}
                src="https://i.pinimg.com/originals/67/20/b9/6720b911077e4161ff3b840800fb7891.png"
              />
            </Mask>
          </Box>

          <MainSection.Subsection description="For consistency throughout Pinterest products we recommend that the primary button be to the right of the secondary button." />
          <MainSection.Subsection
            title="Sticky footers"
            description="As a general rule a sticky footer should not be used in order to reduce potential confusion in regards to the length of the form, but may be considered if a form is non-linear or if users are likely to review their entries before they submit the form."
          />
        </MainSection>

        <Box width="100%" marginBottom={12} marginTop={0}>
          <MainSection
            name="Spacing between sections and elements"
            description={`
          Vertical spacing helps define sections within forms and improves scannability. We recommend:
            - 40 px between form sections
            - 32 px between elements in a section
            `}
          />
          <Box maxWidth={672} maxHeight={1347} borderStyle="sm" rounding={4}>
            <Mask rounding={4}>
              <Image
                alt="Vertical spacing in forms."
                naturalHeight={4041}
                naturalWidth={2016}
                src="https://i.pinimg.com/originals/4f/38/0d/4f380dab1e0ce72f9de248a9d7e3de48.png"
              />
            </Mask>
          </Box>
        </Box>

        <MainSection
          name="Columns"
          description={`
          Forms should default to a single column as multi-column forms are more prone to misinterpretation, however some fields that are related can be placed next to each other. For example:
            - [first name] [mi] [last name]
            - [credit card number] [expiration date] [security code]
            - [city] [state/province] [zip code]
            `}
        />
      </MainSection>
      <MainSection.Subsection columns={2}>
        <MainSection.Card
          cardSize="md"
          type="do"
          description="Arrange forms in a single column with only closely related fields in two columns"
        >
          <Box width="100%" height="100%" overflow="hidden">
            <Image
              alt="A form in a single column."
              naturalHeight={2598}
              naturalWidth={2472}
              src="https://i.pinimg.com/originals/f9/1d/8b/f91d8b363213721ffb9514d031bd6fae.png"
            />
          </Box>
        </MainSection.Card>
        <MainSection.Card
          cardSize="md"
          type="don't"
          description="Arrange all form fields in two columns as that is harder to complete."
        >
          <Box width="100%" height="100%" overflow="hidden">
            <Image
              alt="A form in two columns."
              naturalHeight={2268}
              naturalWidth={2472}
              src="https://i.pinimg.com/originals/79/9a/8b/799a8b0989f47dad17c5dc86bae5368d.png"
            />
          </Box>
        </MainSection.Card>
      </MainSection.Subsection>
      <MainSection name="Behavior">
        <MainSection.Subsection
          title="When to enable buttons"
          description="Disabling buttons in forms—especially in longer formscan cause frustration since it can be difficult for users to find what they missed. We recommend that for most forms buttons remain enabled and return errors if the form requirements are not met."
        />
        <MainSection.Subsection
          title="When to disable buttons"
          description="If a form is very short and all contents of the form can be viewed without scrolling buttons may be disabled until all requirements are met. This is especially true for forms that only require 1–2 inputs, or where a user must acknowledge via a checkbox that they understand the consequences of submitting a form."
        />
        <Box maxWidth={375} maxHeight={780} marginBottom={12} marginTop={2}>
          <Image
            alt="A simple form with a text field and a checkbox and a disabled button."
            naturalHeight={2130}
            naturalWidth={1212}
            src="https://i.pinimg.com/originals/b2/a4/dd/b2a4ddb23378d874303c470eac34817b.png"
          />
        </Box>
      </MainSection>

      <MainSection name="Error handling">
        <MainSection.Subsection
          title="In Form components"
          description="Error handling is automatically taken care of within form components like [TextField](../../web/textfield), [RadioGroup](../../web/radiogroup) and [Checkbox](../../web/checkbox)"
        />
        <MainSection.Subsection
          title="Across an entire form"
          description="In longer forms, it can help to add a SlimBanner to the top of the form that alerts users about various form errors."
        />
        <Box maxWidth={960} maxHeight={579}>
          <Image
            alt="The bottom of the form where we can see buttons."
            naturalHeight={2700}
            naturalWidth={4476}
            src="https://i.pinimg.com/originals/3b/95/d2/3b95d2bcae0eaa75ecd78e2df874bfe3.png"
          />
        </Box>
      </MainSection>
    </Page>
  );
}
