import Home from 'views/Index';
import Create from 'views/CreateContact';

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "fas fa-home",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/create",
    name: "Create / Edit",
    icon: "fas fa-user-edit",
    component: Create,
    layout: "/admin",
  }
];
export default routes;
