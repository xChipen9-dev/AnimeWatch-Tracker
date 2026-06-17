package com.example.coleccion;

import android.os.Bundle;
import android.view.animation.AlphaAnimation;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class DigimonActivity extends AppCompatActivity {

    private ImageView imgDigimon;
    private TextView txtNombre;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_digimon);

        imgDigimon = findViewById(R.id.imgDigimon);
        txtNombre = findViewById(R.id.txtNombreDigimon);
        BottomNavigationView bottomNav = findViewById(R.id.bottomNavDigimon);

        mostrarDigimon(R.drawable.agumon, "Agumon");

        bottomNav.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_rookie) {
                mostrarDigimon(R.drawable.agumon, "Agumon");
                return true;
            } else if (id == R.id.nav_champion) {
                mostrarDigimon(R.drawable.gatomon, "Greymon");
                return true;
            } else if (id == R.id.nav_mega) {
                mostrarDigimon(R.drawable.gabumon, "Wargreymon");
                return true;
            }
            return false;
        });
    }

    private void mostrarDigimon(int imagenRes, String nombre) {
        imgDigimon.setImageResource(imagenRes);
        txtNombre.setText(nombre);

        AlphaAnimation fade = new AlphaAnimation(0.0f, 1.0f);
        fade.setDuration(500);
        imgDigimon.startAnimation(fade);
        txtNombre.startAnimation(fade);
    }
}
