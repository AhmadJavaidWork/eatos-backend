import mongoose, { Schema } from 'mongoose';

const walletsSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
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

walletsSchema.methods = {
  view() {
    const view = {
      id: this.id,
      user: this.user.view(),
      amount: this.amount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return view;
  },
};

const model = mongoose.model('Wallet', walletsSchema);

export const schema = model.schema;
export default model;
