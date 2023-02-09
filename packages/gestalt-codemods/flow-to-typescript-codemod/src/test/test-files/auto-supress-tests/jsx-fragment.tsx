/* eslint-disable  */
import * as React from 'react';

type AbstractComponent<Config, Instance> = React.ComponentType<
    React.PropsWithoutRef<Config> & React.RefAttributes<Instance>
  >;

function Test({test}: {test: number}) {
  return <div>{test}</div>;
}

function Image() {
  return (
    <>
      <Test test={'hi'} />
      <path d="123" />
    </>
  );
}

function add5(a: number) {
  return a + 1;
}
add5(5);

class MyComponent extends React.Component {
  render() {
    return (
      <span>
        {this.props.test}
      </span>
    );
  }
}


const f = (() => <div>
  <span>
    {'Profiling TTN'}
  </span>
</div>) as AbstractComponent<Record<any, any>>;
