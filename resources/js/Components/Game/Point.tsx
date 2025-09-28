import { Board } from "@/Class/Board";
import { Pawn } from "@/Class/Pawn";
import { Star } from "lucide-react";
import { useState } from "react";

type Params = {
    id: string;
    color?: string;
    board: Board;
    pawn: Pawn;
};

export default function Point({
    id,
    color = "bg-slate-600",
    board,
    pawn,
}: Params) {
    // console.log(pawn.getPosition());
    const position = pawn.getPosition();

 
    const [pos, setPos] = useState({
        id: position?.id,
        top: position?.top,
        left: position?.left,
    });
    const [dragging, setDragging] = useState(false);

    // Quand on clique et on commence à drag
    const handleMouseDown = (e: any) => {
        setDragging(true);
    };

    // Quand on déplace la souris
    const handleMouseMove = (e: any) => {
        if (!dragging) return;
        const rect = e.currentTarget.parentElement.getBoundingClientRect();

        // calculer position relative au container
        const newLeft = ((e.clientX - rect.left) / rect.width) * 100;
        const newTop = ((e.clientY - rect.top) / rect.height) * 100;

        setPos({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    // Quand on relâche le clic
    const handleMouseUp = () => {
        setDragging(false);
        console.log(pos);
        

        // @ts-ignore
        let position;
        let id;
        // @ts-ignore
        const closest = board.getClosestNode(
            parseFloat(pos.top),
            parseFloat(pos.left)
        );
        
        // @ts-ignore
        if (!board.isOccupied(closest?.id) && (board.isConnected(pawn.current, closest?.id) || pawn.current == "0")) {
            
            position = board.getNode(closest?.id);
            id = closest?.id;
        }
        // @ts-ignore
        else {
            position = pawn.getPosition();
            id = pawn.current;
            
        }

        setTimeout(() => {
            setPos({ top: position?.top, left: position?.left });
            // @ts-ignore
            pawn.setPosition(id);
        }, 200);
    };

    return (
        <div
            id={id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center 
                  size-16 rounded-full cursor-pointer ${color}`}
            style={{ top: pos.top, left: pos.left }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {" "}
            <Star className="w-8 h-8 text-yellow-500" />
        </div>
    );
}
