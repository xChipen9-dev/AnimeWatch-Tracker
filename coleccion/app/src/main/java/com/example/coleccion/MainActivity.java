package com.example.coleccion;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnPokemon = findViewById(R.id.btnPokemon);
        Button btnDigimon = findViewById(R.id.btnDigimon);

        btnPokemon.setOnClickListener(v ->
                startActivity(new Intent(this, PokemonActivity.class))
        );

        btnDigimon.setOnClickListener(v ->
                startActivity(new Intent(this, DigimonActivity.class))
        );
    }
}
