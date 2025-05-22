"use client"

import Modal from "@/components/Modal"
import React, { createContext, useContext, useState } from "react"

const ModalContext = createContext<any>({})

interface IProps {
    toggle: boolean
}

const ModalProviderContainer = ({ children }: { children: React.ReactNode }) => {

    const [config, setConfig] = useState<IProps>({
        toggle: false
    })

    return (
        <ModalContext.Provider
            value={{
                config,
                set: setConfig
            }}
        >
            {!!config.toggle && <Modal {...config} />}
        </ModalContext.Provider>
    )
}

const useModal = () => useContext(ModalContext)

export { ModalProviderContainer as ModalProvider, useModal }