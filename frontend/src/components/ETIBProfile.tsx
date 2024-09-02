import { Avatar } from "flowbite-react";

export const ETIBProfile: React.FC<{ properties: any }> = ({ properties }) => {
    return (
            <div>
                <Avatar img={properties.icon} alt="avatar"/>
                <h2>{properties.content}</h2>
                <p>{properties.description}</p>
                <p>Address: {properties.adress}</p>
                <p>Phone Number: {properties.number}</p>
            </div>
    );
};