import express from "express";
import userRoutes from "./user/user.routes";

const routes = (route: any) =>{
	route.use(express.json())

	userRoutes(route)
}	

export default routes;
