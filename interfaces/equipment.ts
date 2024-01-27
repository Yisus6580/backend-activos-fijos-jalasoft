import { ObjectId } from 'mongoose';
import { ConditionType, ImageType, StateType } from './global-types';

export interface IEquipment {
  code: string;
  type: ObjectId;
  description: string;
  observation: string;
  dateOfPurchase: Date;
  price: number;
  image: ImageType;
  condition: ConditionType;
  state: StateType;
}
