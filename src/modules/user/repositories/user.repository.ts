import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDoc } from "../models/user.model";
import IValidationError from "../../shared/interfaces/validation-error";
import * as bcrypt from 'bcrypt';
import { FormValidationException } from "../../shared/exceptions/bad-request.exception.ts";

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  public async getByEmail(email: string): Promise<UserDoc | undefined> {
    return this.userModel.findOne({ email: email });
  }

  public async insertOne(data: {
    email: string,
    username: string,
    password: string
  }) {
    const formErrors: IValidationError[] = [];

    if (await this.userModel.findOne({ email: data.email }))
      formErrors.push({ property: "email", messages: ["This email is already taken"] });

    if (await this.userModel.findOne({ username: data.username }))
      formErrors.push({ property: "username", messages: ["This username is already taken"] });

    if (formErrors.length)
      throw new FormValidationException(formErrors);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return new this.userModel({ ...data, password: hashedPassword }).save();
  }

  async getAll(): Promise<UserDoc[]> {
    return this.userModel.find();
  }

  getById(userId: string): Promise<UserDoc | null> {
    return this.userModel.findById(userId);
  }
}
