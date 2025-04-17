import { UserModel, IUser } from '../database/models/User';
import { User } from '../../domain/entities/User';

export class UserRepository {
  public async getByUserName(userName: string): Promise<IUser | null> {
    return await UserModel.findOne({ userName: userName });
  }

  public async createUser(
    userName: string,
    salt: string,
    hash: string
  ): Promise<User> {
    try {
      const user = new UserModel({
        userName: userName,
        hash: hash,
        salt: salt,
      });

      const savedUser = await user.save();
      return new User(
        savedUser.userName,
        savedUser.hash,
        savedUser.salt,
        savedUser.id
      );
    } catch (error) {
      throw error;
    }
  }

  public async updatePassword(
    userId: string,
    newSalt: string,
    newHash: string
  ): Promise<void> {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { salt: newSalt, hash: newHash }
    );
  }

  public async updateUserName(
    userId: string,
    newUserName: string
  ): Promise<void> {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { userName: newUserName }
    );
  }

  public async deleteAccount(userId: string): Promise<void> {
    await UserModel.findOneAndDelete({ _id: userId });
  }
}
