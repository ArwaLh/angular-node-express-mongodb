import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  addContact(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, this.contactForm.value);

    const contact: Contact = {
      firstName: `${formValues.firstName}`,
      lastName: `${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.phone}`,
      email: formValues.email
    };

    this.api.post('contacts', contact)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newContact = data;
      });
  }

}
