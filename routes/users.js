const usersRouter = require('express').Router();

const {
    sendAllUsers,
    sendUserCreated,
    sendUserById,
    updateUser,
    sendUserDeleted } = require('../controllers/users');
const { findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    hashPassword } = require('../middlewares/users');

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post('/users', createUser, sendUserCreated);
usersRouter.put(
    "/users/:id", // Слушаем запросы по эндпоинту
    updateUser, // Обновляем запись в MongoDB
    sendUserUpdated // Возвращаем ответ на клиент
);
usersRouter.delete("/users/:id", deleteUser, sendUserDeleted);
const { checkAuth } = require("../middlewares/auth.js");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    checkAuth,
    hashPassword,
    createUser,
    sendUserCreated
);
usersRouter.get("/users/:id", findUserByld, sendUserByld);
usersRouter.put(
    "/users/:id",
    checkEmptyNameAndEmail,
    checkAuth,
    updateUser,
    sendUserUpdated
);

module.exports - usersRouter;
