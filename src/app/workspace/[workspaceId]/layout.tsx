"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  

import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";


interface WorkspaceIdLayoutProps {
    children : React.ReactNode;

};



const WorkspaceIdLayout = ({children} : WorkspaceIdLayoutProps) => {
    const { profileMemberId, parentMessageId, onClose } = usePanel();
    const showPanel = !!parentMessageId || !!profileMemberId

    return ( 
    <div className="h-full"> 
    <Toolbar/>
    <div className="flex h-[calc(100vh-40px)]">
        <Sidebar/>
        <ResizablePanelGroup
        direction="horizontal"
        autoSaveId="hr-workspace-layout"
        >
            <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#3d719f]"
            >
           <WorkspaceSidebar/>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel minSize={20} defaultSize={80}>
            {children}
            </ResizablePanel>

            {showPanel && (
            <>
            <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
              {parentMessageId ? (
                 <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                 />
                ) : profileMemberId ?(
                  <Profile
                  memberId={profileMemberId as Id<"members">}
                  onClose={onClose}
                />

                ) : (
              <div className="flex h-full items-center justify-center">

              <Loader className="size-5 animate-spin text-muted-foreground" />
                </div>
                )}
            </ResizablePanel>
            </>
            )}
        </ResizablePanelGroup>
  
    </div>
       
    </div>
    ); 
};

export default WorkspaceIdLayout; 