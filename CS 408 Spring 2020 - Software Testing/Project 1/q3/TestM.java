import org.junit.*;
import static org.junit.Assert.*;

import java.io.PrintStream;
import java.io.OutputStream;
import java.io.ByteArrayOutputStream;

public class TestM {

    /* add your test code here */
	private M m;
	private ByteArrayOutputStream outStream = new ByteArrayOutputStream();
	
	
	@Before
	public void setup(){
		m = new M();
		System.setOut(new PrintStream(outStream));
	}
	
	@After
	public void stop(){
		m = null;
		System.setOut(null);
	}
	
	//Node Coverage But Not Edge Coverage Tests
	@Test
	public void testNC1(){	//covers TR: [1,2,3,4,8,10,11]
		m.m("", 0);
		assertEquals("zero\n", outStream.toString());
	}
	
	@Test
	public void testNC2(){	//covers TR: [1,3,5,8,9,11]
		m.m("a", 0);
		assertEquals("a\n", outStream.toString());
	}
	
	@Test
	public void testNC3(){	//covers TR: [1,3,6,7,8,10,11]
		m.m("aa", 0);
		assertEquals("b\n", outStream.toString());
	}
	
	//Edge Coverage But Not Edge-Pair Coverage Tests
	@Test
	public void TestEC1(){	//covers TR: [1,2], [2,3], [3,4], [4,8], [8,10], [10,11]
		m.m("",0);
		assertEquals("zero\n", outStream.toString());
	}
	
	@Test
	public void TestEC2(){	//covers TR: [1,3], [3,5], [5,8], [8,9], [9,11]
		m.m("a",1);
		assertEquals("a\n", outStream.toString());
	}
	
	@Test
	public void TestEC3(){	//covers TR: [1,3], [3,6], [6,7], [7,8], [8,9], [9,11]
		m.m("aa",1);
		assertEquals("b\n", outStream.toString());
	}
	
	@Test
	public void TestEC4(){	//covers TR: [1,3], [3,7], [7,8], [8,9], [9,11]
		m.m("aaaa",1);
		assertEquals("b\n", outStream.toString());
	}
	
	//Edge-Pair Coverage But Not Prime Path Coverage Tests
	/*
	 * It is not possible to test edge-pair coverage but not prime path coverage.
	 * This is because when testing prime path coverage we cover all edge pairs as well.
	 * So edge-pair coverage does not need to be tested.
	 * 
	 */
	
	//Prime Path Coverage
	@Test
	public void testPPC1(){	//covers TR: [1,2,3,4,8,10,11]
		m.m("",0);
		assertEquals("zero\n", outStream.toString());
	}
	
	@Test
	public void testPPC2(){	//covers TR: [1,3,4,8,10,11]
		m.m("",1);
		assertEquals("zero\n", outStream.toString());
	}

	@Test
	public void testPPC3(){	//covers TR: [1,2,3,5,8,9,11]
		m.m("a",0);
		assertEquals("a\n", outStream.toString());
	}

	@Test
	public void testPPC4(){	//covers TR: [1,3,5,8,9,11]
		m.m("a",1);
		assertEquals("a\n", outStream.toString());
	}

	@Test
	public void testPPC5(){	//covers TR: [1,2,3,6,7,8,9,11]
		m.m("aa",0);
		assertEquals("b\n", outStream.toString());
	}

	@Test
	public void testPPC6(){	//covers TR: [1,3,6,7,8,9,11]
		m.m("aa",1);
		assertEquals("b\n", outStream.toString());
	}

	@Test
	public void testPPC7(){	//covers TR: [1,2,3,7,8,9,11]
		m.m("aaaa",0);
		assertEquals("b\n", outStream.toString());
	}

	@Test
	public void testPPC8(){	//covers TR: [1,3,7,8,9,11]
		m.m("aaaa",1);
		assertEquals("b\n", outStream.toString());
	}
}

class M {
	public static void main(String [] argv){
		M obj = new M();
		if (argv.length > 0)
			obj.m(argv[0], argv.length);
	}
	
	public void m(String arg, int i) {
		int q = 1;
		A o = null;
		Impossible nothing = new Impossible();
		if (i == 0)
			q = 4;
		q++;
		switch (arg.length()) {
			case 0: q /= 2; break;
			case 1: o = new A(); new B(); q = 25; break;
			case 2: o = new A(); q = q * 100;
			default: o = new B(); break; 
		}
		if (arg.length() > 0) {
			o.m();
		} else {
			System.out.println("zero");
		}
		nothing.happened();
	}
}

class A {
	public void m() { 
		System.out.println("a");
	}
}

class B extends A {
	public void m() { 
		System.out.println("b");
	}
}

class Impossible{
	public void happened() {
		// "2b||!2b?", whatever the answer nothing happens here
	}
}
