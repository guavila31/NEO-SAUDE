import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IdentificadorGeneroServiceService {
  private apiUrl = 'https://api.genderize.io';
  constructor(private http: HttpClient) { }

  getGender(name: string): Promise<string> {
    const url = `${this.apiUrl}/?name=${name}`;
    return axios.get(url)
      .then((response: { data: any; }) => {
        const data = response.data;
        if (data.gender) {
          return data.gender;
        } else {
          return 'Unknown';
        }
      })
      .catch((error: any) => {
        console.error('Erro ao comunicar com Genderize.io API:', error);
        return 'Unknown';
      });
  }
}
