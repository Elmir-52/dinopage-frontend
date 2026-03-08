import AppRoutes from "./routes/routes";
import './App.scss';

export interface NoteDb { 
    note_id: string,
    user_id: string,
    title: string, 
    content: string,
    date: string
}

export interface UserDb {
    user_id: string,
    name: string,
    password: string,
}

export default function App() {
  // document.cookie = 'user_id=; path=/; max-age=-1'
  return (
    <>
      <AppRoutes />
    </>
  )
}