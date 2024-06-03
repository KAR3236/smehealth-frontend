"use client";
import { Box, Button, CircularProgress, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { listOfHealthInfoPdf } from "../Redux/Slice/healthInfo";
import { viewHealthInfoPdfAPI } from "../APIs/healthInfoAPIs";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { constant, statusCodeConstant } from "../Utils/constants";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { HealthInfoResponse } from "../Utils/healthInfoInterface";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ViewPdfFiles() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  //Redux
  const dispatch = useDispatch();
  const {
    loader,
  }: {
    loader: boolean;
  } = useSelector((state: any) => state?.loader);
  const { datas } = useSelector((state: any) => state?.healthInfo);

  const fetchHealthInfoPdfFromApi = () => {
    viewHealthInfoPdfAPI(id)
      .then((viewHealthInfoPdfData: AxiosResponse<HealthInfoResponse>) => {
        if (
          viewHealthInfoPdfData?.data?.statusCode === statusCodeConstant.SUCCESS
        ) {
          dispatch(listOfHealthInfoPdf(viewHealthInfoPdfData?.data?.data));
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  useEffect(() => {
    dispatch(showLoader());
    fetchHealthInfoPdfFromApi();
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 1200,
        flexGrow: 1,
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          <h1
            style={{
              padding: 20,
              textAlign: "center",
              fontSize: 25,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            SME Health Care PDFs
          </h1>
        </Grid>
        {loader ? (
          <Box
            sx={{ height: 400, width: "100%" }}
            style={{ textAlign: "center" }}
          >
            <CircularProgress size={25} />
          </Box>
        ) : (
          datas.map((data: any, index: number) => (
            <Grid item xs={6} key={index} style={{ paddingBottom: 20 }}>
              <iframe
                src={`http://localhost:5000/${data.file}`}
                title="PDF"
                width="95%"
                height="500"
              />
            </Grid>
          ))
        )}
        <Grid
          item
          xs={12}
          style={{
            paddingBottom: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/listOfHealthInfo">
            <Button
              variant="contained"
              style={{
                color: "black",
              }}
              type="button"
            >
              {constant.BACK}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}
