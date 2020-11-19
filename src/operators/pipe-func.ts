import { Subscriber, Observable } from '../rxjs';
import { OperatorFunc } from './operation';

export type UnwrapPromise<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: Array<any>) => Promise<infer V>
  ? V
  : T;

export type PipeFunc = <T0>(
  target: Subscriber<T0>,
) => {
  <T1>(op1: OperatorFunc<T0, T1>): Observable<T1>;
  <T1, T2>(op1: OperatorFunc<T0, T1>, op2: OperatorFunc<UnwrapPromise<T1>, T2>): Observable<T2>;
  <T1, T2, T3>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
  ): Observable<T3>;
  <T1, T2, T3, T4>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
  ): Observable<T4>;
  <T1, T2, T3, T4, T5>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
  ): Observable<T5>;
  <T1, T2, T3, T4, T5, T6>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
    op6: OperatorFunc<UnwrapPromise<T5>, T6>,
  ): Observable<T6>;
  <T1, T2, T3, T4, T5, T6, T7>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
    op6: OperatorFunc<UnwrapPromise<T5>, T6>,
    op7: OperatorFunc<UnwrapPromise<T6>, T7>,
  ): Observable<T7>;
  <T1, T2, T3, T4, T5, T6, T7, T8>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
    op6: OperatorFunc<UnwrapPromise<T5>, T6>,
    op7: OperatorFunc<UnwrapPromise<T6>, T7>,
    op8: OperatorFunc<UnwrapPromise<T7>, T8>,
  ): Observable<T8>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
    op6: OperatorFunc<UnwrapPromise<T5>, T6>,
    op7: OperatorFunc<UnwrapPromise<T6>, T7>,
    op8: OperatorFunc<UnwrapPromise<T7>, T8>,
    op9: OperatorFunc<UnwrapPromise<T8>, T9>,
  ): Observable<T9>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    op1: OperatorFunc<T0, T1>,
    op2: OperatorFunc<UnwrapPromise<T1>, T2>,
    op3: OperatorFunc<UnwrapPromise<T2>, T3>,
    op4: OperatorFunc<UnwrapPromise<T3>, T4>,
    op5: OperatorFunc<UnwrapPromise<T4>, T5>,
    op6: OperatorFunc<UnwrapPromise<T5>, T6>,
    op7: OperatorFunc<UnwrapPromise<T6>, T7>,
    op8: OperatorFunc<UnwrapPromise<T7>, T8>,
    op9: OperatorFunc<UnwrapPromise<T8>, T9>,
    op10: OperatorFunc<UnwrapPromise<T9>, T10>,
  ): Observable<T10>;
  (...ops: Array<OperatorFunc<any, any>>): Observable<any>;
};
