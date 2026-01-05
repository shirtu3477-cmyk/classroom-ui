import Create from "../pages/Create/Create";
import Classes from "../pages/Classes/Classes";
import Students from "../pages/Students/Students";

export const ROUTES = [
    {path: '/', label: 'Classes' ,  element: <Classes />},
        {path: '/students', label: 'Students' , element: <Students />},
    {path: '/create', label: 'Create' , element: <Create />},

]