import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/api.service';
import { Contact } from '../../../shared/contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  loading: Boolean = false;
  newContact: Contact;
  contactForm: FormGroup;

  @Input() selectedContact?;
  @Output() public onSelectedContact: EventEmitter<any> = new EventEmitter<any>();
  @Output() public changeAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() public changeContacts: EventEmitter<any> = new EventEmitter<any>();


  constructor(public api: ApiService, private router:Router) { }

  ngOnInit() {   
    this.contactForm = new FormGroup({
      firstName: new FormControl(this.selectedContact ? this.selectedContact.firstName : '', Validators.required),
      lastName: new FormControl(this.selectedContact ? this.selectedContact.lastName : '', Validators.required),
      address: new FormControl(this.selectedContact ?  this.selectedContact.address: '', Validators.required),
      phone: new FormControl(this.selectedContact ? this.selectedContact.phone : '', Validators.required),
      email: new FormControl(this.selectedContact ? this.selectedContact.email:  '', Validators.required),
    });
  }

  editContact() {    
    const formValues = Object.assign({}, this.contactForm.value);
    const contact: Contact = {
      _id: this.selectedContact._id,
      firstName: `${formValues.firstName}`,
      lastName: `${formValues.lastName}`,
      address: formValues.address,
      phone: `${formValues.phone}`,
      email: formValues.email
    };

    this.api.put('contact', contact)
      .subscribe(dataContact => {               
        this.api.get('contacts')
        .subscribe(data => { this.changeContacts.emit(data); this.changeAction.emit('view');this.onSelectedContact.emit(dataContact);  });    
      });
      this.router.navigate(['/contacts']);
  }

}
