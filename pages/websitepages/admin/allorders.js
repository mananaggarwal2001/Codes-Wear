import React from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import { CssBaseline, Grid } from "@mui/material";
import ProductPerfomance from "../../../src/components/dashboard/AllProducts";

const allorders = () => {
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
                footer{
                    display:none;
                }
            `}
            </style>
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <ProductPerfomance />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export default allorders