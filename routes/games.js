const gamesRouter = require('express').Router();

const {
    sendAllGames,
    sendGameCreated,
    sendGameById,
    sendGameUpdated,
    sendGameDeleted } = require('../controllers/games');
const { findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame } = require('../middlewares/games');
const { checkAuth } = require("../middlewares/auth.js");

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post('/games', createGame, sendGameCreated);
gamesRouter.put(
    "/games/:id", // Слушаем запросы по эндпоинту  
    findGameById, // Шаг 1. Находим игру по id из запроса
    // Шаг 2. Проверки, если нужны
    updateGame, // Шаг 3. Обновляем запись с игрой
    sendGameUpdated // Шаг 4. Возвращаем на клиент ответ с результатом обновления
);
gamesRouter.delete(
    "/games/:id", // Слушаем запросы по эндпоинту
    deleteGame,
    sendGameDeleted // Тут будут функция удаления элементов из MongoDB и ответ клиенту
);

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.post(
    "/games",
    findAllGames,
    checkIsGameExists,
    checkIfCategoriesAvaliable,
    checkEmptyFields,
    checkAuth,
    createGame,
    sendGameCreated
);

gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.put(
    "/games/:id",
    findGameById,
    checkIfUsersAreSafe,
    checkIfCategoriesAvaliable,
    checkAuth,
    checkEmptyFields,
    updateGame,
    sendGameUpdated
);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameById);

module.exports - gamesRouter;
