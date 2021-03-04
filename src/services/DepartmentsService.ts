import { DepartmentModel } from "../models";
import axios from "axios";

export default class DepartmentsService {
  /**
   * Get all departments
   * @public
   */
  public static getDepartments(): Promise<DepartmentModel[]> {
    return new Promise((resolve, reject) => {
      axios
      .get('http://www.advancedcareclinics.com/api/Specialties/get-all')
      .then((response) => {
        resolve(response.data.Data as DepartmentModel[]);
      }, (err) => {
        reject(err);
      });
    });
  }
}
