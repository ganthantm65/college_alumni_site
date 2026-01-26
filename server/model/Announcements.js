import db from "../config/db.js";

const Announcements={
    createAnnounce:async(announcement)=>{
        const sql_query=`INSERT INTO announcements (
                            title,
                            content,
                            created_by
                        ) VALUES (?,?,?)`;
        
        const values=[
            announcement.title,
            announcement.content,
            announcement.created_by
        ]

        const [results]=await db.query(sql_query,values);
    },
    getAllAnnouncements:async()=>{
        const sql_query='SELECT announcement_id,title,content FROM announcements';

        const [results]=await db.query(sql_query);

        return results;
    }
}

export default Announcements;
