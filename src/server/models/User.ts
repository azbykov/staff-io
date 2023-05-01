import mongoose, { Schema, Document } from 'mongoose';

interface Provider {
  name: string;
  id: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
  providers: Provider[]; // Массив провайдеров
}

const ProviderSchema: Schema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String, default: 'user' },
    providers: { type: [ProviderSchema], default: [] }, // Массив провайдеров
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
