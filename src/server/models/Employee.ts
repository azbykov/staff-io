import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    hireDate: Date;
}

const EmployeeSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    hireDate: { type: Date, required: true }
});

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
