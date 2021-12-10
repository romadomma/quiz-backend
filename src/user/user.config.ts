export class UserConfig {
  passwordSalt: string;
}

export const userConfigFactory = (): UserConfig => ({
  passwordSalt: process.env.PASSWORD_SALT,
});
