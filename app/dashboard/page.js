import Dashboard from "@/Components/Dashboard";
import Login from "@/Components/Login";
import Main from "@/Components/Main";

export const metadata = {
    title: "Mood Tracker/Dashboard",
};

export default function DashboardPage(){
    const isAuthenticated =false;
 
    const children= ( isAuthenticated ?
        <Dashboard/> :
        <Login/>
    )
    return (
        <Main>
            {children}
        </Main>
    )
}