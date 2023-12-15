import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  login(username: string, password: string): Promise<any> {
    const loginData = { username, password };
    return axios.post(`${this.apiUrl}/login`, loginData).then((response) => {
      // Handle successful login response
      console.log('Login successful', response);

      // Store the token in the local storage
      //localStorage.setItem('token', response.data.token);
      return response;
    });
  }

  register(username: string, password: string): Promise<any> {
    const registerData = { username, password };
    return axios.post(`${this.apiUrl}/register`, registerData).then((response) => {
      // Handle successful register response
      console.log('Register successful', response);
      return response;
    });
  }
}
