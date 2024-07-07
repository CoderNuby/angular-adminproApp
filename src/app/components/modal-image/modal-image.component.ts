import { Component } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { UserModel } from '../../models/user.model';
import { UploadImageService } from '../../services/upload-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrl: './modal-image.component.css'
})
export class ModalImageComponent {

  imageUpload!: File;
  imgTemporal: any;

  constructor(
    public modalImageService: ModalImageService,
    private uploadImageService: UploadImageService
  ) {

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
    const id = this.modalImageService.id;
    const collection = this.modalImageService.collection;
    this.uploadImageService.uploadImage(collection, id, this.imageUpload).then(res => {
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
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Image",
        text: "Image upload successful",
        showConfirmButton: false,
        timer: 1500
      });
      this.modalImageService.imageChanged.emit({id, image: res.imageName!});
      this.closeModal();
    });
  }

  closeModal() {
    this.imgTemporal = null;
    this.modalImageService.closeModal();
  }
}
