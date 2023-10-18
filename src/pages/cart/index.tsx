import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box , Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createOrder, updateQuantity } from "@/store/slices/cartSlice";
import { useRouter } from "next/router";

const Cart = () => {
    const router = useRouter();
    const cartItems = useAppSelector((store) => store.cart.items);
    const dispatch = useAppDispatch();

    const getCartTotalPrice = () => {
        let totalPrice = 0;
        // for (let i = 0; i < cartItems.length ; i++) {
        //     totalPrice += cartItems[i].price;
        // }
        cartItems.forEach((element) => (totalPrice += element.price * element.quantity))
        return totalPrice;
    }

    const handleUpdateQuantity = (id : number , qtn : number) => {
        dispatch(updateQuantity({id : id , quantity : qtn}));
    };

    const onSuccess = (data :any) => {
        router.push(`/comfirmation?orderId=${data.id}&status=${data.status}`);
    }
    const onError = () => {}

    const handleComfirmOrder = () => {
        dispatch(createOrder({ payload : cartItems , onSuccess , onError }));
        // router.push("/comfirmation");
    }
        
    return (
        <Box>
            <Box>
                {cartItems.length ? 
                <Box  sx={{ display: "flex", flexDirection: "column", justifyContent: "center",gap : "10px"}}>
                    {cartItems.map((element) => 
                    <Box key={element.id} sx={{display : "flex",ml: 20, mt: "20px"}}>
                        <Box sx={{display : "flex", gap: 10, width: 800}}>
                            <img src={ element.imageUrl || ""} width={150} style={{borderRadius: "10px"}}/>
                            <Box sx={{display: "flex", flexDirection: "column", justifyContent:"center", gap: "20px"}}>
                                <Typography variant="h5">{element.title}</Typography>
                                <Typography variant="h6">$ {element.price * element.quantity}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: "flex", alignItems:"center", gap: "10px"}}>
                            <RemoveCircleOutlineIcon sx={{fontSize: "40px", cursor: "pointer", color: "purple"}} onClick={() => {
                                handleUpdateQuantity(element.id , element.quantity - 1)
                            }} />
                            <Typography variant="h5">{element.quantity}</Typography>
                            <AddCircleOutlineIcon sx={{fontSize: "40px", cursor: "pointer", color: "purple"}} onClick={() => {
                                handleUpdateQuantity(element.id , element.quantity + 1)
                            }} />
                        </Box>
                    </Box>
                    )}
                </Box> 
                : <Typography variant="h1" sx={{ml : "35vw"}}>Empty cart</Typography> 
                }
            </Box>
            {cartItems.length > 0 && <Box sx={{ display : "flex", flexDirection : "column", alignItems: "center", gap: "20px", mt: "10px"}}>
                    <Typography variant="h4">Total price : {getCartTotalPrice()}</Typography>
                    <Button variant="contained" onClick={() => {
                        handleComfirmOrder();   
                    } }>Confirm Order</Button>
                </Box>
            }
        </Box>
    )
}

export default Cart;