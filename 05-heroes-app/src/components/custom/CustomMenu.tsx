import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <NavigationMenu className="gap-2 mb-5">
      {/* Menu */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("/") && "bg-slate-200 ",
              "hover:bg-slate-100 active:bg-slate-200 focus:bg-slate-200 rounded-md ",
              "p-2",
            )}
          >
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Search Heroes*/}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={cn(
              isActive("/search") && "bg-slate-200 ",
              "hover:bg-slate-100 active:bg-slate-200 focus:bg-slate-200 rounded-md ",
              " p-2",
            )}
          >
            <Link to="/search">Search Heroes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
