import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  url: string = environment.apiUrl;

  private _hideModal: boolean = true;
  public collection: CollectionType = "users";
  public id: string = "";
  public img?: string;

  public imageChanged: EventEmitter<{id: string, image: string}> = new EventEmitter<{id: string, image: string}>();

  get hideModal() {
    return this._hideModal;
  }

  constructor() { }

  closeModal() {
    this._hideModal = true;
  }

  openModal(collection: CollectionType, id: string, img: string = "no-img") {
    this._hideModal = false;
    this.collection = collection;
    this.id = id;

    this.img = `${this.url}/images/${collection}/${img}`;
  }
}

type CollectionType = "users" | "hospitals" | "medicalDoctors";
