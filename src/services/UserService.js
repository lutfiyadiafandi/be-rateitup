const prisma = require("../../prisma/client");
const bcrypt = require("bcryptjs");

class UserService {
  // Create user
  async createUser(data) {
    const { name, username, password, role } = data;
    const hashedPassword = await this.hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
        role: role,
      },
    });
    return this.excludePassword(user);
  }

  // Find all users
  async findAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
    return users;
  }

  // Find user by ID
  async findUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
      },
    });
    return user;
  }

  // Update user
  async updateUser(userId, data) {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    const updatedData = {};
    if (data.name) updatedData.name = data.name;
    if (data.username) updatedData.username = data.username;
    if (data.password)
      updatedData.password = await this.hashPassword(data.password);

    user = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    return this.excludePassword(user);
  }

  // Delete user
  async deleteUser(userId) {
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    await prisma.user.delete({
      where: { id: userId },
    });
    return true;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new UserService();
