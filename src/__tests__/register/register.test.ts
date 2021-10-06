import * as dotenv from 'dotenv';
import CognitoService from '../../api/auth/AuthenticationProvider';

dotenv.config();

test('Register function', async () => {
  const cognito = new CognitoService();
  const res = await cognito.signUpUser('testuser', 'testUser00_', [{ Name: 'email', Value: 'mail@mai.com' },
    { Name: 'name', Value: 'Test' }, { Name: 'family_name', Value: 'User' },
    { Name: 'birthdate', Value: '1996-12-01' }]);
  expect(res).not.toBeInstanceOf(Error);
  cognito.deleteUser('testuser', 'us-east-1_CzF6pu0Sv');
});
test('Forgot password function', async () => {
  const cognito = new CognitoService();
  const res = await cognito.forgotPassword('sgnm1049')
  expect(res).not.toBeInstanceOf(Error);
  
});
