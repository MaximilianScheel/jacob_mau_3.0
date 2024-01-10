import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], // Email-Validator hinzufügen
    message: ['', Validators.required],
    emailSubject: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  isSubmitted = false;
  messageSent: boolean = false;

  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('emailSubjectField') emailSubjectField!: ElementRef;

  async sendMail() {
    //action="https://maximilian-scheel.developerakademie.net/send_mail/send_mail.php"
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

    await fetch('https://formspree.io/f/moqgvqpj', {
      method: 'POST',
      body: formData,
    });

    this.messageSent = true;

    nameField.value = '';
    messageField.value = '';
    emailField.value = '';
    emailSubjectField.value = '';

    // Nachricht gesendet

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
