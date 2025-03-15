export class User {
  constructor(
    public userName: string,
    public hash: string,
    public salt: string,
    public id?: string
  ) {}
  static create(userName: string, salt: string, hash: string): User {
    return new User(userName, salt, hash);
  }
}
