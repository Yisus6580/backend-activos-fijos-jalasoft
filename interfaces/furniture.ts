import { ObjectId } from 'mongoose';
import { ConditionType, ImageType, StateType } from './global-types';

export interface IFurniture {
  code: string;
  type: ObjectId;
  supplier: string;
  description: string;
  observation: string;
  dateOfPurchase: Date;
  price: number;
  image: ImageType;
  condition: ConditionType;
  state: StateType;
}
