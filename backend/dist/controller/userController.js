"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.addUser = void 0;
const Address_1 = require("../model/Address");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, company_address, company_city, company_state, company_zip, home_address, home_city, home_state, home_zip } = req.body;
        const user = yield Address_1.User.create({
            firstname,
            lastname,
            email,
            profile_photo: req.files['profile_photo'] ? req.files['profile_photo'][0].path : null,
        });
        console.log("Files:::", req.files['appointment_letter'].path);
        const address = yield Address_1.Address.create({
            company_address,
            company_city,
            company_state,
            company_zip,
            home_address,
            home_city,
            home_state,
            home_zip,
            appointment_letter: req.files['appointment_letter'] ? req.files['appointment_letter'][0].path : null,
            userId: user.id,
        });
        res.status(201).json({ user, address });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.addUser = addUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Address_1.User.findByPk(req.params.id, { include: Address_1.Address });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield Address_1.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        yield user.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            profile_photo: req.files['profile_photo'] ? req.files['profile_photo'][0].path : user.profile_photo,
            appointment_letter: req.files['appointment_letter'] ? req.files['appointment_letter'][0].path : null,
        });
        // Update or create address
        const address = yield Address_1.Address.findOne({ where: { userId: id } });
        if (address) {
            yield address.update(req.body);
        }
        else {
            yield Address_1.Address.create(Object.assign(Object.assign({}, req.body), { userId: user.id }));
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUser = updateUser;
