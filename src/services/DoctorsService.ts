import { DoctorModel } from "../models";
import axios from "axios";
export default class DoctorsService {
  /**
   * Get specialty doctors
   * @param specialtyId 
   * @public
   */
  public static getSpecialtyDoctors(specialtyId): Promise<DoctorModel[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://www.advancedcareclinics.com/api/Specialties/get-doctor-by-specialties/${specialtyId}`)
        .then((response) => {
          if (response.data.Result) {
            console.log(response.data)
            resolve(response.data.Data as DoctorModel[]);
          } else {
            resolve([]);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Get active doctors
   * 
   * @public
   */
  public static getActiveDoctors(): Promise<DoctorModel[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://www.advancedcareclinics.com/api/Specialties/get-doctor-now`)
        .then((response) => {
          if (response.data.Result) {
            resolve(response.data.Data as DoctorModel[]);
          } else {
            resolve([]);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  /**
   * Get doctor available dayss
   *
   * @public
   */
    public static getAvailableDays(year, month, doctorId): Promise<[]> {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://www.advancedcareclinics.com/api/doctor/booking-date/${year}/${month}/${doctorId}`)
          .then((response) => {
            if (response.data.Result) {
              resolve(response.data.Date);
            } else {
              resolve([]);
            }
          }, (err) => {
            reject(err);
          });
      });
    }

  /**
   * Get doctor available times
   * 
   * @public
   */
  public static getAvailableTimes(date, doctorId): Promise<[]> {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://www.advancedcareclinics.com/api/doctor/booking-time`, {
          ID: doctorId,
          Date: date
        })
        .then((response) => {
          if (response.data.Result) {
            resolve(response.data.Booking);
          } else {
            resolve([]);
          }
        }, (err) => {
            alert(JSON.stringify(err, null))
          reject(err);
        });
    });
  }
}
