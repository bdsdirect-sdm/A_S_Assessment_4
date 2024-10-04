"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./route/userRouter"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use('/uploads', express_1.default.static('uploads'));
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Routes
app.use('/', userRouter_1.default);
// Sync database
db_1.default.sync()
    .then(() => {
    console.log('Database synchronized');
})
    .catch((err) => {
    console.error('Database synchronization failed:', err);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
