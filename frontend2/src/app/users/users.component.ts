import { Component, inject } from '@angular/core';
import User from '../type/user';
import {UserServiceService} from '../service/user-service.service'
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users:User[]=[];
  userService = inject(UserServiceService);

  ngOnInit() {
    this.userService.getUsers().subscribe((result) =>{
      this.users = result;
      console.log(this.users);
    });
  }
  delete(id:string){
    const ok = confirm("Are you sure want to delete user?");
    if(ok){
      this.userService.deleteUser(id).subscribe((result)=>{
        alert('User deleted successfully');
        this.users = this.users.filter((u) => u._id! == id);
      });

    }
  }

}
