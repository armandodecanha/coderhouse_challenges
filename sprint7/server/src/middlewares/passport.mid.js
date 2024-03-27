import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//import { Strategy as GoogleStrategy } from "passport-google-oauth2";
//import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { newUser } from "../data/mongo/manager.mongo.js";
//const { GOOGLE_ID, GOOGLE_CLIENT, GITHUB_ID, GITHUB_CLIENT } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //console.log(`Email: ${email}`); // Imprime el email que se está intentando registrar
        //console.log(`Password: ${password}`); // Imprime la contraseña que se está intentando registrar
        let one = await newUser.readByEmail(email);
        //console.log(`User found: ${one}`); // Imprime el usuario encontrado en la base de datos
        if (!one) {
          let data = req.body;
          //console.log(`Data: ${JSON.stringify(data)}`); // Imprime los datos que se están intentando guardar
          data.password = createHash(password);
          let user = await newUser.create(data);
          //console.log(`User created: ${user}`); // Imprime el usuario creado
          return done(null, user);
        } else {
          //console.log('User already exists'); // Imprime un mensaje si el usuario ya existe
          return done(null, false);
        }
      } catch (error) {
        //console.log(`Error: ${error}`); // Imprime cualquier error que ocurra
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        //console.log(`Email: ${email}`); // Imprime el email que se está intentando iniciar sesión
        //console.log(`Password: ${password}`); // Imprime la contraseña que se está intentando iniciar sesión
        const user = await newUser.readByEmail(email);
        //console.log(`User found: ${user}`); // Imprime el usuario encontrado en la base de datos
        if (user) {
          const isPasswordValid = verifyHash(password, user.password);
          //console.log(`Is password valid: ${isPasswordValid}`); // Imprime si la contraseña es válida
          if (isPasswordValid) {
            //req.session.email = email;
            //req.session.role = user.role;
            const token = createToken({ email, role: user.role });
            req.token = token; // Para que el endpoint pueda acceder al token para enviarlo en la respuesta/al cliente
            return done(null, user);
          } else {
            return done(null, false);
          }
        } else {
          console.log('User not found'); // Imprime un mensaje si el usuario no se encuentra
          return done(null, false);
        }
      } catch (error) {
        //console.log(`Error: ${error}`); // Imprime cualquier error que ocurra
        return done(error);
      }
    }
  )
);

/*
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await users.readByEmail(profile.id + "@gmail.com");
        if (!user) {
          user = {
            email: profile.id + "@gmail.com",
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(profile.id),
          };
          user = await users.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "github",
  new GithubStrategy(
    {
      passReqToCallback: true,
      clientID: GITHUB_ID,
      clientSecret: GITHUB_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        let user = await users.readByEmail(profile.id + "@github.com");
        if (!user) {
          user = {
            email: profile.id + "@github.com",
            name: profile.username,
            photo: profile._json.avatar_url,
            password: createHash(profile.id),
          };
          user = await users.create(user);
        }
        req.session.email = user.email;
        req.session.role = user.role;
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
*/

export default passport;