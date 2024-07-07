import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UploadImageResponse } from '../models/responses/uploadImage.model';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService extends RootService {

  url: string = `${environment.apiUrl}/uploads`;
  constructor() {
    super();
   }

  async uploadImage(collection: CollectionType, id: string, file: File) {
    const uploadUrl = `${this.url}/${collection}/${id}`;
    const formData = new FormData();

    try {
      formData.append("image", file);
      const resp = await fetch(uploadUrl, {
        method: "POST",
        headers: this.headers,
        body: formData
      });

      const data: UploadImageResponse = await resp.json();

      return data;
      
    } catch (err) {
      return {
        ok: false,
        message: "Error",
        imageName: ""
      };
    }
  }
}

type CollectionType = "users" | "medicalDoctors" | "hospitals";
