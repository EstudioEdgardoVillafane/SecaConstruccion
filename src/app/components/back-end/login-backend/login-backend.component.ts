import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/back-end/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login-backend',
  templateUrl: './login-backend.component.html',
  styleUrls: ['./login-backend.component.css']
})
export class LoginBackendComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              public snackbar: MatSnackBar) { }
  hide = true;
  userList: User[];
  userObject =  new User;
  password: string;
  user: string;

  ngOnInit() {
    if (localStorage.getItem('datakeyy') !== null) {
      this.router.navigateByUrl('/backend');
    }
    this.userService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.userList = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.userList.push(x as User);
      });
    });
  }
  handleSendData() {
    this.userService.getJsonForUser(this.user, this.userList)
    .subscribe(data => {
      if (data !== undefined) {
        if (this.password === data.password) {
          localStorage.setItem('datakeyy', data.user);
          localStorage.getItem('datakeyy');
          this.router.navigateByUrl('/backend');
        }
      }else{
        this.snackbar.open('Usuario o contrasena incorrecta', 'Ok!', {duration: 2000});
      }
    });
  }
}
