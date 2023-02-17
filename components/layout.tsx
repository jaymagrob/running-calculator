import Head from "next/head";
import Box from "@mui/material/Box";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Head>
          <title>
            Runner's Calculators: A collection of calculators to help you reach
            your running goals
          </title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Runner's Calculators are a collection of calculators to help you calculate your pace, energy and splits."
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Header />
        <Box sx={{ marginTop: 13 }}>{children}</Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}
