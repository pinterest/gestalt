// @flow strict
import React, { type Node } from 'react';
import { Heading, Link, Stack, Text } from 'gestalt';
import Card from './components/Card.js';
import Markdown from './components/Markdown.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = c => cards.push(c);

card(<PageHeader name="Development" showSourceLink={false} />);

card(
  <Card name="Set up your laptop">
    <Stack gap={4}>
      <ul>
        <li>
          <Text>
            Install a source-code editor. We recommend{' '}
            <Link href="https://code.visualstudio.com/download" inline>
              <Text weight="bold">VSCode</Text>
            </Link>
          </Text>
        </li>
        <li>
          <Text weight="bold">
            <Link href="https://github.com/creationix/nvm#install-script">
              Install nvm
            </Link>
          </Text>
        </li>
        <li>
          <Text weight="bold">
            <Link href="https://github.com/nvm-sh/nvm#usage">Install node</Link>
          </Text>
        </li>
      </ul>
    </Stack>
  </Card>
);

card(
  <Card name="Set up your Gestalt Repository">
    <Stack gap={4}>
      <ul>
        <li>
          <Text>
            Clone the Repo: Fork the Gestalt Repo and work of your forked repo,
            not the <code>pinterest/gestalt</code> repo.
          </Text>
        </li>
        <li>
          <Text>
            Once forked, clone to your local machine using the <code>SSH</code>{' '}
            option.
          </Text>
          <Markdown
            text="
~~~bash
git clone git@github.com:<YOUR_USERNAME>/gestalt.git
~~~"
          />
        </li>
        <li>
          <Text>
            Use the correct Node.js version to setup the environment locally.
          </Text>
          <Markdown
            text="
~~~bash
cd gestalt && nvm use
~~~"
          />
        </li>
      </ul>
      <Text>
        If the node version isn&apos;t available,{' '}
        <Link href="https://github.com/nvm-sh/nvm#usage" inline>
          <Text weight="bold">install it locally</Text>
        </Link>
        .
      </Text>

      <ul>
        <li>
          <Text>
            Install project dependencies. Do not run <code>npm install</code>{' '}
            because it will create a <code>package-lock.json</code> file.
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
            Add <code>pinterest/gestalt</code> as a remote upstream (do this
            once).
          </Text>
          <Markdown
            text="
~~~bash
git remote add upstream git@github.com:pinterest/gestalt.git
~~~"
          />
        </li>
        <li>
          <Text>Check your remote.</Text>
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
    </Stack>
  </Card>
);

card(
  <Card name="Set up VSCode">
    <Stack gap={4}>
      <ul>
        <li>
          <Text>
            Open the new <code>/gestalt</code> folder with VSCode.
          </Text>
        </li>
        <li>
          <Text>
            Install the suggested VSCode extensions including{' '}
            <code>vscode-stylelint</code> to lint CSS files.
          </Text>
        </li>
      </ul>
    </Stack>
  </Card>
);

card(
  <Card name="Run the Gestalt Documentation Server">
    <Stack gap={4}>
      <Text>
        Whenever you make changes to Gestalt, please test them out locally
        before making a PR.
      </Text>
      <Text>
        To start the documentation server run <code>yarn start</code> &amp; open{' '}
        <Link inline href="http://localhost:8888">
          http://localhost:8888
        </Link>
        .
      </Text>
    </Stack>
  </Card>
);

card(
  <Card name="Create a Pull Request">
    <Stack gap={4}>
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
            Create and checkout a branch. Replace the text{' '}
            <code>&lt;feature-branch&gt;</code> with your branch name.
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
        </li>
        <li>
          <Text>Update the documentation.</Text>
        </li>
        <li>
          <Text>Add unit tests for the change.</Text>
          <ul>
            <li>
              <Text>
                <code>&lt;Component&gt;.test.js</code> files should be used to
                test component rendering and for snapshot tests.
              </Text>
            </li>
            <li>
              <Text>
                <code>&lt;Component&gt;.jsdom.test.js</code> files should be
                used to test component interactions (such as click, keypress,
                focus, etc) and client-side only tests. More info on{' '}
                <Link
                  inline
                  href="https://testing-library.com/docs/react-testing-library/cheatsheet"
                >
                  <Text weight="bold">react-testing-library</Text>
                </Link>
                .
              </Text>
            </li>
            <li>
              <Text>
                <code>&lt;Component&gt;.flowtest.js</code> files should be used
                to test flow coverage.
              </Text>
            </li>
          </ul>
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
            Push the changes up to your branch. Follow naming conventions for
            the PR:{' '}
            <code>&lt;Component&gt;: &lt;Commit Change Description&gt;</code>.
            Follow these steps again for any additional updates to your branch.
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
            <Link inline href="https://github.com/pinterest/gestalt">
              <Text weight="bold">https://github.com/pinterest/gestalt</Text>
            </Link>
            . A new banner will be displayed, click on &apos;Compare &amp;
            Create Pull Request&apos;.
          </Text>
        </li>
        <li>
          <Text>Add useful summary and screenshots.</Text>
        </li>
        <li>
          <Text>
            Click on <code>Create Pull Request</code> or{' '}
            <code>Create Draft</code> if it is not ready for review and
            approval.
          </Text>
        </li>
        <li>
          <Text>
            Ensure checks pass on your Pull Request - having the &quot;Require
            Semver&nbsp;/ Test (pull_request)&quot; check fail is expected, a
            Gestalt maintainer needs to add a correct semver label.
          </Text>
        </li>
        <li>
          <Text>
            After a Gestalt maintainer adds a correct semver label and approves
            a Pull Request, the release process is initiated automatically.
          </Text>
        </li>
      </ul>
    </Stack>
  </Card>
);

card(
  <Card name="Guidelines">
    <Stack gap={4}>
      <Heading size="sm">Scope of work</Heading>

      <Text>
        When pushing new changes to GitHub, your PR title should be aligned with
        the scope of your work. If your goal was to change the default color of
        a component, keep the scope of changes to that specific task and get the
        title exactly reflect those changes.
      </Text>

      <Heading size="sm">Changes not allowed</Heading>
      <Text>Do not use the following CSS style properties:</Text>

      <ul>
        <li>
          <Text>
            <code>line-height</code>: Property in CSS that controls the space
            between lines of text. Not defining a <code>line-height</code>{' '}
            allows the browser to determine line-height based on language which
            prevents localization issues.
          </Text>
        </li>

        <li>
          <Text>
            <code>height</code>/<code>width</code>: Height &amp; width are CSS
            properties that can be used for determining the size of static
            assets such as an icon size. However, components that contain text
            data should not fix the height &amp; width of the component to
            prevent incorrect styling under different cases such as
            localization, longer texts, etc. Consider other alternatives such as
            padding to define different component sizes.
          </Text>
        </li>
      </ul>

      <Text>Avoid:</Text>

      <ul>
        <li>
          <Text>
            Boolean props: For example, instead of isRTL: boolean or isStart:
            boolean isEnd: boolean use more declarative props such as
            layoutDirection: rtl | ltr or role: startInput | endInput.
          </Text>
        </li>
      </ul>
    </Stack>
  </Card>
);

export default cards;
