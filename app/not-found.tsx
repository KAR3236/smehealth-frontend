import { Button, Paper } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 900,
        flexGrow: 1,
        textAlign: "center",
      }}
    >
      <h1>
        <b>Not Found</b>
      </h1>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button type="button" variant="contained" sx={{ mt: 1, mr: 1 }}>
          Return Home
        </Button>
      </Link>
    </Paper>
  );
}
