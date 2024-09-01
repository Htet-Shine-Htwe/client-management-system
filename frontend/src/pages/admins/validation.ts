
import * as Yup from 'yup';

  export const adminRegisterValidation = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(40, 'Name must not exceed 40 characters'),
    code: Yup.string()
      .required('Code is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    password_confirmation: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password'), ''], 'Passwords must match'),

  });