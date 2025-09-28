<?php

// database/migrations/xxxx_xx_xx_xxxxxx_add_current_player_id_to_games_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            // Clé étrangère pointant vers l'entrée de la table pivot
            $table->foreignId('current_player_id')->nullable()->after('board_state')->constrained('game_user')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            // Important de nommer la contrainte pour pouvoir la supprimer
            $table->dropForeign(['current_player_id']);
            $table->dropColumn('current_player_id');
        });
    }
};