import mongoose, { Schema } from 'mongoose';

const paymentsSchema = new Schema(
  {
    userId: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

paymentsSchema.methods = {
  view() {
    const view = {
      id: this.id,
      userId: this.userId,
      amount: this.amount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return view;
  },
};

const model = mongoose.model('Payments', paymentsSchema);

export const schema = model.schema;
export default model;
