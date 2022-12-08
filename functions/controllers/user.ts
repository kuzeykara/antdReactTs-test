import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import User from '../models/user';

const NAMESPACE = 'User Controller';

const signUpUser = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Sign up user called`);

    let { username, password } = req.body;

    // check if user already exists
    User.find({ username: username })
        .exec()
        .then((result) => {
            if (result.length == 0) {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password
                });
                return user
                    .save()
                    .then((result) => {
                        logging.info(NAMESPACE, `Created a new user`);
                        return res.status(201).json({
                            user: { username: result.username }
                        });
                    })
                    .catch((error: Error) => {
                        logging.error(
                            NAMESPACE,
                            `Error creating user: ${error}`
                        );
                        return res.status(500).json({
                            message: error.message,
                            error
                        });
                    });
            } else {
                //user already exists
                logging.warn(NAMESPACE, `User already exists`);
                return res.status(303).send('User already exists');
            }
        })
        .catch((error: Error) => {
            logging.error(NAMESPACE, `Error searching user: ${error}`);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const loginAsUser = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Login requested`);

    let { username, password } = req.body;

    User.find({ username: username, password: password })
        .exec()
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((error: Error) => {
            logging.error(NAMESPACE, `Error logging in as user: ${error}`);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Get all users called`);

    User.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                users: results,
                count: results.length
            });
        })
        .catch((error: Error) => {
            logging.error(NAMESPACE, `Error searching user: ${error}`);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { getAllUsers, signUpUser, loginAsUser };
