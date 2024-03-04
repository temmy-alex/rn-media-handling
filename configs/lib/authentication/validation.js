import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
    emailPhone: Yup.string()
        .email("Must be a valid email")
        .required("Email cannot be empty"),
    password: Yup.string()
        .required("Password cannot be empty"),
});

const RegisterValidationSchema = Yup.object({
    email: Yup.string()
        .email("Must be a valid email")
        .required("Email cannot be empty"),
    phone: Yup.string()
        .required("Phone cannot be empty"),
    name: Yup.string()
        .required("Name cannot be empty"),
    password: Yup.string()
        .required("Password cannot be empty"),
});

export {
    loginValidationSchema,
    RegisterValidationSchema
}