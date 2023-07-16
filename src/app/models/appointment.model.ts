import { Doctor, Patient } from './user.model';

export class Appointment {
  public patient: string;
  public doctor: string;
  public date: string;
  public reason: string;
  public fee: number;

  constructor(
    patient: string,
    doctor: string,
    date: string,
    reason: string,
    appointment_fee: number
  ) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.reason = reason;
    this.fee = appointment_fee;
  }
}

export class AppointmentRes {
  public patient: Patient;
  public doctor: Doctor;
  public date: string;
  public reason: string;
  public fee: number;

  constructor(
    patient: Patient,
    doctor: Doctor,
    date: string,
    reason: string,
    appointment_fee: number
  ) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.reason = reason;
    this.fee = appointment_fee;
  }
}
