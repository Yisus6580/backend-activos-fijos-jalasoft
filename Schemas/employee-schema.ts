import { Model, Schema, model } from 'mongoose';
import { IEmployee } from '../interfaces/employee';

type EmployeeModel = Model<IEmployee>;

const employeeSchema = new Schema<IEmployee, EmployeeModel>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    CI: { type: String, required: true },
    address: { type: String, required: true },
    numberOfPhone: { type: String, required: false },
    image: {
      baseUrl: { type: String, require: false },
      url: { type: String, require: false },
    },
    position: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const EmployeeModel: EmployeeModel = model<IEmployee, EmployeeModel>(
  'Employee',
  employeeSchema
);

export default EmployeeModel;
