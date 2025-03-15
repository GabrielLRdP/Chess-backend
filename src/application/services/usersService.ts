import { UserRepository } from '../../infrastructure/repositories/userRepository';
import { User } from '../../domain/entities/User';

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async getUserByUserName(userName: string): Promise<User | null> {
    return this.userRepository.getByUserName(userName);
  }

  async createUser(
    userName: string,
    salt: string,
    hash: string
  ): Promise<User> {
    return this.userRepository.createUser(userName, salt, hash);
  }

  async updateUserName(userId: string, newUserName: string): Promise<void> {
    await this.userRepository.updateUserName(userId, newUserName);
  }

  async updatePassword(
    userId: string,
    newSalt: string,
    newHash: string
  ): Promise<void> {
    await this.userRepository.updatePassword(userId, newSalt, newHash);
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.userRepository.deleteAccount(userId);
  }
}
