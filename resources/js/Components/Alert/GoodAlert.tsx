import React, { useEffect, useState } from "react";
import Success from "./Success";
import Danger from "./Danger";
import Warnig from "./Warnig";
import Info from "./Info";

interface Parma {
    type_alert: "success" | "error" | "warning" | "info";
    message: string;
}

function GoodAlert({ type_alert, message }: Parma) {
    const [visible, setVisible] = useState(true);

    const [internalKey, setInternalKey] = useState(Date.now());

    // Réinitialise l'affichage à chaque nouveau message
    useEffect(() => {
        setVisible(true);
        setInternalKey(Date.now()); // force React à recréer le composant
    }, [message]);

    if (!message || !visible) return null;

    const commonProps = { message, onClose: () => setVisible(false) };

    return (
        <div
            key={internalKey}
            className="max-w-md z-20 fixed top-18 space-y-4 right-4"
        >
            {type_alert === "success" && <Success {...commonProps} />}
            {type_alert === "error" && <Danger {...commonProps} />}
            {type_alert === "warning" && <Warnig {...commonProps} />}
            {type_alert === "info" && <Info {...commonProps} />}
        </div>
    );
}

export default GoodAlert;
