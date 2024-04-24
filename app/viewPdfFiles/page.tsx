"use client";
import { Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { listOfHealthInfoPdf } from "../Redux/Slice/healthInfo";
import {
  listOfHealthInfoAPI,
  viewHealthInfoPdfAPI,
} from "../APIs/healthInfoAPIs";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { constant, statusCodeConstant } from "../Utils/constants";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { HealthInfoResponse } from "../Utils/healthInfoInterface";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";

export default function ViewPdfFiles() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useRouter();
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

  const handleBack = () => {
    const confirm: boolean = window.confirm("Are you sure you want to back?");
    if (confirm) {
      navigate.push("/listOfHealthInfo");
    }
  };

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
        {datas.map((data: any, index: number) => (
          <Grid item xs={4} key={index} style={{ paddingBottom: 20 }}>
            <iframe
              src={`http://localhost:5000/${data.file}`}
              title="PDF"
              width="90%"
              height="500"
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          style={{
            paddingBottom: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              color: "black",
            }}
            onClick={handleBack}
            type="button"
          >
            {constant.BACK}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
