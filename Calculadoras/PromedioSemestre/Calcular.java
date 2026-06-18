package PromedioSemestre;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Calcular {
    public static void main(String[] args) {
       
        Map<String, DetalleMateria> materias = new HashMap<>();
        PedirDatos(materias);
        double promedio = calcularPromedio(materias);
        String rendimiento = obtenerRendimiento(promedio);
        System.out.println("El promedio del semestre es: " + promedio);
        System.out.println("Rendimiento: " + rendimiento);

    }

    public static double calcularPromedio(Map<String, DetalleMateria> materias) {

        double sumaNotas = 0.0;
        int sumaCreditos = 0;

        for (DetalleMateria detalle : materias.values()) {

            sumaNotas += detalle.getNota() * detalle.getCreditos();
            sumaCreditos += detalle.getCreditos();
        }

        if (sumaCreditos == 0) {
            return 0.0; 
        }

        return sumaNotas / sumaCreditos;
    }

    public static void PedirDatos(Map<String, DetalleMateria> materias) {
        
        Scanner entrada = new Scanner(System.in);

        System.out.print("Cuantas materias cursó este semestre?: ");
        int cantidadMaterias = entrada.nextInt();
        entrada.nextLine(); 

        for (int i = 0; i < cantidadMaterias; i++) {

            String nombre = "Materia " + (i + 1);

            System.out.print("Nota: ");
            double nota = entrada.nextDouble();

            System.out.print("Creditos: ");
            int creditos = entrada.nextInt();

            entrada.nextLine(); 

            DetalleMateria materiaDetalle = new DetalleMateria(nota, creditos);

            materias.put(nombre, materiaDetalle);

        }

        entrada.close();
    }
    
    public static String obtenerRendimiento(double promedio) {

        if (promedio >= 4.5) {

            return "Excelente";

        } else if (promedio >= 3.7) {

            return "Bueno";

        } else if (promedio >= 3.0) {

            return "Regular";

        } else if (promedio <= 2.9) {

            return "Insuficiente";
        }

        return "Desconocido";
    }
}
