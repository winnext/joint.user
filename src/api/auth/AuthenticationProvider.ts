import AWS from 'aws-sdk';
import crypto from 'crypto';
import ApiError from '../../core/ApiError';

class CognitoService {
  private config = {
    accessKeyId: process.env.COGNITO_ACCESS_KEY_ID,
    secretAccessKey: process.env.COGNITO_SECRET_ACCESS_KEY,
    region: process.env.COGNITO_REGION,
  };

  private secretHash: string = String(process.env.COGNITO_SECRET_HASH);

  private clientId: string = String(process.env.COGNITO_CLIENT_ID);

  private cognitoIdentity: any;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  public async signUpUser(username: string, password: string, userAttr: Array<any>)
    :Promise<any> {
    const params = {
      ClientId: this.clientId,
      Password: password,
      Username: username,
      SecretHash: this.generateHash(username),
      UserAttributes: userAttr,
    };
    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return String(data.UserSub);
    } catch (error) {
      const err = new ApiError(`User cannot be registered. Details : ${error}`, __filename);
      return err;
    }
  }

  public async deleteUser(username: string, poolId: string)
    :Promise<any> {
    const params = {
      Username: username,
      UserPoolId: poolId,
    };
    try {
      await this.cognitoIdentity.adminDeleteUser(params).promise();
      return 'User Deleted';
    } catch (error) {
      const err = new ApiError(`User cannot be deleted. Details : ${error}`, __filename);
      return err;
    }
  }

  private generateHash(username: string): string {
    return crypto.createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64');
  }
}

export default CognitoService;
