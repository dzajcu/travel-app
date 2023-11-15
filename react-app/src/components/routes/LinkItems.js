import {
    FiMap,
    FiTrendingUp,
    FiStar,
    FiSettings,
    FiUsers,
    FiCalendar,
} from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";

const LinkItems = [
    { name: "Map", path: "/menu/map", icon: FiMap },
    { name: "Explore", path: "/menu/explore", icon: MdOutlineTravelExplore },
    { name: "Planer", path: "/menu/planer", icon: FiCalendar },
    { name: "Statistics", path: "/menu/statistics", icon: FiTrendingUp },
    { name: "Favorites", path: "/menu/favorites", icon: FiStar },
    { name: "Groups", path: "/menu/groups", icon: FiUsers },
];

export default LinkItems;
