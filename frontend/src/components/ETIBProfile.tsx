import { Avatar, List } from "flowbite-react";

export const ETIBProfile: React.FC<{ properties: any }> = ({ properties }) => {
    return (
            <div className="flex flex-row">
                <Avatar img={properties.avatar} alt="avatar" className="flex justify-normal size-28" size=""/>
                <div className="flex flex-col ml-10">
                    <h2 className="font-bold text-xl mb-4">{properties.content}</h2>
                    <List>
                        <List.Item>
                            Address: {properties.adress}
                        </List.Item>
                        <List.Item>
                            Phone Number: {properties.number}
                        </List.Item>
                        <List.Item>
                            {properties.description}
                        </List.Item>
                    </List>
                </div>
            </div>
    );
};