// @flow strict
import * as React from 'react';
import PageHeader from './PageHeader.js';
import PropTable from './PropTable.js';

// Matches React Docgen output
type Props = mixed;

export default function Component(props: Props) {
  return (
    <>
      <PageHeader name={props.displayName} description={props.description} />
      <PropTable
        props={Object.entries(props.props).map(([name, prop]) => ({
          name,
          required: prop.required,
          description: prop.description,
          type: prop.flowType.raw || prop.flowType.name,
          defaultValue: prop.defaultValue?.value,
        }))}
      />
    </>
  );
}
