"use client"

import { ModalProvider } from "./modal"

export * from "./modal"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}