import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  // Get all data
  getData() {
    return this.http.get('http://127.0.0.1:8000');
  }
  postData(data : any) {
    return this.http.post('http://127.0.0.1:8000/predict', data);
  }
}
