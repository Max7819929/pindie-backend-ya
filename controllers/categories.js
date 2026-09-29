const sendAllCategories = (req, res) => {
    req.setHeader("Content-Type", 'application/json');
    res.end(JSON.stringify(req.categoriesArray));
};

const sendCategoryCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.category));
};

const sendCategoryById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.category));
};

const sendCategoryUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ message: "Категория обновлена" }));
};

const sendCategoryDeleted = (req, res) => {
    // Объект игры отправляем в формате JSON 
    res.setHeader("Content-Type", "application/json");
    // Отправляем на клиент найденный и удалённый элемент из базы данных
    res.end(JSON.stringify(req.category));
};

module.exports = { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted };
