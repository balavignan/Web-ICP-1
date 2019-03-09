import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  id1 = '';
  name: object = {
    first: <string>'',
    last: <string>''
  };
  gender: string= '';
  birthday: string = '';
  lastContact: string = '';
  customerLifetimeValue: string = '';
  customer = {};

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      lastContact: ['', Validators.required],
      customerLifetimeValue: ['', Validators.required],
    });

    // @ts-ignore
    this.id1 = this.getCustomer(this.route.snapshot.params['id']);
    this.getCustomer(this.route.snapshot.params['id']);

  }

  getCustomer(id1) {
    /*** Get the Customer Details*/
    this.api.getCustomer(id1)
      .subscribe(data => {
        console.log('Inside edit getcustomer');
        this.customer = data;
      });

  }

  onFormSubmit() {
    /*** On form submit update the customer details*/
    let customer: object = {};
    customer['customerID'] = 15;
    customer['name'] = {
      first: this.customerForm.value.firstName,
      last: this.customerForm.value.lastName
    };
    customer['gender'] = this.customerForm.value.gender;
    customer['birthday'] = this.customerForm.value.birthday;
    customer['lastContact'] = this.customerForm.value.lastContact;
    customer['customerLifetimeValue'] = this.customerForm.value.customerLifetimeValue;
    console.log('Inside form submit');

    this.api.updateCustomer(this.id1,customer)
      .subscribe(res => {
        console.log('Inside edit ypdatecustomer');
        let id1 = res['_id'];
        this.router.navigate(['/customer-details', id1]);
      }, (err) => {
        console.log(err);
      });
  }
}
