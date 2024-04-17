"use client";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { smeHealthCheckValidation } from "./Validations/userValidation";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "./Redux/Slice/loaderSlice";
import { addHealthInfoAPI } from "./APIs/healthInfoAPIs";
import { constant, statusCodeConstant } from "./Utils/constants";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckIcon from "@mui/icons-material/Check";
import { Form } from "./Components/Form";
import {
  HealthInfoDataInterface,
  HealthInfoResponse,
} from "./Utils/healthInfoInterface";
import { AxiosResponse } from "axios";

export default function Home() {
  const navigate = useRouter();

  //Redux
  const dispatch = useDispatch();
  const {
    loader,
  }: {
    loader: boolean;
  } = useSelector((state: any) => state?.loader);

  // Formik for validation and handle event by user
  const formik = useFormik<HealthInfoDataInterface>({
    initialValues: {
      company_uen: "",
      company_name: "",
      full_name: "",
      company_position: "",
      email: "",
      re_enter_email: "",
      mobile_no: "",
      file: null,
      terms_condition: false,
    },
    validationSchema: smeHealthCheckValidation,
    onSubmit: (values: HealthInfoDataInterface) => {
      dispatch(showLoader());
      addHealthInfoAPI(values)
        .then((healthInfoData: AxiosResponse<HealthInfoResponse>) => {
          if (healthInfoData?.data?.statusCode === statusCodeConstant.CREATED) {
            toast.success(healthInfoData?.data?.message);
            navigate.push("/listOfHealthInfo");
          } else {
            toast.error(healthInfoData?.data?.message);
          }
        })
        .catch((error: any) => {
          if (
            error.response?.data?.statusCode === statusCodeConstant.BAD_REQUEST
          ) {
            toast.error(error?.response?.data?.message[0]);
          } else {
            toast.error(error?.response?.data?.message);
          }
        })
        .finally(() => {
          dispatch(hideLoader());
        });
    },
  });

  const steps: {
    label: string;
  }[] = [
    {
      label: "Company Information",
    },
    {
      label: "Applicant Information",
    },
    {
      label: "Upload Documents",
    },
    {
      label: "Terms & Conditions",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleUploadClick = () => {
    formik.setFieldTouched("file", true);
  };  

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              color: "white",
            }}
          >
            <Typography
              variant="h5"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              LOGO
            </Typography>
            <Typography variant="h5" noWrap>
              SME HealthCheck - Get Started
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 900,
          flexGrow: 1,
        }}
      >
        <Form onSubmit={formik.handleSubmit}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 3 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  <b>{step.label}</b>
                </StepLabel>
                <StepContent>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {index === 0 ? (
                      <>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.COMPANYUEN}
                            label={constant.COMPANYUEN}
                            name="company_uen"
                            type="text"
                            placeholder="14253614H"
                            value={formik?.values?.company_uen}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.company_uen &&
                          formik?.errors?.company_uen ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.company_uen}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.COMPANYNAME}
                            label={constant.COMPANYNAME}
                            name="company_name"
                            type="text"
                            placeholder="Amazon"
                            value={formik?.values?.company_name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.company_name &&
                          formik?.errors?.company_name ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.company_name}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                      </>
                    ) : index === 1 ? (
                      <>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.FULL_NAME}
                            label={constant.FULL_NAME}
                            name="full_name"
                            type="text"
                            value={formik?.values?.full_name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.full_name &&
                          formik?.errors?.full_name ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.full_name}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.COMPANY_POSITION}
                            label={constant.COMPANY_POSITION}
                            name="company_position"
                            type="text"
                            value={formik?.values?.company_position}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.company_position &&
                          formik?.errors?.company_position ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.company_position}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.EMAIL}
                            label={constant.EMAIL}
                            name="email"
                            type="email"
                            value={formik?.values?.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.email && formik?.errors?.email ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.email}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={constant.RE_ENTER_EMAIL}
                            label={constant.RE_ENTER_EMAIL}
                            name="re_enter_email"
                            type={constant.EMAIL.toLowerCase()}
                            value={formik?.values?.re_enter_email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.re_enter_email &&
                          formik?.errors?.re_enter_email ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.re_enter_email}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id={constant.MOBILE_NO}
                            label={constant.MOBILE_NO}
                            name="mobile_no"
                            type="text"
                            value={formik?.values?.mobile_no}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                          />
                          {formik?.touched?.mobile_no &&
                          formik?.errors?.mobile_no ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.mobile_no}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                      </>
                    ) : index === 2 ? (
                      <>
                        <Grid item xs={6}>
                          <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onClick={handleUploadClick}
                          >
                            Upload file
                            <input
                              type="file"
                              name="file"
                              style={{ display: "none" }}
                              accept="application/pdf"
                              onChange={(event: any) => {
                                formik.setFieldValue(
                                  "file",
                                  event.target.files[0]
                                );
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </Button>
                          {formik?.touched?.file && formik?.errors?.file ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.file}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={5}>
                          PDFs (not scanned copies) of company&apos;s operating
                          bank current account(s) statements for the past 6
                          months. Example: If today is 09 Apr 24, then please
                          upload bank statements from Oct 23 to Mar 24 (both
                          months inclusive)
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={5}>
                          If your company is multi-banked, then please upload 6
                          months bank statements for each bank account
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={5}>
                          If your file is password protected, we request you to
                          remove the password and upload the file to avoid
                          submission failure
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={5}>
                          In case if you are facing any issue while uploading
                          bank statements, Please contact us on
                          support@credilinq.ai
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              required
                              control={
                                <Checkbox
                                  name="terms_condition"
                                  checked={formik?.values?.terms_condition}
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                />
                              }
                              label="By ticking, you are confirming that you have understood and are agreeing to the details mentioned:"
                            />
                          </FormGroup>
                          {formik?.touched?.terms_condition &&
                          formik?.errors?.terms_condition ? (
                            <small>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: 10,
                                  paddingBottom: 10,
                                }}
                              >
                                {formik?.errors?.terms_condition}
                              </div>
                            </small>
                          ) : null}
                        </Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={11}>
                          I confirm that I am the authorized person to upload
                          bank statements on behalf of my company
                        </Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={11}>
                          I assure you that uploaded bank statements and
                          provided company information match and are of the same
                          company, if there is a mismatch then my report will
                          not be generated
                        </Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={11}>
                          I understand that this is a general report based on
                          the bank statements and Credilinq is not providing a
                          solution or guiding me for my business growth
                        </Grid>
                        <Grid item xs={1}>
                          <CheckIcon />
                        </Grid>
                        <Grid item xs={11}>
                          I have read and understand the Terms & Conditions
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Box sx={{ mb: 2, ml: 1 }}>
                    <div>
                      <Button
                        disabled={
                          index === 0 &&
                          formik?.values.company_uen &&
                          formik?.values.company_name
                            ? false
                            : index === 1 &&
                              formik?.values.full_name &&
                              formik?.values.company_position &&
                              formik?.values.email &&
                              formik?.values.mobile_no
                            ? false
                            : index === 2 && formik?.values.file
                            ? false
                            : index === 3 &&
                              (formik?.values.terms_condition ||
                                formik?.values.terms_condition === undefined)
                            ? false
                            : true
                        }
                        type={
                          index === 3 &&
                          (formik?.values.terms_condition ||
                            formik?.values.terms_condition === undefined)
                            ? "submit"
                            : "button"
                        }
                        variant="contained"
                        onClick={
                          index === 3 &&
                          (formik?.values.terms_condition ||
                            formik?.values.terms_condition === undefined)
                            ? () => formik.handleSubmit
                            : handleNext
                        }
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {loader ? (
                          <CircularProgress size={25} />
                        ) : index === steps.length - 1 ? (
                          "Submit"
                        ) : (
                          "Continue"
                        )}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Form>
      </Paper>
    </>
  );
}
