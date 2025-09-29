<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function index(Game $game)
    {
        return Inertia::render('Game', [
            'game' => $game,
            'players' => $game->players()->get()
        ]);
    }

    public function store(Request $request)
    {
        $game = Game::create([
            'board_state' => [
                'game' => [
                    [
                        'nodeId' => "0",
                        'color' => "blue"
                    ],
                    [
                        'nodeId' => "0",
                        'color' => "blue"
                    ],
                    [
                        'nodeId' => "0",
                        'color' => "blue"
                    ],
                ]
            ],
            'current_player_id' => $request->user()->id,
        ]);

        $game->players()->attach($request->user()->id, [
            'color' => 'blue',
            'player_order' => 1,
        ]);

        return redirect()->route('game.index', $game);
    }

    public function join(Request $request)
    {
        $data = $request->validate([
            'game_id' => 'required|exists:games,id',
        ]);

        $game = Game::find($data['game_id']);

        // dd($game->board_state);

        if ($game->status === "waiting") {
            $game->status = "in_progress";

            // Récupérer l'état actuel du plateau (déjà casté en array si $casts existe)
            $board = $game->board_state ?? [];

            // Ajouter les pions rouges
            $board['game'][] = ['nodeId' => "0", 'color' => "red"];
            $board['game'][] = ['nodeId' => "0", 'color' => "red"];
            $board['game'][] = ['nodeId' => "0", 'color' => "red"];

            // Sauvegarder
            $game->board_state = $board;
            $game->save();

            $game->players()->attach($request->user()->id, [
                'color' => 'red',
                'player_order' => 2,
            ]);

            return redirect()->route('game.index', $game);
        }

        return back()->with('error', 'La partie est en cours ou terminée');
    }

}
