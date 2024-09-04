import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { ChatBubble } from "@mui/icons-material";
import { RiMessage2Line } from "react-icons/ri";

const ETIBNavBar: React.FC<{ properties: any, OnChangeView: (viewName: any) => void }> = ({ properties, OnChangeView }) => {
  return (
    <Navbar fluid rounded className="shadow-sm relative">
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl dark:text-white">
            Soul Connection
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-5">
        <RiMessage2Line size="40" />
        <Avatar img="https://cdn-icons-png.flaticon.com/128/5373/5373324.png" rounded />
      <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
                Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
                name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="focus:text-blueT" href="#" active={properties.page == "dashboard"} onClick={() => { OnChangeView({ page: "dashboard" })}}>
          Dashboard
          {
              properties.page == "dashboard" &&
                <div className="relative h-[3px] bg-blueT top-[1.15rem] top rounded-md"/>
            }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" href="#" active={properties.page == "coaches"} onClick={() => { OnChangeView({ page: "coaches" })}}>
            Coaches
            {
                properties.page == "coaches" &&
                <div className="relative h-[3px] bg-blueT top-[1.15rem] top rounded-md"/>
            }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" href="#" active={properties.page == "customers"} onClick={() => { OnChangeView({ page: "customers" })}}>
            Customers
            {
                properties.page == "customers" &&
                <div className="relative h-[3px] bg-blueT top-[1.15rem] top rounded-md"/>
            }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" href="#" active={properties.page == "tips"} onClick={() => { OnChangeView({ page: "tips" })}}>
            Tips
            {
                properties.page == "tips" &&
                <div className="relative h-[3px] bg-blueT top-[1.15rem] top rounded-md"/>
            }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" href="#" active={properties.page == "events"} onClick={() => { OnChangeView({ page: "events" })}}>
            Events
            {
                properties.page == "events" &&
                <div className="relative h-[3px] bg-blueT top-[1.15rem] top rounded-md"/>
            }
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Toggle />
    </Navbar>
  );
}

export default ETIBNavBar;