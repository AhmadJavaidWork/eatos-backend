import mongoose, { Schema } from 'mongoose';

const billsSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    chapatiCost: {
      type: Number,
      required: true,
    },
    salanCost: {
      type: Number,
      required: true,
    },
    participents: {
      type: Array,
      required: true,
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

billsSchema.methods = {
  view() {
    const view = {
      id: this.id,
      user: this.user.view(),
      amount: this.amount,
      participents: this.participents,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return view;
  },
};

const model = mongoose.model('Bills', billsSchema);

export const schema = model.schema;
export default model;
