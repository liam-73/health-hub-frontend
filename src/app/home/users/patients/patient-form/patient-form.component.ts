import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;

  error!: string;
  userCreated = false;
  userUpdated = false;

  profile: any;
  profileUrl: any;

  id!: string;

  genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.isEdit = params['id'] != null;

      this.initForm();

      if (this.isEdit) this.updateForm();
    });
  }

  private initForm() {
    this.userForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      profile: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null),
      gender: new FormControl(null),
      address: new FormControl(null),
      diagnosis: new FormControl(null),
    });
  }

  updateForm() {
    const patient: Patient = this.userService.getUser(this.id, 'PATIENT');

    this.profileUrl = patient.profile;

    this.userForm.patchValue({
      ...patient,
    });
  }

  onAvatarAdded(event: Event) {
    const { files } = event.target as HTMLInputElement;

    if (files && files.length) {
      const reader = new FileReader();
      reader.onload = (data: any) => {
        const image = files.item(0);
        const imageUrl = data.target.result;

        this.profile = image;
        this.profileUrl = imageUrl;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const payload = new FormData();

    Object.keys(this.userForm.value).forEach((key) =>
      payload.append(key, this.userForm.value[key])
    );

    if (!this.isEdit) {
      payload.append('user_type', 'PATIENT');
      payload.append('profile', this.profile);

      this.userService.createUser(payload).subscribe(
        () => {
          this.userCreated = true;
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        (errorMessage) => (this.error = errorMessage)
      );

      this.profile = null;
    } else {
      payload.delete('profile');
      if (this.profile) payload.append('profile', this.profile);

      this.userService.updateUser(payload, this.id).subscribe(
        () => {
          this.userUpdated = true;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        (errorMessage) => (this.error = errorMessage)
      );
    }

    this.userForm.reset();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCloseAlert() {
    this.error = '';
    this.userCreated = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
