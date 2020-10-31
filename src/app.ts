import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const upload = multer({dest: '/public/uploads'});

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
const port = 4000;

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req: any, res) => {
  var possible='abcdefghijklmnopqrstuvwxyz123456789';
  var imgUrl='';
  for(var i=0; i<6; i++){
      imgUrl+=possible.charAt(Math.floor(Math.random()*possible.length));
  }
  var tempPath=req.file.path;
  var ext=path.extname(req.file.originalname).toLowerCase();
  const result = '/result/' +imgUrl+ext;
  var targetPath=path.resolve('./public/uploads/'+imgUrl+ext);
  fs.rename(tempPath,targetPath,function(err){
   if(err) throw err;
   exec(`./shook.sh ${'./public/uploads/'+imgUrl} spook.mp4 .${result}`);
  res.send(result);
});
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});