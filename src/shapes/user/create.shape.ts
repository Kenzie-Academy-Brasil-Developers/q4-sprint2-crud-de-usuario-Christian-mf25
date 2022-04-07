import * as yup from "yup";
import bcrypt from "bcrypt";

const createUserShape = yup.object().shape({
  isAdm: yup
    .boolean()
    .default(() => false)
    .optional(),
  password: yup
    .string()
    .required()
    .transform((pw) => bcrypt.hashSync(pw, 10)),
  email: yup.string().email().lowercase().required(),
  name: yup.string().required("name required"),
});

export default createUserShape;
