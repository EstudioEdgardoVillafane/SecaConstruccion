import { Injectable } from '@angular/core';
import { Client } from '../../model/client';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  
  sessionOnline;

  constructor() { }
}
