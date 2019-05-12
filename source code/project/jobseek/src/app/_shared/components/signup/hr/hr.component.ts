import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Http} from '@angular/http';
import { Location } from '@angular/common';
import { Hrbase } from '../../../models/hrbase';
import { UserBaseService } from '../../../services/user-base.service';
import * as citiesData from '../../../data/us-cities.json';
declare var $: any;
@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {
  errorMsg: string;
  signupForm: FormGroup;
  options: any;
  states: any;
  imageFile: boolean;
  hrsignupActive: boolean;
   cities: any = {};
  // my variables Abhhishek Mittal
  hrDetails: Hrbase;
  profile_photo: File;
  userExist: boolean;

  ngOnInit() {
    $('.dropdown').dropdown({
      label: {
        duration: 0,
      },
      // debug: true,
      performance: true,
    });
    this.imageFile = false;
    this.hrsignupActive = true;
  }

  constructor(private _userService: UserBaseService,
    private router: Router,
    private location: Location, private http: Http
  ) {
    this.errorMsg = 'please fill required fields'
    this.options = ['Textiles / Garments / Fashion / Accessories', 'Accounting / Finance', 'Advertising / PR / MR / Event Management', 'Agriculture / Dairy', 'Hotels / Restaurants / Airlines / Travel', 'Architecture / Interior Design', 'Automobile / Auto Anciliary / Auto Components', 'Pharma / Biotechnology / Clinical Research', 'Construction / Engineering / Cement / Metals', 'Chemicals / PetroChemical / Plastics / Rubber', 'FMCG / Foods / Beverage', 'Consumer Goods / Durables', 'Courier / Transportation / Freight/ Warehousing', 'BPO / Call Centre / ITES', 'Education / Teaching / Training', 'Recruitment', 'Media / Dotcom / Entertainment', 'Export / Import', 'Gems / Jewellery', 'IT Hardware / Networking', 'Medical / Healthcare / Hospital', 'Insurance', 'Legal', 'Industrial Products/ Heavy Machinery', 'NGO / Social Services', 'Office Equipment / Automation', 'Oil and Gas / Power / Infrastructure / Projects', 'Packaging / Printing', 'Real Estate / Property', 'Retail', 'Security / Law Enforcement', 'IT Software / Software Services', 'Semiconductors / Electronics', 'Telecom/ISP', 'Other', 'Shipping/Marine', 'Animation / Gaming', 'Banking/FinancialServices/Broking', 'Brewery/Distillery', 'Ceramics/Sanitaryware', 'Government/Defence', 'Electricals/Switchgears', 'FacilityManagement', 'fertilizers/Pesticides', 'FoodProcessing', 'HeatVentilation/AirConditioning', 'KPO/Research/Analytics', 'Mining', 'Publishing', 'Steel', 'Strategy/ManagementConsultingFirms', 'Tyres', 'WaterTreatment/WasteManagement', 'Wellness/Fitness/Sports'];

    this.states = [
      'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    this.cities = citiesData;
    this.hrDetails = Hrbase.createBlankUser();
    this.buildFormGroup();
    this.profile_photo = null;
    this.userExist = false;
    this.hrDetails.isHr = true;
    this.hrDetails.status = true;
  }

  buildFormGroup(): void {
    const fg = {
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null),
      'email': new FormControl(null, [Validators.required, Validators.pattern('[A-Za-z\.0-9]+@[A-Za-z]+(.)[A-Za-z]+')]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{5,}$')]),
      'dob': new FormControl(null, Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      'industry': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'designation': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'jobProfile': new FormControl(null, Validators.required),
      'termsCheck': new FormControl(null, Validators.required)
    };

    this.signupForm = new FormGroup(fg);
  }

  hrExist() {
    const emailObj = {
      userEmail: this.signupForm.value.email,
      isHr: true
    }
    if (this.signupForm.value.email != null && this.signupForm.value.email !== undefined) {
      this._userService.checkMailId(emailObj).subscribe((res) => {
      if (res.status) {
        window.alert('Email address was already registered with us Please click ok to login');
        this.router.navigateByUrl('login');
      }
    });
  }
  }
  onSubmit(): void {
    console.log('hr details', this.hrDetails);
    this._userService.addNewUser(this.hrDetails, {
      profile_photo: this.profile_photo
    })
      .then((result) => {
        console.log(result);
        this.router.navigateByUrl('login');
      });
  }

  fileTypeCheck(event): any {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.split('/')[0] === 'image') {
        const reader = new FileReader();
        reader.onload = (rdr) => {
          console.log('image: ', file.type.split('/')[0]);
          this.imageFile = false;
        };
        // reader reads the image uploaded
        reader.readAsDataURL(event.target.files[0]);
        this.profile_photo = event.target.files[0];
      } else {
        alert('Filetype Not Supported.');
        this.imageFile = true;
        // this.fileTypeCheck(event);
      }
    }

  }
  gethrDash() {

  }
  goBack() {
    this.location.back();
  }

}
