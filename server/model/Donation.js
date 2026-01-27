import db from "../config/db.js";

const Donations={
    addDonations:async(user_id,amount,upi_id,payment_date)=>{
        const sql=`INSERT INTO donations(
                    user_id,
                    amount,
                    upi_id,
                    payment_date
                   ) VALUES(?,?,?,?)`
        await db.query(sql,[user_id,amount,upi_id,payment_date]);
    },

    getAllDonations:async()=>{
        const sql=`SELECT a.alumni_name,d.amount,d.upi_id,d.payment_date
                   FROM donations d
                   JOIN alumni_profiles a
                   ON a.user_id=d.user_id`;
        const [result]=await db.query(sql);
        return result;
    }

}

export default Donations