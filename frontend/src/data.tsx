import { HiUser } from "react-icons/hi";

const meetings = [
    { date: "2021-10-01", time: "10:00", location: "Paris", description: "description1", rate: 5 },
    { date: "2021-10-02", time: "11:00", location: "Paris", description: "description2", rate: 4 },
    { date: "2021-10-03", time: "12:00", location: "Paris", description: "description3", rate: 5 },
    { date: "2021-10-04", time: "13:00", location: "Paris", description: "description4", rate: 3 },
    { date: "2021-10-05", time: "14:00", location: "Paris", description: "description5", rate: 1 },
    { date: "2021-10-06", time: "15:00", location: "Paris", description: "description6", rate: 4 },
    { date: "2021-10-07", time: "16:00", location: "Paris", description: "description7", rate: 2 },
    { date: "2021-10-08", time: "17:00", location: "Paris", description: "description8", rate: 2 },
    { date: "2021-10-09", time: "18:00", location: "Paris", description: "description9", rate: 1 }
];

export const users = [
    { id: 1, href: "#", icon: HiUser, content: "User 1", adress: "toto1", number: "0692111111", description: "description1", avatar: "kbo.png", meetings: meetings },
    { id: 2, href: "#", icon: HiUser, content: "User 2", adress: "toto2", number: "0692111112", description: "description2", avatar: "kbo.png", meetings: meetings },
    { id: 3, href: "#", icon: HiUser, content: "Nathan Maillot", adress: "toto3", number: "0692111113", description: "description3", avatar: "kbo.png", meetings: meetings },
    { id: 4, href: "#", icon: HiUser, content: "User 4", adress: "toto4", number: "0692111114", description: "description4", avatar: "kbo.png", meetings: meetings },
];

export const coaches = [
    { id: 1, href: "#", icon: HiUser, content: "Coach 1", adress: "toto1", number: "0692111111", description: "description1", avatar: "kbo.png", meetings: [35, 20, 48, 12] },
    { id: 2, href: "#", icon: HiUser, content: "Coach 2", adress: "toto2", number: "0692111112", description: "description2", avatar: "kbo.png", meetings: [51, 18, 12, 25] },
    { id: 3, href: "#", icon: HiUser, content: "Coach 3", adress: "toto3", number: "0692111113", description: "description3", avatar: "kbo.png", meetings: [51, 24, 50, 51] },
    { id: 4, href: "#", icon: HiUser, content: "Coach 4", adress: "toto4", number: "0692111114", description: "description4", avatar: "kbo.png", meetings: [84, 85, 65, 47] },
];
