import AppRoutes from "./routes/routes";
import './App.scss';

export default function App() {
  // document.cookie = 'user_id=; path=/; max-age=-1'
  return (
    <>
      <AppRoutes />
    </>
  )
}