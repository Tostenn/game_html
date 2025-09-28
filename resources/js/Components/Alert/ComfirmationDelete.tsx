import { Link, router, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

interface param {
    title: string;
    content: string;
    link: string;
    id:string;
    methode?:string;
}

function ComfirmationDelete({ title, content, link, id, methode='del' }: param) {

    const deletes = () => {
        switch (methode) {
            case 'del':
                router.delete(link);
                break;
            case 'post':
                router.post(link);
                break;
            case 'put':
                router.put(link);
                break;
        
            default:
                break;
        }
    };

    return (
        <>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{content}</p>
                    <form method="dialog" className="modal-backdrop flex items-center justify-end gap-2">
                        <button className="btn">close</button>
                        <button className="btn" onClick={deletes}>comfimer</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default ComfirmationDelete;
