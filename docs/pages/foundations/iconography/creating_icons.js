// @flow strict
import { type Node } from 'react';
import { Link, List, Text } from 'gestalt';
import InternalOnlyIconButton from '../../../docs-components/InternalOnlyIconButton.js';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function ToolingPage(): Node {
  return (
    <Page title="Creating Icons">
      <PageHeader
        name="Creating icons"
        type="guidelines"
        description="If an icon does not already exist to suit your needs, you can create a new icon and submit it to the Gestalt team for addition to our icon library."
      />
      <MainSection name="Process">
        <List type="ordered">
          <List.Item
            text={
              <Text>
                First, check the{' '}
                <Link display="inline" underline="always" href="/foundations/iconography/library">
                  Gestalt Icon Library
                </Link>{' '}
                to look for any icons that may already fit your design.
              </Text>
            }
          />
          <List.Item
            text={
              <Text>
                If a new icon is needed, review the{' '}
                <Link
                  display="inline"
                  underline="always"
                  href="http://pinch.pinadmin.com/new-icon-guidelines"
                >
                  Icon guidelines
                </Link>
                <InternalOnlyIconButton /> to understand the best practices and design requirements
                for new icons. Be sure to tell the Gestalt team what icon you plan to design and its
                purpose.
              </Text>
            }
          />
          <List.Item
            text={
              <Text>
                Next, review the{' '}
                <Link
                  display="inline"
                  underline="always"
                  href="http://pinch.pinadmin.com/new-icon-naming"
                >
                  icon naming guidelines
                </Link>
                <InternalOnlyIconButton />
                to figure out the best name for the new icon in order to aid discoverability and
                maintain our current Gestalt naming patterns.
              </Text>
            }
          />
          <List.Item
            text={
              <Text>
                While designing, utilize the provided{' '}
                <Link
                  display="inline"
                  underline="always"
                  href="http://pinch.pinadmin.com/icon-grid-examples"
                >
                  grid examples
                </Link>
                <InternalOnlyIconButton />
                to help create new icons. Be sure to maintain proper{' '}
                <Link
                  display="inline"
                  underline="always"
                  href="http://pinch.pinadmin.com/icon-source-files"
                >
                  source files
                </Link>
                <InternalOnlyIconButton />. The unmerged source files allow other designers to make
                updates easily or use a current icon as a base for a new icon.
              </Text>
            }
          />
          <List.Item text="Once you're finished with the design, reach out to the Gestalt team and they'll work with you to add the new icon to the library." />
        </List>
      </MainSection>
    </Page>
  );
}
