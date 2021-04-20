import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  title = new BehaviorSubject<string>('');
  status = new BehaviorSubject<'danger' | 'alert' | 'success'>('success');

  constructor() { }
}
