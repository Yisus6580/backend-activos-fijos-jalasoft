import { Model, Schema, Types, model } from 'mongoose';
import { IAssignment } from '../interfaces/assignment';

type AssignmentModel = Model<IAssignment>;

const assignmentSchema = new Schema<IAssignment, AssignmentModel>(
  {
    actives: {
      type: [Types.ObjectId],
      required: true,
      unique: true,
    },
    details: { type: String, required: false },
    dateOfStart: { type: Date, required: true },
    dateOfEnd: { type: Date, required: true },
    responsible: { type: Types.ObjectId },
    condition: {
      type: String,
      default: 'in_progress',
      enum: {
        values: ['finish', 'in_progress'],
        message: '{VALUE} Condition is invalid',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AssignmentModel: AssignmentModel = model<IAssignment, AssignmentModel>(
  'Asiggnment',
  assignmentSchema
);

export default AssignmentModel;
