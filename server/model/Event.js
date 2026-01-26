import db from '../config/db.js'

const Event={
    createEvent:async(event)=>{
        const sql_query=`INSERT INTO events (
            title,
            description,
            event_date,
            location,
            registration_deadline
        ) VALUE (?,?,?,?,?)`;

        const values=[
            event.title,
            event.description,
            event.event_date,
            event.location,
            event.registration_deadline
        ]
        const [result]=await db.query(sql_query,values);

        return result[0];
    },

    getAllEvents:async()=>{
        const sql_query='SELECT * FROM events';
        const [result]=await db.query(sql_query);
        return result;
    },

    getEventWithEventName:async(event_name)=>{
        const sql_query='SELECT * FROM events WHERE title=?';
        const [result]=await db.query(sql_query,event_name);
        return result[0];
    }
}

export default Event;