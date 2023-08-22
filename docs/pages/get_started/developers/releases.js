// @flow strict
import { type Node } from 'react';
import MainSection from '../../../docs-components/MainSection.js';
import Page from '../../../docs-components/Page.js';
import PageHeader from '../../../docs-components/PageHeader.js';

export default function ReleasesPage(): Node {
  return (
    <Page title="Releases">
      <PageHeader name="Releases" type="guidelines" />
      <MainSection
        name="Automated releases"
        description={`The Gestalt library development approach is continuous releasing.

Each major, minor, and patch change is merged to master and released as the latest supported Gestalt version. Check the [release log](https://github.com/pinterest/gestalt/releases).

When a release will cause breaking changes — in usage or in typing — we provide a codemod to ease the upgrade process. Read more about [codemods](/get_started/developers/releases#Codemods)

Our versioning guidelines follow those outlined at [semver.org](https://semver.org/):

- **Patch**: internal fixes, documentation changes, spelling mistakes in code, internal scripts, or package upgrades (anything that consumers of Gestalt don't need to worry about)

- **Minor**: any new functionality or properties for a component, or net-new
components,

- **Major**: any breaking change, whether it be in a specific component or the library itself (will most likely include a [codemod](#Codemods)

**How do these automated releases work under the hood?** Automated releases use [GitHub actions](https://github.com/features/actions) with these release steps for every merge on master:

- Fetch semver label for the associated PR (patch / minor / major)
- Check out the repository
- Setup Node.js
- Bump package.json version
- Update CHANGELOG.md file
- Create GitHub release
- Publish to npm
- Update [Gestalt documentation](https://gestalt.pinterest.systems)
`}
      />

      <MainSection
        name="Alpha releases"
        description={`Gestalt's deployment system supports automatic alpha releases.

To run an alpha release, follow these steps:

- Create a branch (regular step)
- Submit a Pull Request to github (regular step)
- Click on the "Compare & pull request" on Github
- Instead of <code>base repository:pinterest/gestalt</code> and <code>base: master</code>, select <code>base: alpha</code>
- Merge your branch. There's no need to set a label or wait for builds to pass as some might fail.
- On your terminal, check <code>npm view gestalt</code> or <code>npm view gestalt-charts</code> or <code>npm view gestalt-datepicker</code> to see the latest alpha release
- Visit https://www.npmjs.com/package/gestalt/v/<alpha version>
- In package.json, replace the Gestalt dependency with the released alpha version
- Run <code>yarn</code>
`}
      />

      <MainSection
        name="Codemods"
        description={`Run codemods to automate required code changes related to major releases (breaking changes in usage or in typing) in Gestalt.

Every major release in the component library comes with a codemod to ease the upgrade of the Gestalt dependency. Some codemods are custom built for each upgrade while others take advantage of generic codemods that only require running a codemod command with arguments.

When releases include breaking changes, the specific codemod command is included in the pull request.

Run the relevant codemod(s) in the relevant directory of your repo (not the Gestalt repo) anywhere the component to be updated is used.

For a dry run to see what the changes will be, add the **-d** (dry run) and **-p** (print output) flags to pipe stdout to a file for easier inspection if you like.

Do you want to learn more about how codemods work or want to start developing generic codemods? Read our [codemod README](https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods#readme) for a walkthrough of the development process.
`}
      />
      <MainSection
        name="Generic codemods"
        description={`Generic codemods for common tasks like renaming components or props can be found in this [directory](https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods/generic-codemods).

Codemods modifying prop-values also throw errors when they encouter spread props used in Gestalt components. Spread props are opaque to codemods and require manual action.

Error messages include the location (file path) and the code line of the node that caused the error to facilitate addressing the corresponding issue.

To output the results into a CSV file, append the following code into the command.

~~~bash
  > ~/path/to/your/code/gestalt-codemode-output.csv</code>
~~~
`}
      >
        <MainSection.Subsection
          title="renameComponent"
          description={`
Codemod to **RENAME** Gestalt **components**

Example: transforms first code (top) into second code (bottom)
~~~js
import { Flyout } from 'gestalt'

<Flyout />
~~~
 ~~~js
import { Popover } from 'gestalt'

<Popover />
~~~

To run this codemod, use the  following command in your terminal:
~~~bash
yarn codemod renameComponent ~/path/to/your/code
  --componentName=string
  --nextComponentName=string
~~~

Arguments:
- **--componentName**: current component name to be replaced
- **--nextComponentName**: new component name to replace with

Both componentName & nextComponentName are required.

Example:
~~~bash
yarn codemod renameComponent ~/code/pinboard/webapp
--componentName=Flyout
--nextComponentName=Popover
~~~

See codemod code: [renameComponent](https://github.com/pinterest/gestalt/blob/master/packages/gestalt-codemods/generic-codemods/renameComponent.js)
      `}
        />
        <MainSection.Subsection
          title="modifyProp"
          description={`
Codemod to **MODIFY (REPLACE or REMOVE)** Gestalt component **props**.

Example (REPLACE): transforms first code (top) into second code (bottom)
~~~js
import { Box } from 'gestalt'

<Box size="" />
~~~
 ~~~js
import { Box } from 'gestalt'

<Box renamedSize="" />
~~~

Example (REMOVE): transforms first code (top) into second code (bottom)
~~~js
import { Box } from 'gestalt'

<Box size="" />
~~~
 ~~~js
import { Box } from 'gestalt'

<Box />
~~~

To run this codemod, use the  following command in your terminal:
~~~bash
yarn codemod modifyProp ~/path/to/your/code
--component=string
--subcomponent=string
--previousProp=string
--nextProp=string
~~~

Arguments:
- **--component**: component to which modify props
- **--subcomponent (optional)**: component's subcomponent to which modify props
- **--previousProp**: current prop name to be replaced
- **--nextProp  (optional)**: new prop name to replace with

If all options are passed, previousProp is replaced with nextProp (REPLACE)
In the absence of nextProp, the codemod removes previousProp (REMOVE)

Examples (REPLACE):
~~~bash
yarn codemod modifyProp ~/code/pinboard/webapp
--component=Box
--previousProp=size
--nextProp=renamedSize
~~~
~~~bash
yarn codemod modifyProp ~/code/pinboard/webapp
--component=Dropdown
--subcomponent=Item
--previousProp=size
--nextProp=renamedSize
~~~

Example (REMOVE):
~~~bash
yarn codemod modifyProp ~/code/pinboard/webapp
--component=Box
--previousProp=size
~~~

See codemod code: [modifyProp](https://github.com/pinterest/gestalt/blob/master/packages/gestalt-codemods/generic-codemods/modifyProp.js)
      `}
        />
        <MainSection.Subsection
          title="modifyPropValue"
          description={`
Codemod to **MODIFY (REPLACE, ADD, or REMOVE)** **prop-value combinations** in Gestalt component. It supports string, number, and boolean values.

Example (REPLACE): transforms first code (top) into second code (bottom)
~~~js
import { Box } from 'gestalt'

<Box color="red" />
~~~
 ~~~js
import { Box } from 'gestalt'

<Box variant="error" />
~~~

Example (ADD): transforms first code (top) into second code (bottom)
~~~js
import { Box } from 'gestalt'

<Box />
~~~
 ~~~js
import { Box } from 'gestalt'

<Box variant="error"/>
~~~

Example (REMOVE): transforms first code (top) into second code (bottom)
~~~js
import { Box } from 'gestalt'

<Box color="red"   />
~~~
 ~~~js
import { Box } from 'gestalt'

<Box />
~~~

To run this codemod, use the  following command in your terminal:
~~~bash
* yarn codemod modifyPropValue ~/path/to/your/code
 * --component=string
 * --subcomponent=string
 * --previousProp=string
 * --nextProp=string
 * --previousValue=string|number|boolean
 * --nextValue=string|number|boolean
~~~

Arguments:
- **--component**: component to which modify props
- **--subcomponent (optional)**: component's subcomponent to which modify props
- **--previousProp (optional)**: current prop name to be replaced
- **--nextProp (optional)**: new prop name to replace with, null if we want to remove prop
- **--previousValue (optional)**: current prop name to be replaced
- **--nextValue (optional)**: new prop name to replace with, null if we want to remove prop

If all options passed, prop+value combination are replaced with new prop+value combination (REPLACE)
In the absence of nextProp, the codemod only replaces the prop value (REPLACE)
In the absence of nextValue, the codemod only replaces the prop name for that prop+value combination (REPLACE)
In the absence of previousProp & previousValue, the codemod adds a new prop with value (ADD)
In the absence of nextProp & nextValue, the codemod removes the prop with that particular value (REMOVE)

Examples (REPLACE):
~~~bash
yarn codemod modifyPropValue ~/code/pinboard/webapp
--component=Box
--previousProp=color
--nextProp=variant
--previousValue=400
--nextValue=error
~~~
~~~bash
yarn codemod modifyPropValue ~/code/pinboard/webapp
--component=Box
--previousProp=color
--previousValue=400
--nextValue=error
~~~
~~~bash
yarn codemod modifyPropValue ~/code/pinboard/webapp
--component=Box
--previousProp=color
--nextProp=variant
--previousValue=400
~~~

Example (ADD):
~~~bash
yarn codemod modifyPropValue ~/code/pinboard/webapp
--component=Box
--nextProp=variant
--nextValue=error
~~~

Example (REMOVE):
~~~bash
yarn codemod modifyPropValue ~/code/pinboard/webapp
--component=Box
--previousProp=color
--previousValue=red
~~~

See codemod code: [modifyPropValue](https://github.com/pinterest/gestalt/blob/master/packages/gestalt-codemods/generic-codemods/modifyPropValue.js)
      `}
        />
        <MainSection.Subsection
          title="detectManualReplacement"
          description={`
Codemod to **DETECT COMPLEX MANUAL CHANGES** of components, props, and prop-value combinations in Gestalt components. The codemod  throws error messages upon detection of matching instances. Supports string, number, and boolean values.

Example: throws an error when detects that the arguments matching in code (top) so that engingeers can manually refactor the code.

~~~js
import { Icon } from 'gestalt'

<Icon icon="warning" />
~~~
 ~~~js
import { Status } from 'gestalt'

<Status icon="warning" size="sm" />
~~~

To run this codemod, use the  following command in your terminal:
~~~bash
yarn codemod detectManualReplacement ~/path/to/your/code
--component=string
--subcomponent=string
--prop=string
--value=string|number|boolean
~~~

Arguments:
- **--component**: component to which modify props
- **--subcomponent (optional)**: component's subcomponent to which modify props
- **--prop (optional)**: current prop name to be replaced
- **--value (optional)**: new prop name to replace with, null if we want to remove prop

If all options are passed, previousProp is replaced with nextProp (REPLACE)
In the absence of nextProp, the codemod removes previousProp (REMOVE)

Example:
~~~bash
yarn codemod detectManualReplacement ~/code/pinboard/webapp
--component=Box
--prop=color
value=error
~~~

See codemod code: [detectManualReplacement](https://github.com/pinterest/gestalt/blob/master/packages/gestalt-codemods/generic-codemods/detectManualReplacement.jss)
      `}
        />
      </MainSection>
      <MainSection
        name="Custom release codemods"
        description={`Custom codemods are only necessary when generic codemods cannot support major releases with complex breaking API changes.

Custom codemods can be found in this [directory](https://github.com/pinterest/gestalt/tree/master/packages/gestalt-codemods) under the corresponding upgrade version. The name of the folder should reflect the resulting version number of your PR.

Example usage for a codebase using Flow:
~~~bash
yarn codemod --parser=flow -t={relative/path/to/codemod} relative/path/to/your/code
~~~

      `}
      />
    </Page>
  );
}
