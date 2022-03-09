// @flow strict
import { type Node } from 'react';
import { Box, Image, Flex, Heading, Link, Text } from 'gestalt';
import Card from '../components/Card.js';
import Markdown from '../components/Markdown.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function ContainerPage(): Node {
  return (
    <Page title="Development Guidelines">
      <PageHeader name="Development" showSourceLink={false} />
      <Card name="Set up your laptop">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Install a code editor - we recommend{' '}
                <Link href="https://code.visualstudio.com/download" inline target="blank">
                  <Text weight="bold">VS Code</Text>
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://github.com/creationix/nvm#install-script" target="blank">
                  Install nvm
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://github.com/nvm-sh/nvm#usage" target="blank">
                  Install node
                </Link>
              </Text>
            </li>
            <li>
              <Text weight="bold">
                <Link href="https://classic.yarnpkg.com/en/docs/install" target="blank">
                  Install yarn
                </Link>
              </Text>
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Set up your Gestalt repository">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Clone the repo: Fork the Gestalt repo and work off your forked repo, not the{' '}
                <code>pinterest/gestalt</code> repo.
              </Text>
            </li>
            <li>
              <Text>
                Once forked, clone to your local machine using the <code>SSH</code> option.
              </Text>
              <Markdown
                text="
~~~bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
~~~"
              />
            </li>
            <li>
              <Text>Use the correct Node.js version to setup the environment locally.</Text>
              <Markdown
                text="
~~~bash
cd gestalt && nvm use
~~~"
              />
              <Text>
                If the node version isn&apos;t available, you will need to{' '}
                <Link href="https://github.com/nvm-sh/nvm#usage" inline target="blank">
                  <Text weight="bold">install it</Text>
                </Link>
                .
              </Text>
            </li>
          </ul>

          <ul>
            <li>
              <Text>
                Install project dependencies. Do not run <code>npm install</code> because it will
                create a <code>package-lock.json</code> file (and also takes considerably longer).
              </Text>
              <Markdown
                text="
~~~bash
yarn
~~~"
              />
            </li>
            <li>
              <Text>
                Add <code>pinterest/gestalt</code> as a remote upstream (you&apos;ll only need to do
                this once).
              </Text>
              <Markdown
                text="
~~~bash
git remote add upstream git@github.com:pinterest/gestalt.git
~~~"
              />
            </li>
            <li>
              <Text>Check your remote configuration.</Text>
              <Markdown
                text="
~~~bash
git remote -v
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (fetch)
// origin    git@github.com:<YOUR_USERNAME>/gestalt.git (push)
// upstream    git@github.com:pinterest/gestalt.git (fetch)
// upstream    git@github.com:pinterest/gestalt.git (push)
~~~"
              />
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Set up Visual Studio Code">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>
                Open the new <code>/gestalt</code> folder with VS Code.
              </Text>
            </li>
            <li>
              <Text>
                Install the suggested VS Code extensions including <code>vs code-stylelint</code> to
                lint CSS files.
              </Text>
            </li>
            <li>
              <Text>If you want to automatically launch the docs when you open VS Code:</Text>
              <ul>
                <li>
                  <Text>
                    In VS Code type <code>CMD+Shift+p</code>
                  </Text>
                </li>
                <li>
                  <Text>Search and select Tasks: &quot;Manage Automatic Tasks in Folder&quot;</Text>
                </li>
                <li>
                  <Text>Select Allow &quot;Automatic Tasks in Folder&quot;</Text>
                </li>
                <li>
                  <Text>Relaunch VS Code</Text>
                </li>
              </ul>
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Run the Gestalt documentation server">
        <Flex alignItems="start" direction="column" gap={4}>
          <Text>
            Whenever you make changes to Gestalt, please test them out locally before making a PR.
          </Text>
          <Text>
            To start the documentation server, run <code>yarn start</code>, which will automatically
            open the docs in a new browser tab. If for some reason that tab doesn&apos;t launch,
            navigate to{' '}
            <Link inline href="http://localhost:8888" target="blank">
              http://localhost:8888
            </Link>
            .
          </Text>
        </Flex>
      </Card>
      <Card name="Create a pull request">
        <Flex alignItems="start" direction="column" gap={4}>
          <ul>
            <li>
              <Text>Rebase your local master branch.</Text>
              <Markdown
                text="
~~~bash
git fetch upstream
git rebase upstream/master
~~~"
              />
            </li>
            <li>
              <Text>
                Create and checkout a branch. Replace the text <code>&lt;feature-branch&gt;</code>{' '}
                with your branch name.
              </Text>
              <Markdown
                text="
~~~bash
git checkout -b <feature-branch> upstream/master
~~~"
              />
            </li>
            <li>
              <Text>Time to make changes to Gestalt!</Text>
              <ul>
                <li>
                  <Text>
                    If you are introducing a new component, run the scaffolding command to generate
                    the necessary files. Replace &lsquo;ComponentName&lsquo; with the name of your
                    component.
                    <Markdown
                      text="
~~~bash
yarn generate ComponentName
~~~"
                    />
                  </Text>
                </li>
                <li>
                  <Text>Run tests &amp; update snapshots.</Text>
                  <Markdown
                    text="
~~~bash
yarn jest -u
~~~"
                  />
                </li>
                <li>
                  <Text>
                    Run{' '}
                    <Link href="https://github.com/component-driven/cypress-axe" inline>
                      <Text weight="bold">Cypress accessibility integration tests</Text>
                    </Link>
                    . If any documentation examples are expected to fail accessibility testing, wrap
                    the example in a container with{' '}
                    <code>className=&quot;cypress-a11y-skip&quot;</code>.
                  </Text>
                  <Markdown
                    text="
~~~bash
yarn cypress open
~~~"
                  />
                </li>
                <li>
                  <Text>
                    Run{' '}
                    <Link href="https://github.com/meinaart/cypress-plugin-snapshots" inline>
                      <Text weight="bold">Cypress snapshot tests</Text>
                    </Link>
                    . If any component changes are expected to visually modify your component, you
                    must update the snapshot tests. In order to run the tests, you must start the
                    documentation server in one terminal and the Cypress testing interface in
                    another.
                  </Text>
                  <Markdown
                    text="
~~~bash
yarn start
~~~"
                  />
                  <Markdown
                    text="
~~~bash
yarn cypress open
~~~"
                  />
                  <Flex direction="column">
                    <Box as="figure" width={400}>
                      <Image
                        alt=""
                        color="white"
                        naturalHeight={262}
                        naturalWidth={400}
                        src="https://i.ibb.co/FY1pp4Y/Screen-Shot-2022-03-09-at-4-49-21-PM.png"
                      />
                      <Text size="100" align="center">
                        <Box as="figcaption" marginTop={3}>
                          {`Each failing snapshot test with display an error message. Click on
                          "Compare Snapshot". It will open a separate interface displaying the
                          expected and the received snapshots side by side for your comparison.`}
                        </Box>
                      </Text>
                    </Box>
                    <Box as="figure" width={400}>
                      <Image
                        alt=""
                        color="white"
                        naturalHeight={176}
                        naturalWidth={400}
                        src="https://i.ibb.co/7NyhPRD/Screen-Shot-2022-03-09-at-4-49-40-PM.png"
                      />
                      <Text size="100" align="center">
                        <Box as="figcaption" marginTop={3}>
                          {`On this new interface displaying the expected and the received snapshots,
                          click on the "Update snapshot" button to reconcile the changes.`}
                        </Box>
                      </Text>
                    </Box>
                  </Flex>
                </li>
                <li>
                  <Text>Update CSS flow types.</Text>
                  <Markdown
                    text="
~~~bash
yarn run flow-generate:css
~~~"
                  />
                </li>
                <li>
                  <Text>
                    If you are introducing breaking changes, create a{' '}
                    <Link href="#codemods" inline>
                      <Text weight="bold">codemod</Text>
                    </Link>{' '}
                    to help users migrate between versions.
                  </Text>
                </li>
              </ul>
            </li>

            <li>
              <Text>
                Commit the changes to your branch. Follow naming conventions for the PR:{' '}
                <code>&lt;Component&gt;: &lt;Commit Change Description&gt;</code>. Follow these
                steps again for any additional updates to your branch. When you are done, push your
                branch up.
              </Text>
              <Markdown
                text='
~~~bash
git add .
git commit -am "Component: Commit Change Description"
git push -f origin HEAD
~~~'
              />
            </li>
            <li>
              <Text>
                Go to{' '}
                <Link inline href="https://github.com/pinterest/gestalt" target="blank">
                  <Text weight="bold">https://github.com/pinterest/gestalt</Text>
                </Link>
                . A new banner will be displayed, click on &apos;Compare &amp; Create Pull
                Request&apos;.
              </Text>
            </li>
            <li>
              <Text>
                Add useful summary and screenshots. We provide a template for the summary to make
                sure you include all necessary information.
              </Text>
            </li>
            <li>
              <Text>
                Click on <code>Create Draft Pull Request</code> to create your PR. Once you are done
                committing changes to it, and all the CI tests have passed, click the &quot;Ready
                for Review&quot; button. (Keeping the PR as a draft until it is ready for review
                reduces the number of unneeded notifications for maintainers.) If you are a
                Pinterest employee, please let us know on Slack (#gestalt-web) that your PR is ready
                for review.
              </Text>
            </li>
            <li>
              <Text>
                Ensure checks pass on your Pull Request - having the &quot;Require Semver&nbsp;/
                Test (pull_request)&quot; check fail is expected, because a Gestalt maintainer needs
                to add a correct semver label. Check out our{' '}
                <Link href="#versioning" inline>
                  <Text weight="bold">versioning guidelines</Text>
                </Link>{' '}
                for more info.
              </Text>
            </li>
            <li>
              <Text>
                After a Gestalt maintainer adds a correct semver label and approves a Pull Request,
                the PR will be ready to merge. Coordinate with the reviewer to determine when the PR
                should be merged.
              </Text>
            </li>
          </ul>
        </Flex>
      </Card>
      <Card name="Guidelines">
        <Flex alignItems="start" direction="column" gap={4}>
          <Heading size="400">Scope of work</Heading>

          <Text>
            When pushing new changes to GitHub, your PR title should be aligned with the scope of
            your work. If your goal was to change the default color of a component, keep the scope
            of changes to that specific task and word the title to exactly reflect those changes.
          </Text>
          <Heading id="versioning" size="400">
            Versioning
          </Heading>
          <Text>
            Our versioning guidelines follow those outlined at{' '}
            <Link href="https://semver.org/" inline target="blank">
              <Text weight="bold">semver.org</Text>
            </Link>
            :
            <ul>
              <li>
                <em>Patch</em>: internal fixes, documentation changes, or package upgrades (anything
                that consumers of Gestalt don&apos;t need to worry about)
              </li>
              <li>
                <em>Minor</em>: any new functionality or properties for a component, or net-new
                components
              </li>
              <li>
                <em>Major</em>: any breaking change, whether it be in a specific component or the
                library itself (will most likely include a{' '}
                <Link href="#codemods" inline>
                  <Text weight="bold">codemod</Text>
                </Link>
                )
              </li>
            </ul>
          </Text>

          <Heading id="codemods" size="400">
            Codemods
          </Heading>
          <Text>
            When a release will cause breaking changes (in usage or in typing) we provide a codemod
            to ease the upgrade process. Codemods are organized by release number in{' '}
            <Text inline italic>
              /packages/gestalt-codemods
            </Text>
            . The name of the folder should reflect the resulting version number of your PR.
          </Text>
          <Text>
            Check out our{' '}
            <Link
              href="https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods"
              inline
              target="blank"
            >
              <Text weight="bold">codemod README</Text>
            </Link>{' '}
            for a walkthrough of the development process.
          </Text>
          <Text>
            Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt
            repo): anywhere the component to be updated is used. Example usage for a codebase using
            Flow:
          </Text>
          <Markdown
            text="
~~~jsx
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
~~~
"
          />
          <Text>
            For a dry run to see what the changes will be, add the{' '}
            <Text inline italic>
              -d
            </Text>{' '}
            (dry run) and{' '}
            <Text inline italic>
              -p
            </Text>{' '}
            (print output) flags (pipe stdout to a file for easier inspection if you like).
          </Text>
          <Heading size="400">Changes not allowed</Heading>
          <Text>Do not use the following CSS style properties:</Text>

          <ul>
            <li>
              <Text>
                <code>line-height</code>: Property in CSS that controls the space between lines of
                text. Not defining a <code>line-height</code> allows the browser to determine
                line-height based on language which prevents localization issues.
              </Text>
            </li>

            <li>
              <Text>
                <code>height</code>/<code>width</code>: Height &amp; width are CSS properties that
                can be used for determining the size of static assets such as an icon size. However,
                components that contain text data should not fix the height &amp; width of the
                component to prevent incorrect styling under different cases such as localization,
                longer texts, etc. Consider other alternatives such as padding to define different
                component sizes.
              </Text>
            </li>
          </ul>

          <Text>Avoid:</Text>

          <ul>
            <li>
              <Text>
                Boolean props: For example, instead of <code>isRTL: boolean</code> or{' '}
                <code>isStart: boolean</code> or <code>isEnd: boolean</code>, use more declarative
                props such as <code>layoutDirection: rtl | ltr</code> or{' '}
                <code>role: startInput | endInput</code>.
              </Text>
            </li>
          </ul>
        </Flex>
      </Card>
    </Page>
  );
}
