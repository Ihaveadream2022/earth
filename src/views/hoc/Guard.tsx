import React, { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { clearToken } from "../../stores/reducers/auth";
import { RootState } from "../../stores";

interface props {
    children: React.ReactNode;
}

const Guard: React.FC<props> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.ACCESS_TOKEN);
    useEffect(() => {
        const tokenCookie = Cookies.get(`AUTH`);
        if (!tokenCookie) {
            dispatch(clearToken());
            navigate("/login");
            window.location.reload();
        }
    }, [location.pathname]); // eslint-disable-line

    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default Guard;
