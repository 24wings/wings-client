import { Injectable } from '@angular/core';

@Injectable()
export class AppInfoService {
  constructor() { }

  public get title() {
    return '创联众筹';
  }
}
