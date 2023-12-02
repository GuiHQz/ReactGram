export type RegisterUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUser = {
  email: string | undefined;
  password: string | undefined;
}