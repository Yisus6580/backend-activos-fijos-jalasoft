import { Model, Schema, Types, model } from 'mongoose';
import { IConsumable } from '../interfaces/consumables';

type ConsumableModel = Model<IConsumable>;

const consumableSchema = new Schema<IConsumable, ConsumableModel>(
  {
    type: { type: Types.ObjectId, required: true },
    description: { type: String, required: false },
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ConsumableModel: ConsumableModel = model<IConsumable, ConsumableModel>(
  'Consumable',
  consumableSchema
);

export default ConsumableModel;
