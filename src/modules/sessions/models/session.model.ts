import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/models/user.model";

@Schema({ collection: 'sessions', timestamps: true, versionKey: null })
export class Session {

  @Prop({ required: true, type: String, maxlength: 46 })
  ip: string;

  @Prop({ required: false, type: String })
  userAgent?: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;

  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

export type SessionDoc = Session & Document;
