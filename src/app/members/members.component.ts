import { Component, OnInit, OnDestroy } from '@angular/core';

import { MemberService } from '@app/core';
import { Member } from '@app/members';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ascii-members',
  templateUrl: './members.component.html',
  styles: []
})
export class MembersComponent implements OnInit, OnDestroy {

  private _sub = new Subscription();

  members: Member[];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.getMembers();
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  private getMembers() {
    this._sub.add(this.memberService.findAll()
      .subscribe(value => this.members = value));
  }

}
