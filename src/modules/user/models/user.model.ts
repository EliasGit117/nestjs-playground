import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'user', timestamps: true, versionKey: null })
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDoc = User & Document;
