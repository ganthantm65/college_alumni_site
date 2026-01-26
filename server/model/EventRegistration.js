import db from "../config/db.js";

const EventRegistration={
    registerEvent:async(event_id,user_id)=>{
        const sql_query=`INSERT INTO event_registrations(
                            event_id,
                            user_id
                        ) VALUES(?,?)`;

        const [result]=await db.query(sql_query,[event_id,user_id]);
        return result;
    },
    getListOfRegistrations:async()=>{
        const sql_query=`SELECT er.registration_id,e.title,e.event_date,e.location,a.alumni_name,er.registered_at
                         FROM event_registrations er
                         JOIN events e
                         ON e.event_id=er.event_id
                         JOIN alumni_profiles a
                         ON a.user_id=er.user_id`;
        const [result]=await db.query(sql_query);
        return result;
    }
}

export default EventRegistration;