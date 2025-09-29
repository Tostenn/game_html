<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function move(Request $request, Game $game)
    {
        $players = $game->players()->where("game_user.user_id", "!=", $request->user()->id)->get()->first();
        $game->update([
            'board_state' => ['game' => $request->board_state],
            'current_player_id' => $players->id,
            'winner_id' => $request?->winner_id
        ]);

        if ($request->winner_id) {
            $game->update([
                'status' => 'finished'
            ]);
        }

        return $game;
    }

    public function show(Game $game)
    {
        return $game;
    }

    public function win(Request $request, Game $game)
    {
        $game->update([
        ]);
        return $game;
    }
}
