import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async insertOne(data: {
    email: string,
    username: string,
    password: string
  }) {
    return new this.userModel({ ...data }).save();
  }
}
