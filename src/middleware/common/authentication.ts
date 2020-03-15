import { NextApiRequest, NextApiResponse } from 'next'
import passport from "passport"
import { Strategy } from "passport-local"
import User from '../../models/user'


export default async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  passport.use(
    new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, cb) => User.findOne({ email })
      .then((user) => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' })
        }
        user.authenticate(password, (err: any, user: User, passwordError: any) => {
          if (err) {
            return res.status(401).send({ message: err.message })
          }

          if (passwordError) {
            return res.status(401).send({ message: passwordError.message })
          }

          return cb(null, user, { message: 'Logged In Successfully' })
        })
      })
      .catch(err => cb(err))
  ))

  return next()
}
