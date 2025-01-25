import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import dbConnect from "@/service/mongo";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  await dbConnect();

  const user = await User.findOne({ email: email }).select("-password").lean();
  return replaceMongoIdInObject(user);
}

export async function validatePassword(email, password) {
  await dbConnect();

  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}
