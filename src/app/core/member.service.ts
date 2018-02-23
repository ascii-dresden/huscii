import { Injectable } from '@angular/core';

import { Logger } from './logger.service';

@Injectable()
export class MemberService {

  constructor(private logger: Logger) { }

}
