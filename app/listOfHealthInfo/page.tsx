"use client";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { listOfHealthInfo } from "../Redux/Slice/healthInfo";
import { listOfHealthInfoAPI } from "../APIs/healthInfoAPIs";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { constant, statusCodeConstant } from "../Utils/constants";
import { hideLoader, showLoader } from "../Redux/Slice/loaderSlice";
import { HealthInfoResponse } from "../Utils/healthInfoInterface";
import { AxiosResponse } from "axios";

export default function Dashboard() {
  //Redux
  const dispatch = useDispatch();
  const {
    loader,
  }: {
    loader: boolean;
  } = useSelector((state: any) => state?.loader);
  const { datas } = useSelector((state: any) => state?.healthInfo);

  const [fieldModel, setFieldModel] = useState("");
  const [orderModel, setOrderModel] = useState<string | null>("");
  const [pageModel, setPageModel] = useState<number>(0);
  const [pageSizeModel, setPageSizeModel] = useState<number>(5);

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPageModel(model.page);
    setPageSizeModel(model.pageSize);
    fetchHealthInfoDataFromApi(model.page, model.pageSize);
  };

  const handleSortModelChange = (model: GridSortModel) => {
    setFieldModel(model[0]?.field !== undefined ? model[0].field : "");
    setOrderModel(model[0]?.sort !== undefined ? model[0].sort : "");
    fetchHealthInfoDataFromApi(
      pageModel,
      pageSizeModel,
      model[0]?.field !== undefined ? model[0].field : "",
      model[0]?.sort !== undefined ? model[0].sort : ""
    );
  };

  const fetchHealthInfoDataFromApi = (
    page: number,
    pageSize: number,
    field?: string,
    sort?: string | null
  ) => {
    listOfHealthInfoAPI(page, pageSize, field, sort)
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
    fetchHealthInfoDataFromApi(
      pageModel,
      pageSizeModel,
      fieldModel,
      orderModel
    );
  }, []);

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
              pathname: `/viewPdfFiles`,
              query: {
                id: params.row.id,
              },
            }}
          >
            View PDFs
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
                paginationMode="server"
                sortingMode="server"
                filterMode="server"
                rowCount={6}
                onSortModelChange={handleSortModelChange}
                onPaginationModelChange={handlePaginationModelChange}
                paginationModel={{ page: pageModel, pageSize: pageSizeModel }}
              />
            </Box>
          )}
        </Grid>
        <Grid>
          <Link href="/">
            <Button
              variant="contained"
              style={{
                color: "black",
              }}
              // onClick={handleBack}
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
