export const func = (fn: jest.Mock) => {
  let arg = 0;
  let call = 0;
  const setter = {
    arg: (n: number) => {
      arg = n;
      return setter;
    },
    call: (n: number) => {
      call = n;
      return setter;
    },
    get: () => fn.mock.calls[call][arg],
    get expect() {
      return expect(fn.mock.calls[call][arg]);
    },
  };
  return setter;
};
