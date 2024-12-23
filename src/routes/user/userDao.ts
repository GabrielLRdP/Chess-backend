import { User, IUser } from '../../models/User';

export class UserDao {
  public async getByUserName(userName: string): Promise<IUser | null> {
    return await User.findOne({ userName: userName });
  }

  public async createUser(
    userName: string,
    salt: string,
    hash: string,
    token: string
  ): Promise<void> {
    const user = new User({
      userName: userName,
      hash: hash,
      salt: salt,
      token: token,
    });

    await user.save();
  }
  public async getTokenById(
    userId: string
  ): Promise<IUser['token'] | undefined> {
    const userData = await User.findById<IUser>(userId);
    return userData?.token;
  }

  public async updatePassword(
    userId: string,
    newSalt: string,
    newHash: string
  ): Promise<void> {
    await User.findOneAndUpdate(
      { _id: userId },
      { salt: newSalt, hash: newHash }
    );
  }

  public async updateUserName(
    userId: string,
    newUserName: string
  ): Promise<void> {
    await User.findOneAndUpdate({ _id: userId }, { userName: newUserName });
  }

  public async deleteAccount(userId: string): Promise<void> {
    await User.findOneAndDelete({ _id: userId });
  }
}
