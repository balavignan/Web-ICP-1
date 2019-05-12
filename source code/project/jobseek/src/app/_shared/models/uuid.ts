import { AuthService } from '../services/auth.service';
import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



export function uuid() {
    return localStorage.getItem('uuid') || 'null';
}

