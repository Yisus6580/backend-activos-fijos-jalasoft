import { ObjectId } from 'mongoose';
import { ConditionType, ImageType } from './global-types';

export interface IConsumable {
  type: ObjectId;
  description: string;
  dateOfPurchase: Date;
  price: number;
  image: ImageType;
  condition: ConditionType;
}
