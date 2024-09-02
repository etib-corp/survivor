import { Button } from "flowbite-react";
import Profiles from "./Profiles";

function Home () {
    return (
        <div className="flex flex-wrap gap-2">
            <Button href="/Profiles">Profiles</Button>
        </div>
    );
}

export default Home;