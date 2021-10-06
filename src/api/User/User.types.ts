/* eslint-disable no-unused-vars */
export type User = {
  username: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  birthdate: String;
};
export type RootQuery = {
  getUser(): String;
};

export type RootMutation = {
  // eslint-disable-next-line no-unused-vars
  createUser(firstName: String, username: String, lastName: String,
    email: String, password: String, birthdate: String): String;
  deleteUser(username: String, poolId: String): String;
  forgotPassword(username:String):String;
  confirmPassword(username:String,verficationCode:String,newPassword:String):String;
};
