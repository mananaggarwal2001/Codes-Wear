import connectToMongo from '@/middleware/mongooose';
connectToMongo()
import React from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import { CssBaseline, Grid } from "@mui/material";
import ProductPerfomance from '@/src/components/dashboard/AllProducts';
import Product from '@/models/Product';

const allproducts = (props) => {
    const { products } = props;
    console.log(products)
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
                        <ProductPerfomance products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export default allproducts

export async function getServerSideProps(context) {
    const findProducts = await Product.find();
    return {
        props: { products: JSON.parse(JSON.stringify(findProducts)) }, // will be passed to the page component as props
    };
}
