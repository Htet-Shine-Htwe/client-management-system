
import * as Yup from 'yup';

  export const loginValidationSchema = Yup.object().shape({
    code: Yup.string()
      .required('Code is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });