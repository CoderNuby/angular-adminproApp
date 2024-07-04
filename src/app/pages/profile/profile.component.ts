import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  user!: UserModel;
  imageUpload!: File;
  imgTemporal: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private uploadImageService: UploadImageService
  ) {}

  ngOnInit(): void {

    this.user = this.authService.user;

    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required]
    });

    if(this.user.google) {
      this.profileForm.get("name")?.disable();
      this.profileForm.get("email")?.disable();
    }
  }

  onChangeImage(event: any){
    let file: File = event.target.files[0];
    this.imageUpload = file;
    if(!this.imageUpload) {
      this.imgTemporal = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemporal = reader.result;
    }
  }

  uploadImage() {
    if(!this.imageUpload) {
      return;
    }
    this.uploadImageService.uploadImage("users", this.user._id || "", this.imageUpload).then(res => {
      if(!res.ok){
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error",
          text: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      this.user.image = res?.imageName;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Image",
        text: "Image upload successful",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  updateProfile() {
    if(this.profileForm.invalid){
      return;
    }
    let newUser: UserModel = new UserModel(
      this.profileForm.get("name")?.value || "",
      this.profileForm.get("email")?.value || "",
      "",
      "",
      false,
      this.user.role,
      this.user._id
    );
    this.userService.updateProfile(newUser).subscribe(res => {
      this.user.name = res.user?.name || "";
      this.user.email = res.user?.email || "";
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User updated",
        text: "User updated successful",
        showConfirmButton: false,
        timer: 1500
      });
    }, err => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Update profile",
        text: err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
