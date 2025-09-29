<?php

// database/seeders/GameSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Game;
use Illuminate\Support\Arr;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // On s'assure que la table game_user est vide avant de commencer
        // \DB::table('game_user')->delete();
        // \DB::table('games')->delete();
        // \DB::table('users')->delete();

        // 1. Créer une collection d'utilisateurs
        $users = User::factory(10)->create();

        // Couleurs disponibles pour les joueurs
        $colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

        // 2. Créer quelques parties
        for ($i = 0; $i < 3; $i++) {

            // Choisir aléatoirement entre 2 et 4 joueurs pour cette partie
            $players = $users->random(rand(2, 4));
            $playerOrder = 1;

            // Créer la partie
            $game = Game::create([
                'status' => 'in_progress',
                'board_state' => $this->getInitialBoardState(), // On utilisera un plateau initial simple
                'winner_id' => null,
            ]);

            // 3. Attacher les joueurs à la partie avec les données pivots
            foreach ($players as $player) {
                $game->players()->attach($player->id, [
                    'color' => $colors[$playerOrder - 1],
                    'player_order' => $playerOrder++,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // 4. Définir le joueur actuel (celui avec player_order = 1)
            $firstPlayerPivot = $game->players()->where('player_order', 1)->first()->pivot;
            $game->current_player_id = $firstPlayerPivot->id;
            $game->save();
        }
    }

    /**
     * Retourne un état de plateau initial simple pour le seeder.
     * Vous devrez adapter cette logique à votre jeu.
     */
    private function getInitialBoardState(): array
    {
        // Ceci est un exemple TRES simplifié.
        // Vous devriez générer ici la position de départ réelle des pions.
        return [
            [
                "x" => [],
                'y' => [],
                'z' => []
            ]
        ];
    }
}