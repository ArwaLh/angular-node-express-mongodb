import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/client/app/shared/auth.service';
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
  userName = localStorage.getItem('userName');
  filterOptions = ['firstName', 'lastName', 'email', 'phone', 'address'];
  selectedOptions = 'firstName';
  selectedFilter = '';
  allContacts = [];

  constructor(public api: ApiService, public auth: AuthService) { }

  ngOnInit() {
    this.api.get('contacts')
      .subscribe(data => { this.allContacts = data; this.contacts = data; this.selectedItem = data[0] });
  }
  selectContact(contact) {
    this.selectedItem = contact;
  }
  changeAction(action) {
    this.action = action;
  }
  changeContacts(contacts) {
    this.contacts = contacts;
  }
  search() {
    if(this.selectedFilter != '' && this.selectedFilter != null && this.selectedFilter != undefined){
      switch (this.selectedOptions) {
        case 'firstName':
          this.contacts = this.contacts.filter(o =>
            o.firstName.toLowerCase().includes(this.selectedFilter.toLowerCase()));
          break;
        case 'lastName':
          this.contacts = this.contacts.filter(o =>
            o.lastName.toLowerCase().includes(this.selectedFilter.toLowerCase()));
          break;
        case 'email':
          this.contacts = this.contacts.filter(o =>
            o.email.toLowerCase().includes(this.selectedFilter.toLowerCase()));
          break;
        case 'phone':
          this.contacts = this.contacts.filter(o =>
            o.phone.toLowerCase().includes(this.selectedFilter.toLowerCase()));
          break;
        case 'address':
          this.contacts = this.contacts.filter(o =>
            o.address.toLowerCase().includes(this.selectedFilter.toLowerCase()));
          break;
        default:
          this.contacts = this.allContacts;
          break;
      }
    } else {
      this.contacts = this.allContacts;
    }

  }
  logout() {
    this.auth.logout();
  }

}
