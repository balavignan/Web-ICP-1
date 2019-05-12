import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-view-post',
  templateUrl: './user-view-post.component.html',
  styleUrls: ['./user-view-post-component.css']
})
export class UserViewPostComponent implements OnInit {
@Input()
hrpost;
@Output()
userclick = new EventEmitter<number>();

userclicked() {
  this.userclick.emit(this.hrpost._id);
}
  constructor() { }
  ngOnInit() {
  }

}
