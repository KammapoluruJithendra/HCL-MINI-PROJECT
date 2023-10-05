import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./LoginComponent";
import NewRegisterAccount from "./NewRegisterComponent";
import ShoppingApp, { AddedCartItems } from "./ShoppingComponent";

export default function Homecomponent(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}> </Route>
                    <Route path="/Login" element={<Login/>}></Route>
                    <Route path="/newregister" element={<NewRegisterAccount/>}></Route>
                    <Route path="/forgetpassword" element={<div><h1>Create new account</h1></div>}></Route>
                    <Route path="/Shopping"  element={ <ShoppingApp/>}></Route>
                    <Route path="/Shopping/Cart"  element={<AddedCartItems/>}></Route>
                </Routes>
            </BrowserRouter>
           
        </div>
    )
}