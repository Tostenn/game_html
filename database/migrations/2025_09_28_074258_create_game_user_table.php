<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_game_user_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('color');
            $table->tinyInteger('player_order')->unsigned(); // L'ordre de jeu (1, 2, 3...)
            $table->timestamps();

            // S'assurer qu'un utilisateur ne peut pas rejoindre la même partie deux fois
            $table->unique(['game_id', 'user_id']);
            // S'assurer qu'il n'y a pas deux joueurs avec la même couleur dans une partie
            $table->unique(['game_id', 'color']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_user');
    }
};