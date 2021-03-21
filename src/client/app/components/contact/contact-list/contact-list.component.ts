import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Contact } from '../../../shared/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  selectedItem: Contact;
  action = 'view';

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('contacts')
      .subscribe(data => { this.contacts = data; this.selectedItem = data[0] });
  }
  selectContact(contact){
    this.selectedItem= contact;
  }
  changeAction(action){
    console.log('action', action);
    this.action = action;
  }

}
