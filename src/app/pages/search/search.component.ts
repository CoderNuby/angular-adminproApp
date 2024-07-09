import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { UserModel } from '../../models/user.model';
import { MedicalDoctorModel } from '../../models/medicalDoctor.model';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  users: UserModel[] = [];
  doctors: MedicalDoctorModel[] = [];
  hospitals: HospitalModel[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private searchService: SearchService
  ) {

  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const keyword = params["keyword"];

      this.searchService.searchInAll(keyword).subscribe(res => {
        this.users = res.users || [];
        this.doctors = res.medicalDoctors || [];
        this.hospitals = res.hospitals || [];
      });
    });
  }
}
