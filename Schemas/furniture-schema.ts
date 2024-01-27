import { Model, Schema, Types, model } from 'mongoose';
import { IFurniture } from '../interfaces/furniture';

type FurnitureModel = Model<IFurniture>;

const furnitureSchema = new Schema<IFurniture, FurnitureModel>(
  {
    code: { type: String, required: true, unique: true },
    type: { type: Types.ObjectId, required: true },
    supplier: { type: String, required: false },
    description: { type: String, required: false },
    observation: { type: String, required: false },
    dateOfPurchase: { type: Date, required: true },
    price: { type: Number, required: true },
    image: {
      baseUrl: { type: String, require: false },
      url: { type: String, require: false },
    },
    condition: {
      type: String,
      default: 'available',
      enum: {
        values: ['available', 'used', 'expired', 'stolen'],
        message: '{VALUE} Condition is invalid',
      },
    },
    state: {
      type: String,
      enum: {
        values: ['new', 'bad'],
        message: '{VALUE} State is invalid',
      },
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FurnitureModel: FurnitureModel = model<IFurniture, FurnitureModel>(
  'Furniture',
  furnitureSchema
);

export default FurnitureModel;
