import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/';
import { Session } from './typeorm/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(ValidateCustomerMiddleWare) //>> if define middleware function as global
  const sessionRepository = app
    .get(AppModule)
    .getDataSource()
    .getRepository(Session);
  app.use(
    session({
      name: 'NESTJS_TUTORIAL_SESSION_ID',
      secret: 'DSKDJSKDJSKDJKSDDSMKDMKSDKDMKSDMLSKD',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5001);
}
bootstrap();
