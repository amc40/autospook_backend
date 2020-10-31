"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const upload = multer_1.default({ dest: '/public/uploads' });
const app = express_1.default();
app.use(cors_1.default({
    origin: 'http://localhost:3000'
}));
const port = 4000;
app.use(express_1.default.static('public'));
app.post('/upload', upload.single('file'), (req, res) => {
    var possible = 'abcdefghijklmnopqrstuvwxyz123456789';
    var imgUrl = '';
    for (var i = 0; i < 6; i++) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var tempPath = req.file.path;
    var ext = path_1.default.extname(req.file.originalname).toLowerCase();
    const result = '/uploads/' + imgUrl + ext;
    var targetPath = path_1.default.resolve('./public/uploads/' + imgUrl + ext);
    fs_1.default.rename(tempPath, targetPath, function (err) {
        if (err)
            throw err;
        res.send(result);
    });
});
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map