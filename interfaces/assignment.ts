import { ObjectId } from "mongoose";

export interface IAssignment {
  _id?: string;
  actives: ObjectId[];
  details: string;
  dateOfStart: Date;
  dateOfEnd: Date;
  responsible: ObjectId;
  condition: AssignmentConditionType;
}

type AssignmentConditionType = "finish" | "in_progress";
