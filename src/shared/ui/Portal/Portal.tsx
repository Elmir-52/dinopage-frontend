'use client'

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: React.ReactNode
}

export function Portal({ children }: PortalProps) {
    const [body, setBody] = useState<HTMLElement>();

    useEffect(() => {
        setBody(document.body);
    }, []);

    return (
        body &&
        createPortal(
            children,
            body
        )
    )
}