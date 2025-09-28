<?php

// app/Models/GameUser.php
namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class GameUser extends Pivot
{
    // Indique que la table n'a pas de clé primaire auto-incrémentée (si vous n'utilisez pas le `id` par défaut)
    // public $incrementing = true; // Dans notre cas, nous avons un 'id', donc c'est bon.

    protected $table = 'game_user';

    // Relation pour obtenir l'objet User complet à partir de l'enregistrement pivot
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relation pour obtenir l'objet Game complet
    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
}