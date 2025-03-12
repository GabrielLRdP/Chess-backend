import { UserModel, IUser } from '../database/models/User';
import { User } from '../../domain/entities/User';

export class UserRepository {
  public async getByUserName(userName: string): Promise<IUser | null> {
    return await UserModel.findOne({ userName: userName });
  }

  public async createUser(
    userName: string,
    salt: string,
    hash: string,
    token: string
  ): Promise<any> {
    try {
      const user = new UserModel({
        userName: userName,
        hash: hash,
        salt: salt,
        token: token,
      });

      const savedUser = await user.save();
      return new User(
        savedUser.id,
        savedUser.userName,
        savedUser.hash,
        savedUser.salt,
        savedUser.token
      );
    } catch (error) {
      throw error;
    }
  }
  public async getTokenByUserId(
    userId: string
  ): Promise<IUser['token'] | undefined> {
    const userData = await UserModel.findById<IUser>(userId);
    return userData?.token;
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
