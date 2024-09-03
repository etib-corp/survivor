import { Button } from "flowbite-react";
import Profiles from "./Profiles";

function Home () {
    return (
        <div className="flex flex-wrap gap-2">
            <Button href="/Profiles">Profiles</Button>
            <Button href="/Statistics">Statistics</Button>
            <Button href="/Account">Account</Button>
        </div>
    );
}

export default Home;