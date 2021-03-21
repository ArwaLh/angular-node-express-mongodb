import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @Input() selectedContact?;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const contact: Contact = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
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
