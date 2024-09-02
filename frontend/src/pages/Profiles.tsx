import { useState } from "react";

import { Avatar } from "flowbite-react";
import { Button, Card } from "flowbite-react";
import { ETIBProfile } from "../components/ETIBProfile";
import { users } from "../data";

function Profiles() {
    const [userShown, setUserShown] = useState(0);

    return (
        <div>
            {users.map((user) => (
                <Card className="flex flex-col gap-2">
                    {userShown !== user.id &&
                    <h5>
                        {user.content}
                    </h5>
                    }
                    {userShown === user.id &&
                    <ETIBProfile properties={user} />}
                    <Button onClick={() => setUserShown(user.id)}>View Profile</Button>
                </Card>
            ))}
        </div>
    );
}


export default Profiles;