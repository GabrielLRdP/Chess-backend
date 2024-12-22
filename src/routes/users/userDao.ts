import { User } from '../../models/User';

export class UserDao {
  public async getByUserName(userName: string) {
    return await User.findOne({ userName: userName });
  }
  public async createUser(
    userName: string,
    salt: string,
    hash: string,
    token: string
  ) {
    const user = new User({
      userName: userName,
      hash: hash,
      salt: salt,
      token: token,
    });

    await user.save();
  }
}
