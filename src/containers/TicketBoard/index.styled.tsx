import { Box } from "@mui/material";
import styled from "styled-components";

export const PageContainer = styled(Box)(() => ({
  border: "thin solid rgb(204 204 204 / 62%)",
  borderRadius: "8px",
  marginTop: "10px",
  marginBottom: "10px",
  height: "calc(100vh - 25px)",
}));
