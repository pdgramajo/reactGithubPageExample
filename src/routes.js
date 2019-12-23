//import Login from "./views/examples/Login";


import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Gallery from "./pages/public/Gallery";
import Login from "./pages/public/Login";
import PageNotFound from "./pages/public/PageNotFound";
import Services from "./pages/public/Services";
import Unauthorized from "./pages/public/Unauthorized";


import Dashboard from "./pages/private/Dashboard";
import Profile from "./pages/private/Profile";
import Maps from "./pages/private/Maps";
import Tables from "./pages/private/Tables";
import Icons from "./pages/private/Icons";


import Register from "./pages/public/Register";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/private",
    type: "private",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/private",
    type: "private",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/private",
    type: "private",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/private",
    type: "private",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/private",
    type: "private",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-key-25 text-info",
    component: About,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/contact",
    name: "Contact",
    icon: "ni ni-key-25 text-info",
    component: Contact,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "ni ni-key-25 text-info",
    component: Gallery,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/pageNotFound",
    name: "PageNotFound",
    icon: "ni ni-key-25 text-info",
    component: PageNotFound,
    layout: "/public",
    type: "",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/services",
    name: "Services",
    icon: "ni ni-key-25 text-info",
    component: Services,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    icon: "ni ni-key-25 text-info",
    component: Unauthorized,
    layout: "/public",
    type: "",
    allowedRoles: ['Manager', 'Admin', 'User']
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/public",
    type: "public",
    allowedRoles: ['Manager', 'Admin', 'User']
  }
];
export default routes;
