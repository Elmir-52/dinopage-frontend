import { Route, Routes, type RouteObject } from "react-router";
import AuthorizationView from "../views/AuthorizationView/AuthorizationView";
import MainView from "../views/MainView/MainView";
import AccountView from "../views/AccountView/AccountView";
import NoteTextView from "../views/NoteTextView/NoteTextView";
import RegistrationView from "../views/RegistrationView/RegistrationView";

export default function AppRoutes() {
    const navigationRoutes: RouteObject[] = [
        {path: '/', element: <MainView />},
        {path: '/note-text', element: <NoteTextView />},
        {path: '/auth', element: <AuthorizationView />},
        {path: '/reg', element: <RegistrationView />},
        {path: '/account', element: <AccountView />},
    ]

    return(
        <Routes>{ navigationRoutes.map((route: RouteObject) => {
            return <Route key={route.path} path={route.path} element={route.element} />
        }) }</Routes>
    )
}