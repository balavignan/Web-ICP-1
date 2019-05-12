import { Component, OnInit, Input , Output, EventEmitter} from '@angular/core';
import { HrbaseService } from '../../../../../_shared/services/hrbase.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Hrbase } from '../../../../../_shared/models/hrbase';
import { uuid } from '../../../../../_shared/models/uuid';
@Component({
  selector: 'app-hr-post-list-summary',
  templateUrl: './hr-post-list-summary.component.html',
  styleUrls: []
})
export class HrPostListSummaryComponent implements OnInit {
@Input()
hrpost;
 
@Output()
userclick: EventEmitter<number> = new EventEmitter();

hrdata: Hrbase;
id:string;
 public userclicked() {

   this.userclick.emit(this.hrpost._id);
 }

  constructor(public hrbaseservice:HrbaseService,public router:Router) {
    this.id = uuid();

  }

  ngOnInit() {
    
    this.hrbaseservice.getHrDetailsById(this.id).subscribe((data) => {
      this.hrdata = data;
    });
  }
  deletePost(){
    let windowStatus=window.confirm('confirm to delete post');
    if(windowStatus){
    this.hrbaseservice.deleteHrPost(this.hrpost._id).subscribe(()=>{
      console.log('deleted successfully');
    })
  }
  }

}
