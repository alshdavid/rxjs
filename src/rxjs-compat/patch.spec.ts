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

import '../observable.spec';
import '../subject.spec';
import '../replay-subject.spec';
import '../behavior-subject.spec';
import '../combine-latest.spec';
