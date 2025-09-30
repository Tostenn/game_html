import { Board } from "@/Class/Board";
import { Pawn } from "@/Class/Pawn";
import GamePoint from "@/Components/Game/GamePoint";
import Point from "@/Components/Game/Point";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Edge } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Circle, Star } from "lucide-react";
import { useState } from "react";

export default function Game({ game, players }: any) {
    const user = usePage().props.auth.user;
    const token = usePage().props.auth.token;
    const [stateBoard, setStateBoard] = useState(game);
    const [loadgame, setLoadgame] = useState(false);

    const refresh = async () => {
        console.clear();
        setLoadgame(true);
        await axios
            .get(route("game.show", { id: game.id }), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setStateBoard(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoadgame(false);
            });
    };

    const nodes = [
        { id: "0", top: "117.8%", left: "49.76%" },
        { id: "x1", top: "0%", left: "0%" },
        { id: "x2", top: "0%", left: "50%" },
        { id: "x3", top: "0%", left: "100%" },
        { id: "y1", top: "50%", left: "0%" },
        { id: "y2", top: "50%", left: "50%" },
        { id: "y3", top: "50%", left: "100%" },
        { id: "z1", top: "100%", left: "0%" },
        { id: "z2", top: "100%", left: "50%" },
        { id: "z3", top: "100%", left: "100%" },
    ];
    const edges: Edge[] = [
        ["x1", "x2"],
        ["x2", "x3"], // haut horizontal
        ["y1", "y2"],
        ["y2", "y3"], // milieu horizontal
        ["z1", "z2"],
        ["z2", "z3"], // bas horizontal
        ["x1", "y1"],
        ["y1", "z1"], // gauche vertical
        ["x2", "y2"],
        ["y2", "z2"], // milieu vertical
        ["x3", "y3"],
        ["y3", "z3"], // droite vertical
        ["x1", "y2"],
        ["x3", "y2"],
        ["z1", "y2"],
        ["z3", "y2"], // diagonales
    ];
    const winningLines: string[][] = [
        ["x1", "x2", "x3"], // ligne horizontale haut
        ["y1", "y2", "y3"], // ligne horizontale milieu
        ["z1", "z2", "z3"], // ligne horizontale bas
        ["x1", "y1", "z1"], // ligne verticale gauche
        ["x2", "y2", "z2"], // ligne verticale milieu
        ["x3", "y3", "z3"], // ligne verticale droite
        ["x1", "y2", "z3"], // diagonale principale
        ["x3", "y2", "z1"], // diagonale secondaire
    ];
    const player = players.find((player: any) => player.id == user.id);
    player.canMove = stateBoard.current_player_id == user.id;

    const board = new Board(nodes, edges, winningLines);

    const winner = stateBoard.winner_id ? players.find((player: any) => player.id == stateBoard.winner_id) : false;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">game</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <h2 className="p-6 font-bold text-2xl text-gray-900 ">
                            info player
                        </h2>
                        <PrimaryButton
                            onClick={() => router.reload()}
                            disabled={loadgame}
                        >
                            refresh
                        </PrimaryButton>
                        {winner && <p>player {winner.name} win</p>}
                        {players.map((player: any) => (
                            <div key={player.id}>
                                <p>player {player.pivot.player_order}</p>
                                <p>nom {player.name}</p>
                                <p>color {player.pivot.color}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className=" bg-white p-8 space-y-4 ">
                        <span className="text-xl font-semibold leading-tight">
                            id de la partir <span>{stateBoard.id}</span>{" "}
                            <span
                                className={`${
                                    stateBoard.status == "in_progress"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {" "}
                                {stateBoard.status}
                            </span>{" "}
                            <span
                                className={`${
                                    stateBoard.current_player_id == user.id
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {stateBoard.current_player_id == user.id
                                    ? "your turn"
                                    : "not your turn"}
                            </span>
                        </span>
                        <PrimaryButton onClick={refresh} disabled={loadgame}>
                            refresh
                        </PrimaryButton>
                        <div className="h-2"></div>
                        <CarreauChinois
                            player={player}
                            board={board}
                            stateBoard={stateBoard}
                            setStateBoard={setStateBoard}
                            loadgame={loadgame}
                            setLoadgame={setLoadgame}
                            token={token}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function PosZero({}) {
    return (
        <>
            <div className="absolute -bottom-40  left-1/2 -translate-x-1/2 h-20 w-20 bg-gray-300 shadow-md rounded-lg m-auto my-8"></div>
        </>
    );
}

export function CarreauChinois({
    player,
    board,
    stateBoard,
    setStateBoard,
    loadgame,
    setLoadgame,
    token,
}: any) {
    const paws = stateBoard.board_state.game.map((pawn: any) => {
        if (player.pivot.color == pawn.color) {
            return new Pawn(board, pawn.nodeId, pawn.color, stateBoard.status == "finished" ? false : player.canMove);
        } else {
            // if (pawn.nodeId !== "0") {
                return new Pawn(board, pawn.nodeId, pawn.color, false);
            // }
        }
    });

    console.log(paws);
    
    

    const move = async (winner: boolean) => {
        setLoadgame(true);

        paws.forEach((pawn: any) => {
            if (pawn) pawn.canMove = false;
        });
        const boards = board.getBoardState();
        console.log(boards);
        
        await axios
            .post(
                route("game.move", { id: stateBoard.id }),
                { board_state: boards, winner_id: winner ? player.id : null },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((response) => {
                setStateBoard(response.data);
                console.log(response.data);

                setLoadgame(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoadgame(false);
            });
    };

    return (
        <>
            <div className="relative w-[90%] h-[500px] m-auto border-black">
                <PosZero />
                {paws.map((pawn: any, index: number) => {
                    pawn && board.addPawn("panw" + index, pawn);
                    return (
                        !(pawn.current == "0" && pawn.color != player.pivot.color) && (
                            <Point
                                key={index}
                                id={"panw" + index}
                                board={board}
                                pawn={pawn}
                                color={`bg-${pawn.color}-600`}
                                move={move}
                            />
                        )
                    );
                })}
                {/* --- SVG pour les lignes --- */}
                <svg className="absolute inset-0 w-full h-full">
                    {/* Ligne horizontale X */}
                    <line
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                        stroke="black"
                        strokeWidth="5"
                    />
                    <line
                        x1="0%"
                        y1="50%"
                        x2="100%"
                        y2="50%"
                        stroke="black"
                        strokeWidth="5"
                    />
                    <line
                        x1="0%"
                        y1="100%"
                        x2="100%"
                        y2="100%"
                        stroke="black"
                        strokeWidth="5"
                    />
                    {/* Ligne verticale Y */}
                    <line
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        stroke="black"
                        strokeWidth="10"
                    />
                    <line
                        x1="50%"
                        y1="0%"
                        x2="50%"
                        y2="100%"
                        stroke="black"
                        strokeWidth="5"
                    />
                    <line
                        x1="100%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                        stroke="black"
                        strokeWidth="10"
                    />
                    {/* Ligne diagonale Z */}
                    {/* <line x1="0%" y1="0%" x2="100%" y2="100%" stroke="black" strokeWidth="5" /> */}
                    <line
                        x1="0%"
                        y1="0%"
                        x2="50%"
                        y2="50%"
                        stroke="black"
                        strokeWidth="5"
                    />{" "}
                    {/* oblique haut gauche */}
                    <line
                        x1="100%"
                        y1="0%"
                        x2="50%"
                        y2="50%"
                        stroke="black"
                        strokeWidth="5"
                    />{" "}
                    {/* oblique haut droite */}
                    <line
                        x1="0%"
                        y1="100%"
                        x2="50%"
                        y2="50%"
                        stroke="black"
                        strokeWidth="5"
                    />{" "}
                    {/* oblique bas gauche */}
                    <line
                        x1="100%"
                        y1="100%"
                        x2="50%"
                        y2="50%"
                        stroke="black"
                        strokeWidth="5"
                    />{" "}
                    {/* oblique bas droite */}
                </svg>

                {/* --- Points --- */}

                {/* Ligne X */}
                <GamePoint
                    id="x1"
                    top="0"
                    left="0"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="x2"
                    top="0"
                    left="50%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="x3"
                    top="0"
                    left="100%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />

                {/* Ligne Y */}
                <GamePoint
                    id="y1"
                    top="50%"
                    left="0"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="y2"
                    top="50%"
                    left="50%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="y3"
                    top="50%"
                    left="100%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />

                {/* Ligne Z */}
                <GamePoint
                    id="z1"
                    top="100%"
                    left="0"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="z2"
                    top="100%"
                    left="50%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
                <GamePoint
                    id="z3"
                    top="100%"
                    left="100%"
                    icon={<Circle className="w-8 h-8 text-blue-500" />}
                    color="bg-gray-100"
                />
            </div>
        </>
    );
}
