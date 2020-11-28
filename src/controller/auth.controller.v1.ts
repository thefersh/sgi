import { Auth } from "../lib/auth";
import { Application, Router, Request, Response } from "express";

const auth = Router();

auth.post('/login', (req, res)=> res.json(true));

export default auth; 