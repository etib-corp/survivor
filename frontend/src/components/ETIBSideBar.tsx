import { Sidebar } from "flowbite-react";

const ETIBSideBar: React.FC<{ properties: any }> = ({ properties }) => {
    return (
        <Sidebar>
            <Sidebar.Items>
                {properties.map((group: any) => (
                    <Sidebar.ItemGroup>
                        {group.map((property: any) => (
                            <Sidebar.Item href={property.href} icon={property.icon} >
                                {property.content}
                            </Sidebar.Item>
                        ))}
                    </Sidebar.ItemGroup>
                ))}
            </Sidebar.Items>
        </Sidebar>
    )
}

export default ETIBSideBar;