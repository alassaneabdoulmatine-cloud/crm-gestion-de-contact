"use client"

import * as React from "react"
import Link from "next/link" // Ou "react-router-dom" selon ton framework
import {
    BadgeDollarSign,
    Briefcase,
    ChevronDown,
    LayoutDashboard,
    Settings,
    Building2,
    Users2,
    LogOut,
    UserCircle,
    // Renommer l'icône pour éviter le conflit avec le composant Link
    Link as LinkIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"

const items = [
    {
        title: "Dashboard",
        to: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Contacts",
        to: "/contacts",
        icon: Users2,
    },
    {
        title: "Entreprises",
        to: "/entreprises",
        icon: Building2,
    },
    {
        title: "Deals",
        to: "/deals",
        icon: BadgeDollarSign,
    },
]

export function AppSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            {/* Header : Logo & Workspace */}
            <SidebarHeader className="pt-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white">
                                        <Briefcase className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">CRM Workspace</span>
                                        <span className="truncate text-xs text-muted-foreground">Pro Plan</span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4 opacity-50" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width] rounded-xl">
                                <DropdownMenuItem>Mon Entreprise</DropdownMenuItem>
                                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Content : Main Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                {/* Utilisation de asChild pour intégrer le Link proprement */}
                                <SidebarMenuButton asChild tooltip={item.title} className={` ${item.to === pathname ? "bg-sidebar-foreground" : ""}`}>
                                    <Link href={item.to}>
                                        <item.icon className={`${item.to === pathname ? "text-white" : ""}`} />
                                        <span className={`${item.to === pathname ? "text-white" : ""}`}>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer : User Profile avec Dropdown */}
            <SidebarFooter className="pb-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="rounded-xl hover:bg-sidebar-accent">
                                    <UserCircle className="size-6 text-muted-foreground" />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Abdoul Matine</span>
                                        <span className="truncate text-[10px] text-muted-foreground">Admin</span>
                                    </div>
                                    <Settings className="ml-auto size-4 opacity-40" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top" align="end" className="w-56 rounded-xl p-2 shadow-lg">
                                <DropdownMenuItem className="rounded-lg cursor-pointer">
                                    <UserCircle className="mr-2 size-4" /> Profil
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                                    <LogOut className="mr-2 size-4" /> Déconnexion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}