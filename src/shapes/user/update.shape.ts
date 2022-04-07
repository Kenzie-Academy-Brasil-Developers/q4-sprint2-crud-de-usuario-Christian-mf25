import * as yup from "yup";
import bcrypt from "bcrypt";

const updateUserShape = yup.object().shape({
  password: yup
    .string()
    .transform((pw) => bcrypt.hashSync(pw, 10))
    .optional(),
  email: yup.string().email().lowercase().optional(),
  name: yup.string().optional(),
});

export default updateUserShape;
