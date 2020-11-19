export type ParameterList<T> = T extends new (...args: infer C) => any
  ? C
  : T extends (...args: infer F) => any
  ? F
  : never;

export const parameterList = <T>(target: T): ParameterList<T> => {
  const params: any = new Array((target as any).length);
  return params;
};
