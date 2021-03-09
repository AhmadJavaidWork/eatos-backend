import mongoose, { Schema } from 'mongoose';

const userBillsSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    userId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    chapati: {
      type: Boolean,
    },
    salan: {
      type: Boolean,
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

userBillsSchema.methods = {
  view() {
    const view = {
      id: this.id,
      user: this.user.view(),
      userId: this.userId,
      amount: this.amount,
      chapati: this.chapati,
      salan: this.salan,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return view;
  },
};

const model = mongoose.model('UserBills', userBillsSchema);

export const schema = model.schema;
export default model;
