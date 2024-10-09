import fs from 'fs';

export const unLink = (photo:any, appointment:any) => {
    console.log("Unlinking........")
 

    console.log("Directory--------------", fs.readdirSync(__dirname))
    

    fs.unlink(photo, (error)=>{console.log("Error in deleting Image:::   ", error)});
    fs.unlink(appointment, (error)=>{console.log("Error in deleting PDF:::  ", error)});
}