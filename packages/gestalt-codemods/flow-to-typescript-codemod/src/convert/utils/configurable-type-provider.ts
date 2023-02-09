import * as t from "@babel/types";

export class ConfigurableTypeProvider {
  private readonly useStrictAnyFunctionType: boolean = false;

  private readonly useStrictAnyObjectType: boolean = false;

  constructor({
    useStrictAnyFunctionType,
    useStrictAnyObjectType,
  }: {
    useStrictAnyObjectType: boolean;
    useStrictAnyFunctionType: boolean;
  }) {
    this.useStrictAnyObjectType = useStrictAnyObjectType;
    this.useStrictAnyFunctionType = useStrictAnyFunctionType;
  }

  public get flowAnyObjectType(): t.TSType {
    if (this.useStrictAnyObjectType) {
      // Record<any, any>
      return t.tsTypeReference(
        t.identifier("Record"),
        t.tsTypeParameterInstantiation([t.tsAnyKeyword(), t.tsAnyKeyword()])
      );
    } else {
      return t.tsAnyKeyword();
    }
  }

  public get flowAnyFunctionType(): t.TSType {
    if (this.useStrictAnyFunctionType) {
      return t.tsTypeReference(t.identifier("Function"));
    } else {
      return t.tsAnyKeyword();
    }
  }
}
