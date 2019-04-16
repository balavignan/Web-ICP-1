import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

let component = Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
});

@component
export class TodoComponent implements OnInit {
    todo;
    todos = [];
    user_id ;


    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) {

    }

    ngOnInit() {

        this.user_id = this.route.snapshot.params['id'];
        this.getTodos();

    }
    getTodos()
    {
        this.api.getUserTodos(this.user_id)
            .subscribe(data => {
                console.log(data);
                this.todos = data;
                for (let i = 0; i < this.todos.length; i++) {
                    this.api.getBook(this.todos[i].bid)
                        .subscribe(res => {
                                console.log(res)
                                res[0].ind = i;
                                this.todos[i] = res[0];
                                console.log(this.todos[i]);
                            }, (err) => {
                                console.log(err);
                            }
                        );
                }
            });
    }
    delete(id: string, ind: string)
    {
        this.api.getUserTodo(this.user_id, id )
            .subscribe(data => {
                this.api.deleteUserTodo(data[0]._id )
                    .subscribe(data => {
                        this.todos[ind].availability = this.todos[ind].availability+1;
                        this.api.updateTodo(this.todos[ind]._id, this.todos[ind])
                            .subscribe(res1 => {
                                this.todos.splice( Number(ind) , 1);
                            }, (err) => {
                                console.log(err);
                            });

                    });

            });
    }

}
