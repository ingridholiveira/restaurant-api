import React from "react";
import { Route, Routes } from "react-router-dom";

import Orders from "./components/Orders";
import Kitchen from "./components/Kitchen";
import Delivery from "./components/Delivery";

const Rotas = () => {
    console.log('rotas routesjs')
   return(
       <Routes>
           <Route element = {<Orders />}  path="/" exact />
           <Route element = {<Kitchen />}  path="/kitchen" />
           <Route element = {<Delivery />}  path="/delivery" />
       </Routes>
   )
}

export default Rotas;