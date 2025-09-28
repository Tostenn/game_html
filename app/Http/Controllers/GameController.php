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
            'plauyers' => $game->players()->get()
        ]);
    }

    public function store(Request $request)
    {
        $game = Game::create([
            'board_state' => json_encode([])
        ]);

        $game->players()->attach($request->user()->id, [
            'color' => 'blue',
            'player_order' => 1
        ]);

        return redirect()->route('game.index', $game);
    }

    public function join(Request $request)
    {
        $data = $request->validate([
            'game_id' => 'required|exists:games,id'
        ]);

        $game = Game::find($data['game_id']);
        if ($game->status === "waiting") {
            // $game->status = "in_progress";
            // $game->save();

            $game->players()->attach($request->user()->id, [
                'color' => 'red',
                'player_order' => 2
            ]);

            return redirect()->route('game.index', $game);
        }

        return back()->with('error', 'La partie est en cours ou terminer');
    }
}
