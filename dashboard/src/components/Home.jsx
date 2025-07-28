import TopBar from "./TopBar"
import Dashboard from "./Dashboard"

export default function Home({ user }) {
    return(
        <>
          <TopBar user={user} />
          <Dashboard user={user} />
        </>
    )
}