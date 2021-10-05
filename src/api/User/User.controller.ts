import CognitoService from '../auth/AuthenticationProvider';

export default class UserController {
  static async getUser(): Promise<String> {
    return 'getUser';
  }

  static async createUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);

    const {
      username, password, email, name, familyName, birthdate,
    } = {
      username: myObj.username,
      password: myObj.password,
      email: myObj.email,
      name: myObj.firstName,
      familyName: myObj.lastName,
      birthdate: myObj.birthdate,
    };
    const userAttr = [];
    userAttr.push({ Name: 'email', Value: email });
    userAttr.push({ Name: 'name', Value: name });
    userAttr.push({ Name: 'family_name', Value: familyName });
    userAttr.push({ Name: 'birthdate', Value: birthdate });
    const cognito = new CognitoService();
    const res = cognito.signUpUser(String(username), String(password), userAttr);
    return res;
  }

  static async verificateUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);

    const {
      username, confirmationCode,
    } = {
      username: myObj.username,
      confirmationCode: myObj.confirmationCode,
    };

    const cognito = new CognitoService();
    const res = cognito.confirmUser(String(username), String(confirmationCode));
    return res;
  }

  static async deleteUser(data: JSON): Promise<String> {
    const convertion = JSON.stringify(data);
    const myObj = JSON.parse(convertion);

    const {
      username, poolId,
    } = {
      username: myObj.username,
      poolId: myObj.poolId,
    };
    const cognito = new CognitoService();
    const res = cognito.deleteUser(String(username), String(poolId));
    return res;
  }
}
