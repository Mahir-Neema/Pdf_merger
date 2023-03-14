const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const upload = multer({ dest:'uploads/'})
const port = 3000

const {mergePdfs} = require('./merge')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"files/index.html"))
})

app.post('/merge', upload.array('pdfs',5),async (req,res,next)=>{
  console.log(req.files)
  
  let x;
  if(req.files[4]){
    x = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path),path.join(__dirname,req.files[2].path),path.join(__dirname,req.files[3].path),path.join(__dirname,req.files[4].path));
  }

  else if(req.files[3]){
    x = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path),path.join(__dirname,req.files[2].path),path.join(__dirname,req.files[3].path));
  }

  else if(req.files[2]){
    x = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path),path.join(__dirname,req.files[2].path));
  }
  
  else if(req.files[1]) {
    x = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
  }

  else x = await mergePdfs(path.join(__dirname,req.files[0].path));
  // console.log(req.files[2]);
  

  // res.send({data: req.files})
  res.redirect(`http://localhost:3000/static/${x}.pdf`)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})