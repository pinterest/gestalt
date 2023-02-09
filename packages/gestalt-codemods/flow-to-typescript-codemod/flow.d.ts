// Type definitions for mapping Flow types to TypeScript
// Project: flow-to-typescript-codemod

type SetComplement<A, B extends A> = A extends B ? never : A;

type DefaultProps<T> = T extends { defaultProps: infer D } ? D : {};

type OmitDefaultProps<T, D> = Omit<T, keyof D> &
  Partial<Pick<T, Extract<keyof T, keyof D>>> &
  Partial<Pick<D, Extract<keyof D, keyof T>>>;

type HasComponentProps<T, D extends unknown = DefaultProps<T>> = T extends (
  prop: infer P
) => React.ReactElement
  ? OmitDefaultProps<P, D>
  : never;
export declare namespace Flow {
  // Abstract Component utility type
  // https://flow.org/en/docs/react/types/#toc-react-abstractcomponent
  type AbstractComponent<Config, Instance = any> = React.ComponentType<
    React.PropsWithoutRef<Config> & React.RefAttributes<Instance>
  >;

  // Class utility type
  // https://flow.org/en/docs/types/utilities/#toc-class
  // https://github.com/piotrwitek/utility-types/blob/df2502ef504c4ba8bd9de81a45baef112b7921d0/src/utility-types.ts#L158
  type Class<T> = new (...args: any[]) => T;

  // $Diff utility type
  // https://flow.org/en/docs/types/utilities/#toc-diff
  // https://github.com/piotrwitek/utility-types/blob/df2502ef504c4ba8bd9de81a45baef112b7921d0/src/utility-types.ts#L50
  type Diff<T extends U, U extends object> = Pick<
    T,
    SetComplement<keyof T, keyof U>
  >;

  type ComponentProps<T> = T extends
    | React.ComponentType<infer P>
    | React.Component<infer P>
    ? JSX.LibraryManagedAttributes<T, P>
    : HasComponentProps<T>;

  type ObjMap<
    O extends Record<string, any>,
    F extends (...args: any[]) => any
  > = { [P in keyof O]: ReturnType<F> };
}
