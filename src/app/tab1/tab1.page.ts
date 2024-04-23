import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  contacts: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.http.get<any[]>('http://localhost:5036/api/Contact') 
      .subscribe(
        (response) => {
          this.contacts = response;          
        },
        (error) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  showContactDetails(userId: number) {
    this.router.navigate(['/tabs/tab3', userId]);
  }
}
