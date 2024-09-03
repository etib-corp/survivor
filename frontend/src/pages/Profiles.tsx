import { useState } from "react";

import { Avatar, Timeline, Rating } from "flowbite-react";
import { Button, Card } from "flowbite-react";
import { HiCalendar } from "react-icons/hi";

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
                        <div>
                            <ETIBProfile properties={user} />
                            <Timeline horizontal className="mt-10">
                                {user.meetings.map((meeting) => (
                                    <Timeline.Item>
                                    <Timeline.Point icon={HiCalendar} />
                                    <Timeline.Content>
                                        <Timeline.Time>
                                            {meeting.date}
                                        </Timeline.Time>
                                        <Rating>
                                            <Rating.Star />
                                            {meeting.rate}
                                        </Rating>
                                        <p>
                                            {meeting.description}
                                        </p>
                                    </Timeline.Content>
                                </Timeline.Item>
                                ))}
                            </Timeline>
                        </div>}
                    <Button onClick={() => setUserShown(user.id)}>View Profile</Button>
                </Card>
            ))}
        </div>
    );
}


export default Profiles;