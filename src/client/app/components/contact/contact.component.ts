import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../shared/contact.model';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;
  @Input() selectedItem: Contact;

  @HostBinding('class') columnClass = 'four wide column';

  @Output() public onSelectedContact: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {   
  }
  onSelect(item): void {
    this.selectedItem = item;
    this.onSelectedContact.emit(item);
  }

}
