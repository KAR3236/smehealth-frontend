"use client";
import Box from "@mui/material/Box";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { listOfHealthInfo } from "../Redux/Slice/healthInfo";
import { listOfHealthInfoAPI } from "../APIs/healthInfoAPIs";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { constant, statusCodeConstant } from "../Utils/constants";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { URL } from "../APIs/baseUrl";
import { HealthInfoResponse } from "../Utils/healthInfoInterface";
import { AxiosResponse } from "axios";

export default function Dashboard() {
  const navigate = useRouter();
  //Redux
  const dispatch = useDispatch();
  const {
    loader,
  }: {
    loader: boolean;
  } = useSelector((state: any) => state?.loader);
  const { datas } = useSelector((state: any) => state?.healthInfo);

  const fetchHealthInfoDataFromApi = () => {
    listOfHealthInfoAPI()
      .then((listOfHealthInfoData: AxiosResponse<HealthInfoResponse>) => {
        if (
          listOfHealthInfoData?.data?.statusCode === statusCodeConstant.SUCCESS
        ) {
          dispatch(listOfHealthInfo(listOfHealthInfoData?.data?.data));
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
    fetchHealthInfoDataFromApi();
  }, []);

  const handleLogout = () => {
    const confirm: boolean = window.confirm("Are you sure you want to back?");
    if (confirm) {
      navigate.push("/");
    }
  };

  let columns: GridColDef[] = [
    {
      field: "company_uen",
      headerName: constant.COMPANYUEN,
      width: 150,
    },
    {
      field: "company_name",
      headerName: constant.COMPANYNAME,
      width: 160,
    },
    {
      field: "full_name",
      headerName: constant.FULL_NAME,
      width: 130,
    },
    {
      field: "company_position",
      headerName: constant.COMPANY_POSITION,
      width: 180,
    },
    {
      field: "email",
      headerName: constant.EMAIL,
      width: 200,
    },
    {
      field: "mobile_no",
      headerName: constant.MOBILE_NO,
      width: 140,
    },
    {
      field: constant.ACTIONS.toLowerCase(),
      headerName: constant.BANK_STATEMENTS,
      width: 130,
      renderCell: (params: GridCellParams) => [
        <React.Fragment key={params.row.id}>
          <Link
            className="bg-sky-500 hover:bg-sky-700"
            style={{ padding: 8 }}
            href={{
              pathname: `${URL}${params.row.file}`,
            }}
          >
            View PDF
          </Link>
        </React.Fragment>,
      ],
    },
  ];

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
            SME Health Care
          </h1>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          {loader ? (
            <Box
              sx={{ height: 400, width: "100%" }}
              style={{ textAlign: "center" }}
            >
              <CircularProgress size={25} />
            </Box>
          ) : (
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={datas}
                columns={columns}
                pageSizeOptions={[5, 10, 30, 50, 100]}
              />
            </Box>
          )}
        </Grid>
        <Grid>
          <Button
            variant="contained"
            style={{
              color: "black",
            }}
            onClick={handleLogout}
            type="button"
          >
            {constant.BACK}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
