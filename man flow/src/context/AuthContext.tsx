import { createContext, useEffect, useState } from "react";
import type { User } from '../type';
import type { UserRole } from "../type";

type AuthContextType = {
    user: User | null;
    login: (role:UserRole) => void;
    logout: ()=> void;
};

const AuthContext = createContext<AuthContextType | null> (null);