import * as Yup from "yup";

export const smeHealthCheckValidation = Yup.object({
  company_uen: Yup.string()
    .required("Company UEN is a required field")
    .matches(/^[0-9]{8}[a-zA-Z].*$/, "Invalid Company UEN"),
  company_name: Yup.string().required("Company Name is a required field"),
  full_name: Yup.string().required("Full Name is a required field"),
  company_position: Yup.string().required(
    "Position within company is a required field"
  ),
  email: Yup.string()
    .email("Email Address must be a valid email")
    .required("Email Address is a required field"),
  re_enter_email: Yup.string()
    .oneOf([Yup.ref("email")], `Value doesn't match with "Email Address" field`)
    .required(),
  mobile_no: Yup.string().min(10).required("Mobile Number is a required field"),
  file: Yup.mixed()
    .required("Please upload a file")
    .test(
      "fileType",
      "Only PDF file is allowed",
      (value: any) => value && value.type === "application/pdf"
    ),
});
