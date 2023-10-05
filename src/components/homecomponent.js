import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./LoginComponent";
import NewRegisterAccount from "./NewRegisterComponent";
import Forgetpassword from "./ForgetPasswordComponent";
import ShoppingApp, { AddedCartItems } from "./ShoppingComponent";
import '../node_modules/bootstrap/dist/css/bootstrap.css';


export default function Homecomponent(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}> </Route>
                    <Route path="/Login" element={<Login/>}></Route>
                    <Route path="/newregister" element={<NewRegisterAccount/>}></Route>
                    <Route path="/forgetpassword" element={<Forgetpassword/>}></Route>
                    <Route path="/Shopping"  element={ <ShoppingApp/>}></Route>
                    <Route path="/Shopping/Cart"  element={<AddedCartItems/>}></Route>
                </Routes>
            </BrowserRouter>
           
        </div>
    )
}