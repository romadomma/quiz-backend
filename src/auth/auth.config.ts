export class AuthConfig {
  passwordSalt: string;
  jwtSecret: string;
}

export const authConfigFactory = (): AuthConfig => ({
  passwordSalt: process.env.PASSWORD_SALT,
  jwtSecret: process.env.JWT_SECRET,
});
