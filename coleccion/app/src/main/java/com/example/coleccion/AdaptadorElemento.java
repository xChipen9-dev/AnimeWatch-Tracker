package com.example.coleccion;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import java.util.List;

public class AdaptadorElemento extends RecyclerView.Adapter<AdaptadorElemento.VH> {
    private final List<Elemento> lista;
    private final Context context;

    public AdaptadorElemento(Context context, List<Elemento> lista) {
        this.context = context;
        this.lista = lista;
    }

    @NonNull
    @Override
    public VH onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(context).inflate(R.layout.item_elemento, parent, false);
        return new VH(v);
    }

    @Override
    public void onBindViewHolder(@NonNull VH holder, int position) {
        Elemento e = lista.get(position);
        holder.txtNombre.setText(e.getNombre());
        holder.imgElemento.setImageResource(e.getImagenRes());

        holder.itemView.setOnClickListener(v ->
                Toast.makeText(context, e.getNombre(), Toast.LENGTH_SHORT).show()
        );
    }

    @Override
    public int getItemCount() {
        return lista.size();
    }

    static class VH extends RecyclerView.ViewHolder {
        ImageView imgElemento;
        TextView txtNombre;

        VH(@NonNull View itemView) {
            super(itemView);
            imgElemento = itemView.findViewById(R.id.imgElemento);
            txtNombre = itemView.findViewById(R.id.txtNombre);
        }
    }
}
