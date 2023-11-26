import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../../shared/decorators/role.decorator";
import { Exclude } from "class-transformer";

@Schema({ collection: 'users', timestamps: true, versionKey: null })
export class User {

  @Prop({ unique: true, type: String, required: true })
  email: string;

  @Prop({ unique: true, type: String, required: true })
  username: string;

  @Exclude()
  @Prop({ unique: true, type: String, required: true, minlength: 4 })
  password: string;

  @Prop({ type: String, enum: Role, required: true, default: Role.UncompletedAccount })
  role: Role;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDoc = User & Document;
