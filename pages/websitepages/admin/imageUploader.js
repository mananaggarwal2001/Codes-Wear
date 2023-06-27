import React from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";

const imageUploader = () => {
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

            </FullLayout>
        </ThemeProvider>
    );
}

export default imageUploader