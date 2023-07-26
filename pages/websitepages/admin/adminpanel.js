import connectToMongo from '@/middleware/mongooose';
connectToMongo()
import React from 'react'
import { Grid } from "@mui/material";
import BlogCard from "../../../src/components/dashboard/BlogCard";
import SalesOverview from "../../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../../src/components/dashboard/DailyActivity";
import AllProducts from "../../../src/components/dashboard/AllProducts";
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import Product from '@/models/Product';

const adminpanel = (props) => {
    const { products } = props;
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
                        <SalesOverview />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <AllProducts products={products} />
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

export async function getServerSideProps(context) {
    const findProducts = await Product.find();
    return {
        props: { products: JSON.parse(JSON.stringify(findProducts)) }, // will be passed to the page component as props
    };
}