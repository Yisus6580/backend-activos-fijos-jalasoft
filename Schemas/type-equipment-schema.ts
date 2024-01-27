import { Model, Schema, model } from 'mongoose';
import { ITypeEquipment } from '../interfaces/type-equipment';

type TypeEquipmentModel = Model<ITypeEquipment>;

const typeEquipmentSchema = new Schema<ITypeEquipment, TypeEquipmentModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TypeEquipmentModel: TypeEquipmentModel = model<
  ITypeEquipment,
  TypeEquipmentModel
>('Type-Equipment', typeEquipmentSchema);

export default TypeEquipmentModel;
