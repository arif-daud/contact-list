import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit  {
  
  // Use non-null assertion operator to indicate that contactForm will be initialized later
  @ViewChild('contactForm') contactForm!: NgForm;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  }

  addContact() {
    // Validate form
    if (this.contactForm.invalid) {
      console.error('Please provide all required information.');
      return;
    }

    const { userName, userEmail, userPhoneNum } = this.contactForm.value;

    const newContact = {
      userName,
      userEmail,
      userPhoneNum
    };

    // Send POST request to add new contact
    this.http.post<any>('http://localhost:5036/api/Contact', newContact) 
      .subscribe(
        (response) => {
          console.log('New contact added:', response);
        },
        (error) => {
          console.error('Error adding new contact:', error);
        }
      );

    // Clear input fields after adding contact
    this.contactForm.reset();
  }
}
