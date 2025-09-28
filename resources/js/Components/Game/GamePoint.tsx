import { Star } from "lucide-react"; // tu peux changer d’icône

export default function GamePoint({ id, top, left, icon, color = "bg-white" }: any) {
  return (
    <div
      id={id}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                  flex items-center justify-center size-16 rounded-full shadow ${color}`}
      style={{ top, left }}
    >
      {icon ? (
        icon
      ) : (
        <Star className="w-8 h-8 text-yellow-500" /> // icône par défaut
      )}
    </div>
  );
}
