import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!window.localStorage.getItem('token')){
            navigate('/login');
        }
    }, [])

    return (
        <div>
            main
        </div>
    )
}

export default MainPage;