import './css/style.css'

import * as yup from 'yup';


interface FormValues {
  name: string;
  // email: string;
  // password: string;
}

// Example validation function
function validateFormData(values: FormValues) {
  try {
    // await validationSchema.validate(values, { abortEarly: false });
    // Valid data
    console.log(values.name);
  } catch (error) {
    // Errors
    if (error instanceof yup.ValidationError) {
      //   Handle validation errors
      console.error(error.inner);
    }
  }
}
validateFormData({ name: "uyen" });




