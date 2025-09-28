<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['waiting', 'in_progress', 'finished'])->default('waiting');
            $table->json('board_state'); // Stocke l'état du plateau
            
            // Note : current_player_id et winner_id seront ajoutés dans une migration séparée
            // pour éviter les problèmes de dépendances circulaires avec la table game_user.
            
            $table->foreignId('winner_id')->nullable()->constrained('users')->onDelete('set null');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};