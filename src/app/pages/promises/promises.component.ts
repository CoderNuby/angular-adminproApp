import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.css'
})
export class PromisesComponent implements OnInit {

  users: User[] = [];

  ngOnInit(): void {
    this.getUsers().then(users => {
      this.users = users;
    });
  }

  getUsers(): Promise<User[]> {
    const promise = new Promise<User[]>(resolve => {
      fetch("https://reqres.in/api/users?page=2")
      .then(x => x.json()).then(body => resolve(body.data));
    });

    return promise;
  }
}

interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}
