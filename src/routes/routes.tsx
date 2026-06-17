import { Route, Routes, type RouteObject } from "react-router";
import MainView from "../views/MainView/MainView";
import NoteTextView from "../views/NoteTextView/NoteTextView";
import RegistrationView from "../views/RegistrationView/RegistrationView";
import LoginView from "../views/LoginView/LoginView";
import ProfileView from "../views/ProfileView/ProfileView";

export default function AppRoutes() {
    const navigationRoutes: RouteObject[] = [
        {path: '/', element: <MainView />},
        {path: '/notes/:noteId', element: <NoteTextView />},
        {path: '/login', element: <LoginView />},
        {path: '/reg', element: <RegistrationView />},
        {path: '/profile', element: <ProfileView />},
    ]

    return(
        <Routes>{ navigationRoutes.map((route: RouteObject) => {
            return <Route key={route.path} path={route.path} element={route.element} />
        }) }</Routes>
    )
}