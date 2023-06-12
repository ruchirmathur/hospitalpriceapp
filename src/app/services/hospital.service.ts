import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Requests } from './request';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private _http: HttpClient,private _snackBar: MatSnackBar) {}

  addEmployee(data: any): Observable<any> {
    let request: Requests = {};
    
    request=data;
    console.log("post"+request);
    return this._http.post('http://localhost:8082/api/csv/create', request);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('/assets/data.json');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
  
  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}