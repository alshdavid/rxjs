# Reactive JavaScript + Extensions (slim)

This library is a slim version of the existing popular rxjs library with the bonus that it compiles down to around 1kb - 3kb and offers a more readable stack trace.

## Installation

```shell
npm install --save @alshdavid/rxjs
```

## Introduction

It's logically broken into two segments "Reactive JavaScript" and "Extensions".

The idea is that you can use the Reactive JavaScript without using extensions and you can use these extensions with any implementation of `Observable`.

The Syntax is the same as rxjs:

```typescript
import { Subject } from '@alshdavid/rxjs'

const s$ = new Subject()

s$.subscribe(value => console.log(value))
s$.next('Hello World')
s$.complete()
```

It features `Observable` `Subject` `ReplaySubject` `BehaviorSubject` any many more.

## Operators (extensions)

This library has a slight change to the operator logic to make it a little more functional. Rather than the `pipe` implementation living inside the `Observable`, it's a function that takes an object that looks like an `Observable`.

```typescript
// Rather than 
s$.pipe(first()) 

// it's 
pipe(s$)(first())
```

This allows for a significantly smaller implementation of operators, the easy writing of operators and also allows for interoperability with current and future implementations of `Observable`s (say if they ever make it into the ECMAScript specification)

Example:
```typescript
import { pipe, filter } from '@alshdavid/rxjs/operators'
import { Subject } from '@alshdavid/rxjs'
// This will also work:
// import { Subject } from 'rxjs'

const s$ = new Subject()

const f$ = pipe(s$)(
  filter(value => value === 'Hello World'),
)

s$.subscribe(value => console.log(value))
s$.next('Hello World')
s$.complete()
```

