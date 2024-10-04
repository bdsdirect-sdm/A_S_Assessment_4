import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const handleSignup = async (values: any) => {
        console.log("data::::::::::::::", values);
        try {
            const formData = new FormData();

            formData.append("firstname", values.firstname);
            formData.append("lastname", values.lastname);
            formData.append("email", values.email);
            formData.append("profile_photo", values.profile_photo);
            formData.append("company_address", values.company_address);
            formData.append("company_city", values.company_city);
            formData.append("company_state", values.company_state);
            formData.append("company_zip", values.company_zip);
            formData.append("home_address", values.home_address);
            formData.append("home_city", values.home_city);
            formData.append("home_state", values.home_state);
            formData.append("home_zip", values.home_zip);
            formData.append("appointment_letter", values.appointment_letter);
            console.log(formData);
            const response = await axios.post("http://localhost:5000", formData, {
                "headers": {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            alert("Data sent successfully!");
            navigate(`/profile/${response.data.user.id}`);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const ValidationSchema = Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        profile_photo: Yup.mixed().required("Image is required"),
        company_address: Yup.string().required("Company address is required"),
        company_city: Yup.string().required("Company City is required"),
        company_state: Yup.string().required("Company State is required"),
        company_zip: Yup.string().required("Company Zip is required").min(6, "Company zip should be of 6 digits").matches(/^\d+$/, 'Only digits are allowed'),
        home_address: Yup.string().required("Home address is required"),
        home_city: Yup.string().required("Home City is required"),
        home_state: Yup.string().required("Home State is required"),
        home_zip: Yup.string().required("Home Zip is required").min(6, "Home zip should be of 6 digits").matches(/^\d+$/, 'Only digits are allowed'),
        appointment_letter: Yup.mixed().required("Appointment letter is required"),
    });

    return (
        <div className="container" style={{ backgroundColor: '#777777', padding: '20px', borderRadius: '8px' }}>
            <h2 className="text-center">Sign Up</h2>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    profile_photo: null,
                    company_address: '',
                    company_city: '',
                    company_state: '',
                    company_zip: '',
                    home_address: '',
                    home_city: '',
                    home_state: '',
                    home_zip: '',
                    appointment_letter: null
                }}
                validationSchema={ValidationSchema}
                onSubmit={handleSignup}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="mb-3">
                            <label>First Name:</label>
                            <Field className="form-control" name="firstname" placeholder="First Name" />
                            <ErrorMessage name="firstname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Last Name:</label>
                            <Field className="form-control" name="lastname" placeholder="Last Name" />
                            <ErrorMessage name="lastname" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Email:</label>
                            <Field className="form-control" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Profile Photo:</label>
                            <input className="form-control" type="file" name="profile_photo" accept="image/png, image/jpeg, image/jpg" onChange={(event: any) => {
                                setFieldValue("profile_photo", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="profile_photo" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company Address:</label>
                            <Field className="form-control" type="text" name="company_address" placeholder="Enter company address" />
                            <ErrorMessage name="company_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company City:</label>
                            <Field className="form-control" type="text" name="company_city" placeholder="Enter company City" />
                            <ErrorMessage name="company_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company State:</label>
                            <Field className="form-control" type="text" name="company_state" placeholder="Enter company State" />
                            <ErrorMessage name="company_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Company Zip:</label>
                            <Field className="form-control" type="text" name="company_zip" placeholder="Enter company Zip" />
                            <ErrorMessage name="company_zip" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home Address:</label>
                            <Field className="form-control" type="text" name="home_address" placeholder="Enter Home address" />
                            <ErrorMessage name="home_address" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home City:</label>
                            <Field className="form-control" type="text" name="home_city" placeholder="Enter Home City" />
                            <ErrorMessage name="home_city" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home State:</label>
                            <Field className="form-control" type="text" name="home_state" placeholder="Enter Home State" />
                            <ErrorMessage name="home_state" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Home Zip:</label>
                            <Field className="form-control" type="text" name="home_zip" placeholder="Enter Home Zip" />
                            <ErrorMessage name="home_zip" component="div" className='text-danger' />
                        </div>
                        <div className="mb-3">
                            <label>Appointment Letter:</label>
                            <input className="form-control" type="file" name="appointment_letter" accept=".pdf" onChange={(event: any) => {
                                setFieldValue("appointment_letter", event.currentTarget.files[0]);
                            }} />
                            <ErrorMessage name="appointment_letter" component="div" className='text-danger' />
                        </div>

                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Signup;
