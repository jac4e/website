import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  subject: string;
  message: string;
  notTodayBot: string;
  resultTitle: string;
  resultText: string;
  resultClass: string;
  animateClass: string;
  statusClass: string;
  isSent: boolean;
  constructor() { }

  ngOnInit(): void {
    this.resultClass = "hide";
    this.isSent = false;
  }

  async processForm() {
    let content = document.querySelector('.scrollable') as HTMLElement;
    content.scrollTop = 0;

    // Clear resultText
    this.resultClass = this.statusClass;

    // Check captcha
    
    if (this.notTodayBot !== "human"){
      // Error
      this.animateClass = "shake";
      this.statusClass = "error";
      setTimeout(() => {
        this.resultClass = `${this.statusClass} ${this.animateClass}`;
      }, 0)
      this.resultTitle = "Error:"
      this.resultText = "You must be human to use this form :(";
      return;
    }

    // Validate input
    let warning = "";
    if (this.name === undefined || this.name.length === 0) {
      warning += "Name is undefined\n";
    }
    if (this.email === undefined || this.email.length === 0) {
      warning += "Email is undefined\n";
    } else if (this.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g) == undefined) {
      // email does not match
      warning += "Email is invalid: does not match proper email format\n";
    } else {
      let domain = this.email.match(/(?<=@).+/g)[0];
      let response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`);
      let json = await response.json();
      if (json.Status != 0) {
        warning += "Email is invalid: unknown domain\n";
      } else if (json.Answer === undefined) {
        warning += "Email is invalid: domain has no MX records\n";
      }
    }
    if (this.subject === undefined || this.subject.length === 0) {
      warning += "Subject is undefined\n";
    }
    if (this.message === undefined || this.message.length === 0) {
      warning += "Message is undefined\n";
    }
    if (warning.length != 0) {
      this.animateClass = "shake";
      this.statusClass = "warning";
      setTimeout(() => {
        this.resultClass = `${this.statusClass} ${this.animateClass}`;
      }, 0)
      this.resultTitle = "Warning:"
      this.resultText = warning;
      return;
    }

    // Send email
    if (!this.isSent) {
      // Processing 
      this.animateClass = "strobe";
      this.statusClass = "info";
      setTimeout(() => {
        this.resultClass = `${this.statusClass} ${this.animateClass}`;
      }, 0)
      this.resultTitle = "Processing..."
      this.resultText = "";
      const url = "/api/contact/send";
      const data = {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message
      }
      const param = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(url, param);
      const status = await response.status;
      if (status === 200) {
        // Success
        this.animateClass = "pop";
        this.statusClass = "success";
        setTimeout(() => {
          this.resultClass = `${this.statusClass} ${this.animateClass}`;
        }, 0)
        this.resultTitle = "Success:"
        this.resultText = "Your message has been sent! I will message you back as soon as I can";
        this.isSent = true;
        return;
      } else {
        // Error
        this.animateClass = "shake";
        this.statusClass = "error";
        setTimeout(() => {
          this.resultClass = `${this.statusClass} ${this.animateClass}`;
        }, 0)
        this.resultTitle = "Error:"
        this.resultText = "An error occurred when sending your message, please try again later.";
        return;
      }
    } else {
      // Error
      this.animateClass = "shake";
      this.statusClass = "error";
      setTimeout(() => {
        this.resultClass = `${this.statusClass} ${this.animateClass}`;
      }, 0)
      this.resultTitle = "Error:"
      this.resultText = "You just sent a message! Please don't fill my inbox up :(";
      return;
    }


  }

}
