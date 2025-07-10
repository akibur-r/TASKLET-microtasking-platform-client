import { NavLink } from "react-router";

const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
];

export const navItems = navItemsData.map((item) => (
  <NavLink key={item.name} to={item.url}>
    {item.name}
  </NavLink>
));
