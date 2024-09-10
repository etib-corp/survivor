import { useNavigate } from "react-router-dom";

import AuthContext, { useAuth } from "./AuthContext";

import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { RiMessage2Line } from "react-icons/ri";
import { useContext } from "react";

import { jwtDecode } from "jwt-decode";

const ETIBNavBar: React.FC<{ properties: any, OnChangeView: (viewName: any) => void }> = ({ properties, OnChangeView }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const userToken = localStorage.getItem("authToken") || "";
  const user: any = jwtDecode(userToken);


  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar fluid rounded className="shadow-sm">
      <Navbar.Toggle />
      <Navbar.Brand href="https://flowbite-react.com">
        <span className="sm:text-lg text-sm self-center whitespace-nowrap dark:text-white">
          Soul Connection
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 sm:space-x-5 space-x-4">
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
              {user.username}
            </span>
          </Dropdown.Header>
          {/* <Dropdown.Item>Settings</Dropdown.Item> */}
          {/* <Dropdown.Divider /> */}
          <Dropdown.Item onClick={handleSignOut}>
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="focus:text-blue" active={properties.page === "dashboard"} onClick={() => { navigate("/Home"); OnChangeView({ page: "dashboard" }) }}>
          Dashboard
          {
            properties.page === "dashboard" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blue" active={properties.page === "coaches"} onClick={() => { navigate("/Coaches"); OnChangeView({ page: "coaches" }) }}>
          Coaches
          {
            properties.page === "coaches" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "customers"} onClick={() => { navigate("/Customers"); OnChangeView({ page: "customers" }) }}>
          Customers
          {
            properties.page === "customers" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "tips"} onClick={() => { navigate("/Tips"); OnChangeView({ page: "tips" }) }}>
          Tips
          {
            properties.page === "tips" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "events"} onClick={() => { navigate("/Events"); OnChangeView({ page: "events" }) }}>
          Events
          {
            properties.page === "events" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "wardrobe"} onClick={() => { navigate("/Wardrobe"); OnChangeView({ page: "wardrobe" }) }}>
          Wardrobe
          {
            properties.page === "wardrobe" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "compatibility"} onClick={() => { navigate("/Compatibility"); OnChangeView({ page: "compatibility" }) }}>
          Compatibility
          {
            properties.page === "compatibility" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        <Navbar.Link className="focus:text-blueT" active={properties.page === "elearning"} onClick={() => { navigate("/Elearning"); OnChangeView({ page: "elearning" }) }}>
          E-learning
          {
            properties.page === "elearning" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ETIBNavBar;
