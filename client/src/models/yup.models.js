import * as yup from 'yup';

const registerSchema = yup.object().shape({
   username: yup.string().required(),
   email: yup.string().email(),
   password: yup.string().required()
});

const loginSchema = yup.object().shape({
   username: yup.string().required(),
   password: yup.string().required()
})

export {
   registerSchema,
   loginSchema,
}