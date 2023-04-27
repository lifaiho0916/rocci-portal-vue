import Index from "@/components/Index";
import Error from "@/components/Error";
import Profile from "@/components/Profile";
import Users from "@/components/Users";
import Discounts from "@/components/Discounts";

export default [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: { title: "Login", guard: false },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    props: true,
    meta: { title: "Profile", guard: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    props: true,
    meta: { title: "Users", guard: true },
  },
  {
    path: "/discounts",
    name: "Discounts",
    component: Discounts,
    props: true,
    meta: { title: "Discounts", guard: true },
  },
  {
    path: "*",
    name: "Error",
    component: Error,
    props: true,
    meta: { title: "Error" },
  },
  //******************************** */
  //******************************* */
];
