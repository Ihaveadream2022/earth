import React from "react";

const LoginLogo = () => {
    const style: React.CSSProperties = {
        marginTop: "15%",
        height: "120px",
        boxSizing: "border-box",
        width: "100%",
        backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.2))",
        color: "#ccc",
        textAlign: "left",
        lineHeight: "120px",
        fontSize: "50px",
        paddingLeft: "30px",
    };
    return <div style={style}>DIGITAL EARTH</div>;
};

export default LoginLogo;
