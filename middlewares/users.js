const users = require('../models/user');
const bcrypt = require("bcrypt.js");

const findAllUsers = async (req, res, next) => {
    req.gamesArray = await users.find({});
    next();
};

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
        console.log(req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
    }
};

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        req.user = await users.findById(req.params.id).select("-password");
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
    }
};

const updateUser = async (req, res, next) => {
    try {
        // В метод передаём id из параметров запроса и объект с новыми свойствами
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
        req.user = await users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
    }
};

const hashPassword = async (req, res, next) => {
    try {
        // Создаём случайную строку длиной в десять символов
        const salt = await bcrypt.genSalt(10);
        // Хешируем пароль
        const hash = await bcrypt.hash(req.body.password, salt);
        // Полученный в запросе пароль подменяем на хеш
        req.body.password = hash;
        next();
    } catch (error) {
        res.status(400).send({ message: "Ошибка хеширования пароля" });
    }
};

module.exports = { findAllUsers, createUser, findUserById, updateUser, deleteUser, hashPassword };
