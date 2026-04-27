import { UserCircle } from "lucide-react";
import { InputSearch } from "./input-search";
import { SidebarTrigger } from "./ui/sidebar";

export function NavBar() {
    return (
        <div className="flex items-center justify-between p-4 border-b w-full">
            <div className="flex flex-row gap-2 justify-center item-center">
                <SidebarTrigger />
                <InputSearch />
            </div>
        </div>
    );
}