import db from '../config/db.js';

const AlumniProfile={
    createAlumniProfile:async(alumniProfile)=>{
        const sql_query=`INSERT INTO alumni_profiles(
                            user_id,
                            batch_year,
                            department,
                            degree,
                            company,
                            designation,
                            location,
                            linked_url,
                            alumni_name
                            ) 
                         VALUES(?,?,?,?,?,?,?,?)`;
        const values = [
            alumniProfile.user_id,
            alumniProfile.batch_year,
            alumniProfile.department,
            alumniProfile.degree,
            alumniProfile.company,
            alumniProfile.designation,
            alumniProfile.location,
            alumniProfile.linked_url,
            alumniProfile.alumni_name,
        ];
        const [result]=await db.query(sql_query,values);
        return result;
    }
}

export default AlumniProfile