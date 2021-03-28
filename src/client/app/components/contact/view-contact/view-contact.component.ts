import { AuthService } from '../../../shared/auth.service';
import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../shared/contact.model';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  @Input() selectedContact: Contact;
  @Output() public changeAction: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class') columnClass = 'four wide column';

  constructor(private route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //TODO: call get contact
    });
  }
  logout() {
    this.auth.logout();
  }
  onChangeAction(action, id){   
    this.changeAction.emit(action);
  }

}
