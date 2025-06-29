const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");

class AuthService {
  // Register user
  async register(name, username, password) {
    const hashedPassword = await this.hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name: name,
        username: username,
        password: hashedPassword,
        role: "user", // default role
      },
    });
    return this.excludePassword(user);
  }

  // Login user
  async login(username, password) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = this.generateToken(user.id);
    return { user: this.excludePassword(user), token };
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  excludePassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new AuthService();
