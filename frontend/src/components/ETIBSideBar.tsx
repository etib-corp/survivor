import { Avatar, Sidebar } from "flowbite-react";

const ETIBSideBar: React.FC<{ properties: any, OnChangeView: (viewId: number) => void }> = ({ properties, OnChangeView }) => {
    return (
        <Sidebar>
            <Sidebar.Items>
                {properties.map((group: any) => (
                    <Sidebar.ItemGroup>
                        {group.map((property: any) => (
                            <button onClick={() => {OnChangeView(property.id)}}>
                                <Sidebar.Item icon={property.icon}>
                                    <div className="flex">
                                        {property.avatar &&
                                        <Avatar img={property.avatar} alt="avatar" rounded className="flex -ml-4">
                                            {property.content}
                                        </Avatar>}
                                        {!property.avatar &&
                                        <div className="flex ml-4">
                                            {property.content}
                                        </div>}
                                    </div>
                                </Sidebar.Item>
                            </button>
                        ))}
                    </Sidebar.ItemGroup>
                ))}
            </Sidebar.Items>
        </Sidebar>
    )
}

export default ETIBSideBar;