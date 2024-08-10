import React from 'react';
import {Navigate} from 'react-router-dom';
import {useUserContext} from "../contexts/UserContext.tsx";
import {loginPagePath, NO_TOKEN} from "../utils.ts";

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({component: Component, roles}) => {
    const {token, role} = useUserContext();

    if (token === NO_TOKEN || !roles.includes(role)) {
        return <Navigate to={loginPagePath}/>;
    }

    return <Component/>;
};

export default ProtectedRoute;
