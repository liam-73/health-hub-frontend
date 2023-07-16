export class Doctor {
  public _id: string;
  public profile: string;
  public name: string;
  public email: string;
  public user_type: string;
  public dateOfBirth: string;
  public gender: string;
  public address: string;
  public degree?: string;
  public appointment_fee?: number;
  public daily_token_numbers?: number;

  constructor(
    _id: string,
    profile: string,
    name: string,
    email: string,
    user_type: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    degree?: string,
    appointment_fee?: number,
    daily_token_numbers?: number
  ) {
    this._id = _id;
    this.profile = profile;
    this.name = name;
    this.email = email;
    this.user_type = user_type;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.degree = degree;
    this.appointment_fee = appointment_fee;
    this.daily_token_numbers = daily_token_numbers;
  }
}

export class Patient {
  public _id: string;
  public profile: string;
  public name: string;
  public email: string;
  public user_type: string;
  public dateOfBirth: string;
  public gender: string;
  public address: string;
  public diagnosis?: string;

  constructor(
    _id: string,
    profile: string,
    name: string,
    email: string,
    user_type: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    diagnosis?: string
  ) {
    this._id = _id;
    this.profile = profile;
    this.name = name;
    this.email = email;
    this.user_type = user_type;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.diagnosis = diagnosis;
  }
}

export class Employee {
  public _id: string;
  public profile: string;
  public name: string;
  public email: string;
  public user_type: string;
  public dateOfBirth: string;
  public gender: string;
  public address: string;
  public degree?: string;

  constructor(
    _id: string,
    profile: string,
    name: string,
    email: string,
    user_type: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    degree?: string
  ) {
    this._id = _id;
    this.profile = profile;
    this.name = name;
    this.email = email;
    this.user_type = user_type;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
    this.degree = degree;
  }
}

export class Admin {
  public _id: string;
  public email: string;
  public token: string;

  constructor(_id: string, email: string, token: string) {
    this._id = _id;
    this.email = email;
    this.token = token;
  }
}
