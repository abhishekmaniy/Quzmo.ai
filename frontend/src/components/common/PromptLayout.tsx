import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"
import PromptPage from "@/lib/features/prompt/pages/PromptPage"
import { LogOut, Sparkles, User } from "lucide-react"

export default function PromptLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* SIDEBAR */}
        <Sidebar>
          <SidebarHeader className="border-b px-4 py-3">
            <div className="text-lg font-bold">
              Quzmo<span className="text-neutral-500">.ai</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Sparkles className="mr-2 h-4 w-4" />
                      New Prompt
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Abhishek</span>
              </div>
              <LogOut className="h-4 w-4 cursor-pointer text-neutral-500" />
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-neutral-50 dark:bg-neutral-950">
          <PromptPage/>
        </main>
      </div>
    </SidebarProvider>
  )
}
