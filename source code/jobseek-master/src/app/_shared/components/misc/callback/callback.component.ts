import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
  // styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  applicant: any;

  id: string;

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.applicant = message);
    this.id = this.route.snapshot.queryParamMap.get('_id');
    this.applicant = JSON.stringify(this.applicant);
    console.log('data is : ', this.id);
  }

}
