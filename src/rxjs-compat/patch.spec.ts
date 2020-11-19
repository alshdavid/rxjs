// I don't know if this works

import * as rxjs from 'rxjs';
import { Observable } from '../rxjs/observable';
import { Subject } from '../rxjs/subject';
import { ReplaySubject } from '../rxjs/replay-subject';
import { BehaviorSubject } from '../rxjs/behavior-subject';
import { combineLatest } from '../rxjs/combine-latest';

(Observable as any) = rxjs.Observable;
(Subject as any) = rxjs.Subject;
(ReplaySubject as any) = rxjs.ReplaySubject;
(BehaviorSubject as any) = rxjs.BehaviorSubject;
(combineLatest as any) = rxjs.combineLatest;

import '../rxjs/observable.spec';
import '../rxjs/subject.spec';
import '../rxjs/replay-subject.spec';
import '../rxjs/behavior-subject.spec';
import '../rxjs/combine-latest.spec';
