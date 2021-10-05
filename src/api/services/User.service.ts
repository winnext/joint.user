import { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import * as fs from 'fs';
import { buildSchema } from 'graphql';
import { dirname, basename } from 'path';
import UserController from '../User/User.controller';

const moduleName = basename(__filename).split('.')[0];
const schema = buildSchema(fs.readFileSync(`${dirname(dirname(dirname(__dirname)))}/src/api/${moduleName}/${moduleName}.graphql`, 'utf8'));

export default (app:Application) => {
  app.use('/User', graphqlHTTP({
    schema,
    rootValue: UserController,
  }));
};
