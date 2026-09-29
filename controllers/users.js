const sendAllUsers = (req, res) => {
    req.setHeader("Content-Type", 'application/json');
    res.end(JSON.stringify(req.usersArray));
};

const sendUserCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendUserById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendUserUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ message: "Пользователь обновлена" }));
};

const sendUserDeleted = (req, res) => {
    // Объект игры отправляем в формате JSON 
    res.setHeader("Content-Type", "application/json");
    // Отправляем на клиент найденный и удалённый элемент из базы данных
    res.end(JSON.stringify(req.user));
};

const sendMe = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

module.exports = { sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted, sendMe };
