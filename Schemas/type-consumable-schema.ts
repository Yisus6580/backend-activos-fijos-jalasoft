import { Model, Schema, model } from 'mongoose';
import { ITypeConsumable } from '../interfaces/type-consumable';

type TypeConsumableModel = Model<ITypeConsumable>;

const typeConsumableSchema = new Schema<ITypeConsumable, TypeConsumableModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TypeConsumableModel: TypeConsumableModel = model<
  ITypeConsumable,
  TypeConsumableModel
>('Type-Consumable', typeConsumableSchema);

export default TypeConsumableModel;
