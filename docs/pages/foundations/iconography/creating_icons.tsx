import { Link, List, Text } from 'gestalt';
import InternalOnlyIconButton from '../../../docs-components/InternalOnlyIconButton';
import MainSection from '../../../docs-components/MainSection';
import Page from '../../../docs-components/Page';
import PageHeader from '../../../docs-components/PageHeader';

export default function ToolingPage() {
  return (
    <Page title="Creating Icons">
      <PageHeader
        description="If an icon does not already exist to suit your needs, you can create a new icon and submit it to the Gestalt team for addition to our icon library."
        name="Creating icons"
        type="guidelines"
      />
      <MainSection name="Process">
        <List type="ordered">
          <List.Item
            text={
              <Text>
                First, check the{' '}
                <Link display="inline" href="/foundations/iconography/library" underline="always">
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
                  href="http://pinch.pinadmin.com/new-icon-guidelines"
                  underline="always"
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
                  href="http://pinch.pinadmin.com/new-icon-naming"
                  underline="always"
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
                  href="http://pinch.pinadmin.com/icon-grid-examples"
                  underline="always"
                >
                  grid examples
                </Link>
                <InternalOnlyIconButton />
                to help create new icons. Be sure to maintain proper{' '}
                <Link
                  display="inline"
                  href="http://pinch.pinadmin.com/icon-source-files"
                  underline="always"
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
