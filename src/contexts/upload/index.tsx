import { createContext, useState } from "react"
import { useJsonQueue } from "src/hooks/useJsonQueue"


export const UploadContext = createContext<any>(null)


export const UploadProvider = ({ children }: any) => {
    const queue = useJsonQueue()
    const [currentTab, setCurrentTab] = useState<string>('upload')
    return <UploadContext.Provider value={{ queue, tabs: { currentTab, setCurrentTab } }}>
        {children}
    </UploadContext.Provider>
}
