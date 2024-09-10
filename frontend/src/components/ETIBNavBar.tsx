import { useNavigate } from "react-router-dom";

import AuthContext, { useAuth } from "./AuthContext";

import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { RiMessage2Line } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

const ETIBNavBar: React.FC<{ properties: any, OnChangeView: (viewName: any) => void }> = ({ properties, OnChangeView }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  let name = "";
  let email = "";
  let surname = "";
  let role = {
    path: "",
    type: ""
  };
  let id = "";

  const userInfo: any = localStorage.getItem("userData") || "";

  if (userInfo) {
    try {
      const parsedUserInfo = JSON.parse(userInfo);
      name = parsedUserInfo.name;
      email = parsedUserInfo.email;
      surname = parsedUserInfo.surname;
      switch (parsedUserInfo.roles[0]) {
        case "ROLE_ADMIN":
          role.path = "/employees/";
          role.type = "admin";
          break;
        case "ROLE_COACH":
          role.path = "/employees/";
          role.type = "coach";
          break;
        case "ROLE_CUSTOMER":
          role.path = "/customers/";
          role.type = "customer";
          break;
        default:
          role.path = "kbo.png";
          role.type = "unknown";
          break;
      }
      id = parsedUserInfo.id;
    } catch (error) {
      console.error("Parsing error:", error);
    }
  }

  const profilePicture = role.type !== "unknown" ? process.env.REACT_APP_PICTURES_URL + role.path + id + ".png" : "kbo.png";

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar fluid rounded className="shadow-sm">
      <Navbar.Toggle />
      <Navbar.Brand>
        <span className="sm:text-lg text-sm self-center whitespace-nowrap dark:text-white">
          Soul Connection
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 sm:space-x-5 space-x-4">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={profilePicture} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {name + " " + surname}
            </span>
            <span className="block truncate text-sm font-medium">
              {email}
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
        {
          role.type === "admin" &&
          <Navbar.Link className="focus:text-blue" active={properties.page === "dashboard"} onClick={() => { navigate("/Home"); OnChangeView({ page: "dashboard" }) }}>
            Dashboard
            {
              properties.page === "dashboard" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
        {
          role.type === "admin" &&
          <Navbar.Link className="focus:text-blue" active={properties.page === "coaches"} onClick={() => { navigate("/Coaches"); OnChangeView({ page: "coaches" }) }}>
            Coaches
            {
              properties.page === "coaches" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
        {
          role.type !== "customer" &&
          <Navbar.Link className="focus:text-blueT" active={properties.page === "customers"} onClick={() => { navigate("/Customers"); OnChangeView({ page: "customers" }) }}>
            Customers
            {
              properties.page === "customers" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
        {
          role.type !== "customer" &&
          <Navbar.Link className="focus:text-blueT" active={properties.page === "tips"} onClick={() => { navigate("/Tips"); OnChangeView({ page: "tips" }) }}>
            Tips
            {
              properties.page === "tips" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
        {
          role.type !== "customer" &&
          <Navbar.Link className="focus:text-blueT" active={properties.page === "events"} onClick={() => { navigate("/Events"); OnChangeView({ page: "events" }) }}>
            Events
            {
              properties.page === "events" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
        <Navbar.Link className="focus:text-blueT" active={properties.page === "wardrobe"} onClick={() => { navigate("/Wardrobe"); OnChangeView({ page: "wardrobe" }) }}>
          Wardrobe
          {
            properties.page === "wardrobe" &&
            <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
          }
        </Navbar.Link>
        {
          role.type !== "customer" &&
          <Navbar.Link className="focus:text-blueT" active={properties.page === "compatibility"} onClick={() => { navigate("/Compatibility"); OnChangeView({ page: "compatibility" }) }}>
            Compatibility
            {
              properties.page === "compatibility" &&
              <div className="sm:visible invisible relative h-[3px] bg-blueT top-[1.15rem] top rounded-md" />
            }
          </Navbar.Link>
        }
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
