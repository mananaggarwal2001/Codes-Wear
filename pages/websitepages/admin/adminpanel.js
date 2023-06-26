import React from 'react'
import { Grid } from "@mui/material";
import BlogCard from "../../../src/components/dashboard/BlogCard";
import SalesOverview from "../../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../../src/components/dashboard/DailyActivity";
import ProductPerfomance from "../../../src/components/dashboard/ProductPerfomance";
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";

const adminpanel = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <SalesOverview />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <ProductPerfomance />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export default adminpanel