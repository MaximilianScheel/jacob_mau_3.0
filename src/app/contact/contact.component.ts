import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    HttpClientModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      emailSubject: ['', Validators.required],
    });
  }

  isSubmitted = false;
  messageSent: boolean = false;

  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('emailSubjectField') emailSubjectField!: ElementRef;



  sendMail() {
    const formValues = this.registerForm.value;

    let nameField = this.nameField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let emailSubjectField = this.emailSubjectField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    if (messageField.value.trim() === '') {
      nameField.classList.add('invalid');
      messageField.classList.add('invalid');
      emailField.classList.add('invalid');
      emailSubjectField.classList.add('invalid');
      this.isSubmitted = true;
      return;
    }

    nameField.disabled = true;
    messageField.disabled = true;
    emailField.disabled = true;
    emailSubjectField.disabled = true;
    sendButton.disabled = true;


    //Animation

    let formData = new FormData(this.myForm.nativeElement);
    formData.append('name', nameField.value);
    formData.append('message', messageField.value);
    formData.append('email', emailField.value);
    formData.append('emailSubject', emailSubjectField.value);


    this.http.post('https://formspree.io/f/moqgvqpj', formValues).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
        // Hier können Sie eine Erfolgsmeldung anzeigen oder den Benutzer umleiten, etc.
      },
      error => {
        console.error('Error submitting form:', error);
        // Hier können Sie die Fehlerantwort analysieren und geeignete Maßnahmen ergreifen
        if (error instanceof HttpErrorResponse) {
          console.log('Error status:', error.status);
          console.log('Error body:', error.error);
        }
      }
    );

    this.messageSent = true;

    nameField.value = '';
    messageField.value = '';
    emailField.value = '';
    emailSubjectField.value = '';

    setTimeout(() => {
      this.messageSent = false;

      nameField.disabled = false;
      messageField.disabled = false;
      emailField.disabled = false;
      emailSubjectField.disabled = false;
      sendButton.disabled = false;
    }, 3000);
  }
}
