import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/store/slices/cartSlice";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderComfirmation = () => {
    const [open , setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const router = useRouter();
    const {orderId, status}  = router.query;

    const handleClose = () => {
        setOpen(false);
    }

    const onSuccess = () => {
        setOpen(true);
        setTimeout(()=> {
            router.push("/")
        },3000)
    }

    const handleCancelOrder = () => {
        const orderIdStr = orderId as string
        dispatch(cancelOrder({orderId : orderIdStr , onSuccess }))
    }
    return (
        <Box sx={{display : "flex", flexDirection : "column" , alignItems : "center", justifyContent : "center",  gap : "15px", height : "100vh"}}>
            <Typography variant="h4">Order : {orderId}</Typography>
            <Typography variant="h4">Status : {status}</Typography>
            <Box>
                <Button variant="contained" onClick={handleCancelOrder}>Cancel Order</Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{horizontal : "right", vertical : "bottom"}}>
                <Alert  severity="success" sx={{ width: '100%' }}>
                  Order has been cancel
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default OrderComfirmation;