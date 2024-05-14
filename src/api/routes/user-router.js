import express from 'express';
import {
    getUser,
    getUserById,
    getUserByUsername,
    postUser,
    userLoginPost,
    putUser,
    deleteUser,
    getUserInfo,
    updatePasswordController,
    checkAlennus,
    postVieras
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);
userRouter.route('/info/:id').get(getUserInfo).put(putUser);
userRouter.route('/login').post(userLoginPost);
userRouter.route('/alennus/:id').get(checkAlennus);
userRouter.route('/:id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser);
userRouter.route('/password/:id').put(updatePasswordController);
userRouter.route('/name/:tunnus').get(getUserByUsername);
userRouter.route('/vieras').post(postVieras);

export default userRouter;