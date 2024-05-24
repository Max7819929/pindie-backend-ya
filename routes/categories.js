const categoriesRouter = require('express').Router();

const {
    sendAllCategories,
    sendCategoryCreated,
    sendCategoryById,
    sendCategoryUpdated,
    sendCategoryDeleted } = require('../controllers/categories');
const { findAllCategories,
    createCategory,
    findCategoryById,
    updateCategory,
    deleteCategory } = require('../middlewares/categories');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post('/categories', findAllCategories, sendAllCategories);
categoriesRouter.put(
    "/categories/:id", // Слушаем запросы по эндпоинту
    updateCategory, // Обновляем запись в MongoDB
    sendCategoryUpdated // Возвращаем ответ на клиент
);
const { checkAuth } = require("../middlewares/auth.js");

categoriesRouter.delete("/categories/:id", deleteCategory, sendCategoryDeleted);


categoriesRouter.post(
    "/categories",
    findAllCategories,
    checkIsCategoryExists,
    checkEmptyName,
    checkAuth,
    createCategory,
    sendCategoryCreated
);

categoriesRouter.put(
    "/categories/:id",
    checkEmptyName,
    checkAuth,
    updateCategory,
    sendCategoryUpdated
);
categoriesRouter.delete("/categories/:id", checkAuth, deleteCategory, sendCategoryDeleted);

module.exports - categoriesRouter;
