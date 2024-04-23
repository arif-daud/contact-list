import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  contact: any;
  contactForm!: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      if (userId) {
        this.getContactDetails(userId);
      }
    });
  }

  getContactDetails(userId: number) {
    this.http.get<any>('http://localhost:5036/api/Contact/' + userId)
      .subscribe(
        (response) => {
          this.contact = response;
          this.initForm();
        },
        (error) => {
          console.error('Error fetching contact details:', error);
        }
      );
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      userId: [this.contact.userId, Validators.required],
      userName: [this.contact.userName, Validators.required],
      userEmail: [this.contact.userEmail, [Validators.required, Validators.email]],
      userPhoneNum: [this.contact.userPhoneNum, Validators.required]
    });
  }

  editContactDetails() {
    if (this.contactForm.valid) {
      const updatedContact = this.contactForm.value;
      this.http.put<any>('http://localhost:5036/api/Contact/?UserId=' + this.contact.userId, updatedContact)
        .subscribe(
          (response) => {
            console.log('Contact updated successfully:', response);
            this.contact = response;
          },
          (error) => {
            console.error('Error updating contact:', error);
          }
        );
    } else {
      console.log('Form is invalid. Cannot submit.');
    }
  }
  

  deleteContactDetails(userId: number) {
    this.http.delete<any>('http://localhost:5036/api/Contact/' + userId)
      .subscribe(
        (response) => {
          console.log('Contact deleted successfully:', response);
          this.contact = null;
        },
        (error) => {
          console.error('Error deleting contact:', error);
        }
      );
  }
}
