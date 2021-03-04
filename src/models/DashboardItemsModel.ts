import { DoctorModel } from "./DoctorModel";
import { AppointmentModel } from "./AppointmentModel";
import { DepartmentModel } from "./DepartmentModel";

export type DashboardItemsModel = {
  Doctor: DoctorModel[];
  Clinic: DepartmentModel[];
};
