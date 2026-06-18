package NotaParaPasar;
import java.util.Scanner;

class NotaParaPasar{

    public static void main(String[] args) {
        
        Scanner entrada = new Scanner(System.in);
        System.out.print("Ingresa la nota del primer corte: ");
        double nota1 = entrada.nextDouble();

        System.out.print("Ingresa la nota del segundo corte: ");
        double nota2 = entrada.nextDouble();

        System.out.print("Cuanto quieres obtener en el semestre?: ");
        double notaDeseada = entrada.nextDouble();

        entrada.close();

        double notaParaPasar = Calcular(nota1, nota2, notaDeseada);

        if(notaParaPasar > 5.0 || notaParaPasar == 0.0){

            System.out.println("No es posible pasar el semestre con esa nota porque necesitas un: " + notaParaPasar + " para obtener " + notaDeseada);

        } else {

            System.out.println("Necesitas un: " + notaParaPasar + " para pasar el semestre en 3.0");

        }

    }

    public static double Calcular(double nota1, double nota2, double notaDeseada){

        if(nota1 <= 5.0 && nota1 >= 0.0 && nota2 <= 5.0 && nota2 >= 0.0 && notaDeseada <= 5.0 && notaDeseada >= 0.0){

            double nota3 = - ((((nota1 * 0.3) + (nota2 * 0.3)) - notaDeseada) / 0.4);

            return nota3;

        }

        return 0.0;

    }

}