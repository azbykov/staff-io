import User, { IUser } from '../models/User';

class UserService {
  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    await user.save();
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    return user;
  }

  async deleteUser(id: string): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(id);
    return user;
  }

  async findUserByProviderId(providerName: string, providerId: string): Promise<IUser | null> {
    return await User.findOne({
      providers: {
        $elemMatch: {
          name: providerName,
          id: providerId,
        },
      },
    });
  }

  async addUserProvider(userId: string, providerName: string, providerId: string): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          providers: {
            name: providerName,
            id: providerId,
          },
        },
      },
      { new: true }
    );
    return user;
  }
}

const userService = new UserService();
export {userService};
