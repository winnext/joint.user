import AWS from 'aws-sdk';
import crypto from 'crypto';
import ApiError from '../../core/ApiError';
import * as dotenv from 'dotenv';
dotenv.config()
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
  public async loginUser(username: string, clientId:string,poolId: string)
  :Promise<any> {
  
  
    const params = {
      AuthFlow: 'CUSTOM_AUTH',
      ClientId: '1h0uleh31msvqefoqoinfodnve',
      
      AuthParameters: {
        USERNAME: 'ismail.sahin@signumtte.com',
        PASSWORD: 'ismailsahin-',
        
      }
    };
    console.log(params);
    console.log(this.config);
    
    try {
      await this.cognitoIdentity.initiateAuth(params).promise();
      return 'User Login';
    } catch (error) {
      const err = new ApiError(`User login error. Details : ${error}`, __filename);
      return err;
    }
}
public async forgotPassword(username: string)
    :Promise<any> {
    const params = {
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.generateHash(username),
    };
    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      return 'Verification code is sent. Please check your email'
    } catch (error) {
      const err = new ApiError(`Cannot send verifivation code. Details : ${error}`, __filename);
      return err;
    }
}
public async confirmPassword(username:string,verficationCode: string,newPassword:string)
    :Promise<any> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: verficationCode,
      Password: newPassword,
      Username: username,
      SecretHash: this.generateHash(username),
    };
    try {
      const data = await this.cognitoIdentity.confirmForgotPassword(params).promise();
      return 'Password updated!'
    } catch (error) {
      const err = new ApiError(`Password cannot be changed. Details : ${error}`, __filename);
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
