package com.example.coleccion;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import com.google.android.material.navigation.NavigationView;

public class PokemonActivity extends AppCompatActivity {

    private DrawerLayout drawerLayout;
    private NavigationView navView;
    private ImageView ivPokemon;
    private TextView tvPokemon;
    private ActionBarDrawerToggle toggle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pokemon);

        drawerLayout = findViewById(R.id.drawer_layout);
        navView = findViewById(R.id.nav_view);
        ivPokemon = findViewById(R.id.ivPokemon);
        tvPokemon = findViewById(R.id.tvPokemon);

        toggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.open, R.string.close);
        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }

        navView.setNavigationItemSelectedListener(item -> {
            cambiarPokemon(item);
            drawerLayout.closeDrawers();
            return true;
        });
    }

    private void cambiarPokemon(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.nav_agua) {
            ivPokemon.setImageResource(R.drawable.squirtle);
            tvPokemon.setText("Squirtle");
        } else if (id == R.id.nav_fuego) {
            ivPokemon.setImageResource(R.drawable.charmander);
            tvPokemon.setText("Charmander");
        } else if (id == R.id.nav_tierra) {
            ivPokemon.setImageResource(R.drawable.bulbasur);
            tvPokemon.setText("Bulbasaur");
        } else if (id == R.id.nav_electrico) {
            ivPokemon.setImageResource(R.drawable.pikachu);
            tvPokemon.setText("Pikachu");
        }
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (toggle.onOptionsItemSelected(item)) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
