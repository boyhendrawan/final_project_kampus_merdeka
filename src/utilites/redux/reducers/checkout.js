import { createSlice } from "@reduxjs/toolkit";
const initialState={
    dataCheckout:null,
    isLoading:false,
    dataCheckoutUnpaid:null,
    dataCheckoutPaid:null,
    dataSidePage:null,
}

const checkoutSlice=createSlice({
    name:"checkoutSlice",
    initialState,
    reducers:{

        setParamsNextPage(state,action){
            const dataCheckout=
                {
                    uuid_transaction:action.payload.data.map(e=>e.uuid_transaction),
                    uuid_schedule:action.payload.data[0].uuid_schedules,
                    stepper:'2',
                    pessengers:action.payload.data.length,
                };
                state.dataCheckout=dataCheckout;
            // action.payload.setParams(queryString.stringify(dataCheckout));
        },
        changeStatusLoading(state){
            state.isLoading=!state.isLoading
        },
        setDataUnpaid(state,action){
            state.dataCheckoutUnpaid=action.payload;
        },
        setDataPaid(state,action){
            state.dataCheckoutPaid=action.payload;
        },
        setDataSidePage(state,action){
            state.dataSidePage=action.payload;
        },
    }
});

export default checkoutSlice.reducer;
export const {setParamsNextPage,changeStatusLoading,setDataUnpaid,setDataPaid,setDataSidePage}=checkoutSlice.actions;