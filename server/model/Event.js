import db from '../config/db.js'

const Event={
    createEvent:async(title,description,event_date,location,cover_photo,status)=>{
        const sql_query=`
            INSERT INTO events
            (title, description, event_date, location, cover_photo, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values=[
            title,
            description,
            event_date,
            location,
            cover_photo,
            status
        ]
        const [result]=await db.query(sql_query,values);

        return result[0];
    },

    getAllEvents:async()=>{
        const sql_query='SELECT * FROM events';
        const [result]=await db.query(sql_query);
        return result;
    },

    getUpcomingEvents : async (req, res) => {
        const [rows] = await db.execute(
            "SELECT * FROM events WHERE status='UPCOMING' ORDER BY event_date"
        );
        return rows;
    },

    getCompletedEvents : async (req, res) => {
        const [rows] = await db.execute(
            "SELECT * FROM events WHERE status='COMPLETED' ORDER BY event_date DESC"
        );
        return rows;
    },

    updateStatus:async(event_id,status)=>{
        const sql=`UPDATE events
                    SET status=?
                    WHERE event_id=?`;
        await db.query(sql,[event_id,status]);
    }
}

export default Event;