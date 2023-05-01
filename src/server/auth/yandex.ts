import { Strategy as YandexStrategy } from 'passport-yandex';
import {userService} from '../services/user.service';

class YandexAuth {
  constructor() {}

  public getYandexStrategy() {
    return new YandexStrategy(
      {
        clientID: process.env.YANDEX_CLIENT_ID || '',
        clientSecret: process.env.YANDEX_CLIENT_SECRET || '',
        callbackURL: process.env.YANDEX_CALLBACK_URL || '',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userService.findUserByProviderId('yandex', profile.id);

          if (!user) {
            const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

            if (email) {
              user = await userService.getUserByEmail(email);

              if (user) {
                user = await userService.addUserProvider(user._id, 'yandex', profile.id);
              } else {
                user = await userService.createUser({
                  username: profile.displayName,
                  email,
                  providers: [
                    {
                      name: 'yandex',
                      id: profile.id,
                    },
                  ],
                });
              }
            } else {
              // @ts-ignore
              return done(new Error('Email is required but not provided by Yandex'), null);
            }
          }

          return done(null, user);
        } catch (error) {
          // @ts-ignore
          return done(error, null);
        }
      }
    );
  }
}

export default new YandexAuth();
