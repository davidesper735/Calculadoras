package PromedioSemestre;

public class DetalleMateria {

    public int creditos;
    public double nota;

    public DetalleMateria(double nota, int creditos) {

        this.creditos = creditos;
        this.nota = nota;

    }
    
    public void setCreditos(int creditos) {
        this.creditos = creditos;
    }

    public int getCreditos() {
        return creditos;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }

    public double getNota() {
        return nota;
    }

}
