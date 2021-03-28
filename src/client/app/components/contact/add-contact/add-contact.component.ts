import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { Contact } from '../../../shared/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading: Boolean = false;
  newContact: Contact;
  contactForm: FormGroup;

  @Input() selectedContact?;
  @Output() public onSelectedContact: EventEmitter<any> = new EventEmitter<any>();
  @Output() public changeAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() public changeContacts: EventEmitter<any> = new EventEmitter<any>();

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  addContact() {
    this.loading = true;

    const formValues = Object.assign({}, this.contactForm.value);

    const contact: Contact = {
      firstName: `${formValues.firstName}`,
      lastName: `${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.phone}`,
      email: formValues.email
    };

    this.api.post('contact', contact)
      .subscribe(dataContact => {
        this.contactForm.reset();
        this.api.get('contacts')
        .subscribe(data => {  this.changeContacts.emit(data); this.onSelectedContact.emit(dataContact); this.changeAction.emit('view'); });    
        this.router.navigate(['/contacts']);

      });
  }

}
