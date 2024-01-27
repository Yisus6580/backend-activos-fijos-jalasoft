import { Model, Schema, Types, model } from 'mongoose';
import { IEquipment } from '../interfaces/equipment';

type EquipmentModel = Model<IEquipment>;

const equipmentSchema = new Schema<IEquipment, EquipmentModel>(
  {
    code: { type: String, required: true, unique: true },
    type: { type: Types.ObjectId, required: true },
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

const EquipmentModel: EquipmentModel = model<IEquipment, EquipmentModel>(
  'Equipment',
  equipmentSchema
);

export default EquipmentModel;
