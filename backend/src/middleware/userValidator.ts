import { NextFunction } from 'express';
import joi from 'joi';
import { unLink } from './unlinkfile';

const validationSchema = joi.object({

    firstname: joi.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    lastname: joi.string().empty().required(),
    email: joi.string().empty().email().required(),
    company_address: joi.string().empty().required(),
    company_state: joi.string().empty().required(),
    company_city: joi.string().empty().required(),
    company_zip: joi.string().empty().required().min(6).max(6),
    home_address: joi.string().empty().required(),
    home_state: joi.string().empty().required(),
    home_city: joi.string().empty().required(),
    home_zip: joi.string().empty().required().min(6).max(6)
})

export const Validator = (req:any, res:any, next:NextFunction) => {

    // console.log("Files------------", req.files,"\n\n")
    const value = validationSchema.validate(req.body);

    // console.log("Error:::::", error);
    // console.log("Value:::::", value);

  if(value.error) {
    // Extract custom error messages
    const errorMessages = value.error.details.map(err => err.message);
    
    const photo = req.files['profile_photo'][0].path;
    const appointment = req.files['appointment_letter'][0].path
    
    
    unLink(photo, appointment);
    return res.status(400).json({ errors: errorMessages });
  }
  else{
    next();
  }
}