import * as yup from "yup";

const loginShape = yup.object().shape({
	password: yup.string().required("password required"),
  email: yup.string().email().lowercase().required("email required"),
});

export default loginShape;
