<?php

// app/Models/Game.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Game extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'status',
        'board_state',
        'current_player_id',
        'winner_id',
    ];

    /**
     * Les attributs qui doivent être castés.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'board_state' => 'array', // Laravel convertira automatiquement le JSON en tableau PHP et vice-versa
    ];

    /**
     * Obtenir les joueurs (utilisateurs) participant à cette partie.
     */
    public function players(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'game_user')
                    ->withPivot('id', 'color', 'player_order') // 'id' est l'id de la table game_user
                    ->withTimestamps();
    }

    /**
     * Obtenir l'utilisateur qui a gagné la partie.
     */
    public function winner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    /**
     * Obtenir l'enregistrement du joueur actuel depuis la table pivot.
     */
    public function currentPlayer(): BelongsTo
    {
        // La clé étrangère 'current_player_id' dans 'games' pointe vers la clé primaire 'id' de 'game_user'
        // Nous avons besoin d'un modèle pour la table pivot pour que cette relation fonctionne proprement.
        // Créons un modèle Pivot GameUser.
        return $this->belongsTo(GameUser::class, 'current_player_id');
    }
}