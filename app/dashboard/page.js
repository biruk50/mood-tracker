import Dashboard from "@/Components/Dashboard";
import Main from "@/Components/Main";

export const metadata = {
    title: "Mood Tracker/Dashboard",
};

export default function DashboardPage(){

    return (
        <Main>
            <Dashboard />
        </Main>
    )
}