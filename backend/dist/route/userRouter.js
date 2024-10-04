"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = require("../middleware/upload");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// Route to create a new user
router.post('/', upload_1.upload.fields([{ name: 'profile_photo' }, { name: 'appointment_letter' }]), userController_1.addUser);
// Route to get a user's details by ID
router.get('/:id', userController_1.getUser);
// Route to update a user's details by ID
router.put('/:id', upload_1.upload.fields([{ name: 'profile_photo' }, { name: 'appointment_letter' }]), userController_1.updateUser);
exports.default = router;
