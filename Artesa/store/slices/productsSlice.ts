import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductItem = {
    name: string;
    category: string;
    price: string;
    quantity: string;
    image: string | null;
};

type ProductState = {
    items: ProductItem[];
}

const initialState: ProductState = {
    items: [{
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: null
    },{
        name: "",
        category: "",
        price: "",
        quantity: "",
        image: null
    }],
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
        addProductItem: (state, action: PayloadAction<ProductItem>)=> {
            state.items.push(action.payload)
        }
    }
});

export const {addProductItem} = productSlice.actions;
export default productSlice.reducer;
