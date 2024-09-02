import { Avatar } from "flowbite-react";
import { Button, Card } from "flowbite-react";
import { ETIBProfile } from "../components/ETIBProfile";
import { users } from "../data";

function Profiles() {
    return (
        <div>
            <ETIBProfile properties={users.at(0)} ></ETIBProfile>
        </div>
    );
}


export default Profiles;