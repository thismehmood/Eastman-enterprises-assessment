import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await axios.get(
            "https://dummyjson.com/products?limit=1000"
        );
        return response.data.products;
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (payload) => {
        const response = await axios.post(
            "https://dummyjson.com/products/add",
            payload
        );

        return response.data;
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, payload }) => {
        const response = await axios.put(
            `https://dummyjson.com/products/${id}`,
            payload
        );
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = "succeeded";
                toast.success("Product added successfully");

                state.items.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = "failed";
                toast.error("something went wrong");

                state.error = action.error.message;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                state.status = "succeeded";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                toast.success("Product Updated successfully");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                toast.error("something went wrong");
            });
    }
});

export default productSlice.reducer;
