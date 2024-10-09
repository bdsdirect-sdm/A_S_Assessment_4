
import { User, Address } from '../model/Address';
import transporter from '../middleware/mailer';

export const addUser = async (req: any, res: any) => {
  try {
    const {
      firstname,
      lastname,
      email,
      company_address,
      company_city,
      company_state,
      company_zip,    
      home_address,
      home_city,
      home_state,
      home_zip
    } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
      profile_photo: req.files['profile_photo'] ? req.files['profile_photo'][0].path : null,
    });

    console.log("Files:::",req.files['appointment_letter'].path)

    const address = await Address.create({
      company_address,
      company_city,
      company_state,
      company_zip,
      home_address,
      home_city,
      home_state,
      home_zip,
      appointment_letter: req.files['appointment_letter'] ? req.files['appointment_letter'][0].path : null,
      userId: user.id, 
    });

    if(user && address){
      const mailOptions = {
        from: 'anuragsharda131@gmail.com', // sender address
        to: email,   // list of receivers
        subject: 'Hello from Nodemailer', // Subject line
        text: 'This is a test email sent using Nodemailer!', // plain text body
        // html: '<b>This is a test email sent using Nodemailer!</b>' // html body (optional)
    };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Message sent: %s', info.messageId);
    });
  
    }

  
    res.status(201).json({ user, address });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Address });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      company_address,
      company_city,
      company_state,
      company_zip,    
      home_address,
      home_city,
      home_state,
      home_zip
    } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({
      firstname,
      lastname,
      email,
      profile_photo: req.files['profile_photo'] ? req.files['profile_photo'][0].path : user.profile_photo,
    });

    // Update or create address
    const address = await Address.findOne({ where: { userId: id } });
    if (address) {
      await address.update({
        company_address,
        company_city,
        company_state,
        company_zip,
        home_address,
        home_city,
        home_state,
        home_zip,
        appointment_letter: req.files['appointment_letter'] ? req.files['appointment_letter'][0].path : null
      });
    } else {
      await Address.create({ ...req.body, userId: user.id });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};
