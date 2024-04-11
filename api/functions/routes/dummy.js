"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dummyRouter = express_1.default.Router();
dummyRouter.get('/', function (req, res, next) {
    res.send('This is dummy route');
});
dummyRouter.get('/student', function (req, res, next) {
    res.send('Harry Potter !');
});
dummyRouter.get('/students', function (req, res, next) {
    res.json([
        {
            name: 'Harry Potter',
            house: 'Gryffindor',
        },
        {
            name: 'Hermione Granger',
            house: 'Gryffindor',
        },
        {
            name: 'Ron Weasley',
            house: 'Gryffindor',
        },
        {
            name: 'Neville Longbottom',
            house: 'Gryffindor',
        },
        {
            name: 'Luna Lovegood',
            house: 'Ravenclaw',
        },
    ]);
});
exports.default = dummyRouter;
