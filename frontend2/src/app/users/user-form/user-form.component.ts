import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import User from '../../type/user';
import { UserServiceService } from '../../service/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formBuilder = inject(FormBuilder);
  userForm: FormGroup = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['', [Validators.required, Validators.email]],
    age:[''],
    address:[''],
    password:['', [Validators.required, Validators.minLength(8)]],
  });

  userService = inject(UserServiceService);
  router = inject(Router);
  route=inject(ActivatedRoute);
  editUserId!:string;

  ngOnInit(){
    this.editUserId = this.route.snapshot.params["id"];
    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe((result)=>{
        this.userForm.patchValue(result);
      })
    }
  }

  addUser(){
    if(this.userForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const model:User = this.userForm.value;
    this.userService.addUser(model).subscribe(result=>{
      alert("User Added Successfully");
      this.router.navigateByUrl('/');
    })
  
  }
  updateUser(){
    if(this.userForm.invalid){
      alert('Please provide all field with valid data');
      return;
    }
    const model:User = this.userForm.value;
    this.userService.updateUser(this.editUserId, model).subscribe((result)=> {
      alert('User Update Successfully.');
      this.router.navigateByUrl('/');
    })
  }

}
