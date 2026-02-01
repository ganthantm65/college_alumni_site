import multer from "multer";
import path from 'path';

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/events");
    },
    filename:(req,file,cb)=>{
        cb(null,path.extname(Date.now()+file.originalname));
    }
})

export default multer({storage});