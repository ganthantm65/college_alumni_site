import db from "../config/db.js";

const User={
    createUser:async(studentData)=>{
        const sql='INSERT INTO users (user_name,pass_word,user_role) VALUES(?,?,?)';
        const [result]=await db.query(sql,studentData);
        return result;
    },
    findUser:async(user_name)=>{
        const sql='SELECT * FROM users WHERE user_name=?'
        const [result]=await db.query(sql,user_name);
        return result[0];
    },
    findAdmin:async(user_name)=>{
        const sql='SELECT * FROM users WHERE user_name=? AND USER_ROLE="ADMIN"';
        const [result]=await db.query(sql,user_name);
        return result[0];
    }
}

export default User;
