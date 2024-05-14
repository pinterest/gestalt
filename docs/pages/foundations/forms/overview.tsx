import React from 'react';
import { Box, Image } from 'gestalt';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function FormsLayoutOverview() {
  return (
    <Page title="Forms layout overview">
      <PageHeader
        description={`Forms are a common UI pattern found across Pinterest products. We use them to gather information from users and should be clear and easy to navigate.
        `}
        name="Forms layout overview"
        type="guidelines"
      />
      <MainSection name="Principles">
        <MainSection.Subsection
          description={`In order to make forms easy for users to scan and fill out, it’s critical that a clear information hierarchy and sectioning (when needed) is used throughout the form. Consistent form and section headers in addition to consistent spacing between form elements controls and sections should make it easy to tell the relationship between groups of information.
`}
          title="Clear information hierarchy"
        />
        <MainSection.Subsection
          description={`
          Forms should be organized in a way that makes sense to the user’s mental model and current workflow.
`}
          title="Logical and predictable"
        />
      </MainSection>

      <MainSection name="Use cases">
        <MainSection.Subsection
          description={`
          A Pinner, merchant, creator, or advertiser may engage in a variety of types of forms throughout their journey with Pinterest.
`}
        />
        <MainSection.Subsection
          description="An advertiser wishes to update their profile information and navigates to the settings page. Here they can enter new information."
          title="Pattern use case 1: In-page forms"
        />
        <Box maxHeight={579} maxWidth={960}>
          <Image
            alt="The top of a long form as part of a setting screen."
            naturalHeight={2700}
            naturalWidth={4476}
            src="https://i.pinimg.com/originals/d2/07/9b/d2079ba83d5910e6add8ff3a4b91ea8b.png"
          />
        </Box>
      </MainSection>
      <Box marginBottom={8} marginTop={-7} width="100%">
        <MainSection.Subsection description="The form buttons are at the end of the form to make the length of the form clear." />
        <Box maxHeight={579} maxWidth={960}>
          <Image
            alt="The bottom of the form where we can see buttons."
            naturalHeight={2700}
            naturalWidth={4476}
            src="https://i.pinimg.com/originals/59/3b/76/593b76396c9a43c966c67a448ca00b69.png"
          />
        </Box>
      </Box>
      <Box marginBottom={0} marginTop={-7} width="100%">
        <MainSection.Subsection
          description="Smaller, simpler forms can be shown in modals or side sheets."
          title="Pattern use case 2: Forms in modals and side sheets"
        />

        <Box marginBottom={0} marginTop={2} maxHeight={579} maxWidth={960}>
          <Image
            alt="A lighter form inside of a modal."
            naturalHeight={2700}
            naturalWidth={4476}
            src="https://i.pinimg.com/originals/6e/87/3d/6e873db3fd5baec9ef591153b0a0dfd9.png"
          />
        </Box>
        <MainSection.Subsection description="This is especially helpful when we want users not to fully leave the context of the page they were on when the form was launched." />
      </Box>
    </Page>
  );
}
