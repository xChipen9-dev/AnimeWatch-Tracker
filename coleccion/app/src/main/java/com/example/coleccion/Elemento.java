package com.example.coleccion;

public class Elemento {
    private String nombre;
    private int imagenRes;

    public Elemento(String nombre, int imagenRes) {
        this.nombre = nombre;
        this.imagenRes = imagenRes;
    }

    public String getNombre() {
        return nombre;
    }

    public int getImagenRes() {
        return imagenRes;
    }
}
