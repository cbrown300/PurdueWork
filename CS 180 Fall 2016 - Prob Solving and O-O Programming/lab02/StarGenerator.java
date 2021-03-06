import java.util.Scanner;
import java.util.Random;
/**
 * cs180 - Lab 02
 *
 * It creates a new email and information based on yo ist and last name and major
 *
 * Connor Brown, brow1325@purdue.edu, B09
 *
 * 1.0 8/30/16
 *
 */

public class StarGenerator {
    public static void main(String[] args) {

	Scanner scan = new Scanner(System.in);//creates scanner
	Random r = new Random();//Starts random variable
	int group = r.nextInt(5);//generates random number between 0 and 4

	System.out.println("Please enter your name:");//asks for name
	String name = scan.nextLine();//retrieves name
	char firstChar = name.charAt(0);//gets first letter
	int startIndex = name.indexOf(" ") + 1;//gets beginning of last name
	int stopIndex = name.length();//gets end last name
	String email = firstChar + name.substring(startIndex, stopIndex) + "@purdue.edu";//creates email
	email = email.toLowerCase();//converts email to all lower case
	System.out.println("Enter the college that you are in:");//asks for college
	String college = scan.nextLine();//retreives college
	String star = college.substring(0, 3) + group;//generates star group
	star = star.toUpperCase();//converts to uppercase
	System.out.println("Your Name: " + name + "\nYour Email: " + email + "\nYour College: " + college + "\nSTAR Group: " + star);//generates final output
    }
}
