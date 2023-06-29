import React, { useState, useSyncExternalStore } from 'react'
import theme from "../../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import FullLayout from "../../../src/layouts/FullLayout";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
const addproducts = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form, setform] = useState({})
    const handleChange = (e) => {
        setform({
            ...form, [e.target.name]: e.target.value
        })
        console.log(form);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addProducts`, {
            method: "POST",
            body: JSON.stringify(form),
        });
        const jsonResponse = response.json()
        const finalresponse = await jsonResponse;
        if (finalresponse.success) {
            toast.success(finalresponse.message)
        } else {
            toast.error(finalresponse.error)
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
                footer,sidebar{
                    display:none;
                }
            `}
            </style>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <CssBaseline />
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard  title="Add a Product">
                            <Stack spacing={3}>
                                <TextField
                                    onChange={handleChange} value={form.title}
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                />
                                <TextField onChange={handleChange} value={form.color} name="color" label="Colour" variant="outlined" />
                                <TextField onChange={handleChange} value={form.size} name="size" label="Size" variant="outlined" />
                                <TextField onChange={handleChange} value={form.type} name="type" label="Type" variant="outlined" />
                                <TextField onChange={handleChange} value={form.slug} name="slug" label="Slug" variant="outlined" />
                                <TextField
                                    onChange={handleChange}
                                    value={form.description}
                                    name="description"
                                    label="Description"
                                    multiline
                                    rows={4}
                                />
                                <TextField
                                    onChange={handleChange} value={form.price}
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                />

                            </Stack>
                            <br />
                            <Button onClick={handleSubmit} variant='contained' mt={2} color='error' className='bg-red-600'>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}

export default addproducts