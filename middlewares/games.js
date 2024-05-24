const games = require('../models/game');

const findAllGames = async (req, res, next) => {
    // Поиск всех игр в проекте по заданной категории
    if (req.query["categories.name"]) {
        req.gamesArray = await games.findGameByCategory(req.query["categories.name"]);
        next();
        return;
    }
    // Поиск всех игр в проекте
    req.gamesArray = await games
        .find({})
        .populate("categories")
        .populate({
            path: "users",
            select: "-password" // Исключим данные о паролях пользователей
        })
    next();
};

const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
        console.log(req.body);
        req.game = await games.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка создания игры" }));
    }
};

const findGameById = async (req, res, next) => {
    try {
        // Пробуем найти игру по id
        req.game = await games
            .findById(req.params.id) // Поиск записи по id
            .populate("categories") // Загрузка связанных записей о категориях
            .populate("users"); // Загрузка связанных записей о пользователях
        next(); // Передаём управление в следующую функцию
    } catch (error) {
        // На случай ошибки вернём статус-код 404 с сообщением, что игра не найдена
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
    }
};

const checkIUsersAreSafe = async (req, res, next) => {
    console.log(req.body.users);
    if (!req.body.users) {
        next();
        return;
    } else {
        res
            .status(400)
            .send({ message: "Нельзя удалять пользователей или добавлять больше однго пользователя" })
    }
};

const updateGame = async (req, res, next) => {
    try {
        // В метод передаём id из параметров запроса и объект с новыми свойствами
        req.game = await games.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка обновления игры" }));
    }
};

const deleteGame = async (req, res, next) => {
    try {
        // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
        req.game = await games.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Ошибка удаления игры" }));
    }
};

module.exports = { findAllGames, createGame, findGameById, updateGame, deleteGame };
