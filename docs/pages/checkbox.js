// @flow strict
import { type Node } from 'react';
import { Checkbox } from 'gestalt';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Example from '../components/Example.js';
import Combination from '../components/Combination.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function CheckboxPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Checkbox">
      <PageHeader name="Checkbox" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - Presenting users with a list of multiple, related options where users can select all, some, or none of the options. With Checkboxes, users can select more than one option.
          - Presenting users with a single option that can be selected or not.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - Situations where users can only choose one out of multiple, related options. Use [RadioButtons](/radiobutton) instead.
          - When a selection takes immediate effect, especially on mobile. Use [Switch](/switch) instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <Example
        id="single"
        name="Example"
        defaultCode={`
function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);

  return (
      <Checkbox
        checked={checked}
        id="usa"
        label="United States of America"
        name="usa"
        onChange={({ checked }) => {
          setChecked(checked);
        }}
      />
  );
}
`}
      />
      <Example
        id="group"
        description="Here is an example of an accessible group of checkboxes. When creating a group of Checkboxes, be sure to wrap them in a [Fieldset](/fieldset)."
        name="Example: Group"
        defaultCode={`
function CheckboxExample() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Fieldset legend="What languages would you like to learn?">
      <Flex direction="column" gap={2}>
        <Checkbox
          checked={checkedEn}
          id="english"
          label="English"
          name="english"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />

        <Checkbox
          checked={checkedSp}
          id="spanish"
          label="Spanish"
          name="spanish"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />

        <Checkbox
          checked={checkedCh}
          id="chinese"
          label="Chinese"
          name="chinese"
          onChange={({ checked }) => {
            setCheckedCh(checked);
          }}
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
      <Example
        id="subtext"
        description="Here is an example of a group of checkboxes with additional subtext applied."
        name="Example: With Subtext"
        defaultCode={`
function CheckboxExample() {
    const [checkedEn, setCheckedEn] = React.useState(false);
    const [checkedSp, setCheckedSp] = React.useState(false);
    const [checkedCh, setCheckedCh] = React.useState(false);

  return (
    <Fieldset legend="What languages would you like to learn?">
      <Flex direction="column" gap={2}>
        <Checkbox
          checked={checkedEn}
          id="english-info"
          label="English"
          subtext="USA, India, and Pakistan have the top number of English speakers "
          name="languages"
          onChange={({ checked }) => {
            setCheckedEn(checked);
          }}
        />
        <Checkbox
          checked={checkedSp}
          id="spanish-info"
          label="Spanish"
          subtext="Mexico, Colombia, and Spain are the top three Spanish-speaking countries"
          name="languages"
          onChange={({ checked }) => {
            setCheckedSp(checked);
          }}
        />
        <Checkbox
          checked={checkedCh}
          id="chinese-info"
          label="Chinese"
          subtext="Chinese has many varieties, including Cantonese and Mandarin"
          name="languages"
          onChange={({ checked }) => {
            setCheckedCh(checked);
          }}
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
      <Example
        id="images"
        description="Here is an example of a group of checkboxes with images included. When including images, you can use the subtext property to clearly describe the information being presented by the image, or use the image's alt text to provide more context."
        name="Example: With Images"
        defaultCode={`
function CheckboxExample() {
    const [checkedCoral, setCheckedCoral] = React.useState(false);
    const [checkedBlue, setCheckedBlue] = React.useState(false);

  return (
    <Fieldset legend="Which backgrounds would you like to use?" legendDisplay="hidden">
      <Flex direction="column" gap={4}>
        <Checkbox
          checked={checkedCoral}
          id="coral"
          label="Coral"
          subtext="Botanical art in coral and green"
          image={<Box height={100} width={80}><Image alt="Botanical art in coral and green" src="https://i.ibb.co/7bQQYkX/stock2.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedCoral(checked);
          }}
        />
        <Checkbox
          checked={checkedBlue}
          id="blue"
          label="Blue"
          subtext="Typography and shoe in blue"
          image={<Box height={100} width={80}><Image alt="Typography and shoe in blue" src="https://i.ibb.co/jVR29XV/stock5.jpg" fit="contain" naturalWidth={1} naturalHeight={1}/></Box>}
          name="favorite art"
          onChange={({ checked }) => {
            setCheckedBlue(checked);
          }}
        />
      </Flex>
    </Fieldset>
  );
}
`}
      />
      <Example
        description="Here is an example of a checkbox showing an error message."
        id="hasError"
        name="Example: Error state"
        skipContrastCheck
        defaultCode={`
function CheckboxExample() {
  return (
      <Checkbox
        id="error"
        errorMessage="This checkbox has an error"
        label="Email"
        name="error"
        onChange={() => {}}
      />
  );
}
`}
      />
      <Example
        id="refExample"
        name="Example: ref"
        description={`The underlying \`input\` element can be accessed via \`ref\`.`}
        defaultCode={`
function CheckboxExample() {
  const ref = React.useRef();
  const [label, setLabel] = React.useState('24');
  const [size, setSize] = React.useState('md');
  const [switched, setSwitched] = React.useState(false);

  React.useEffect(() => {
      setLabel(ref.current && ref.current.offsetHeight)
  }, [size]);

  return (
    <Flex gap={4}>
      <Label htmlFor="emailNotifications">
        <Flex gap={2}>
          <Switch
            onChange={() => {
              setSize(size === "sm" ? "md" : "sm")
              setSwitched(!switched)}
            }
            id="emailNotifications"
            switched={switched}
          />
          <Text>Toggle Checkbox to small size</Text>
        </Flex>

      </Label>
        <Checkbox
          id="sizing"
          checked={true}
          label={\`\${label}px Checkbox\`}
          onChange={() => {} }
          value="value"
          ref={ref}
          size={size}
        />
    </Flex>
  );
}`}
      />
      <Combination
        checked={[false, true]}
        disabled={[false, true]}
        hasCheckerboard={false}
        hasError={[false, true]}
        id="combinations"
        indeterminate={[false, true]}
        size={['sm', 'md']}
        labelPrefix="checkbox-combinations"
      >
        {(props, i) => (
          <Checkbox id={`checkbox-combinations-${i}`} onChange={() => {}} {...props} />
        )}
      </Combination>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Checkbox' }) },
  };
}
