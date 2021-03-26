/* testio.c - testio */

#include <xinu.h>

/*------------------------------------------------------------------------
 * testio - a I/O-bound program to test Complete Fair Scheduling for lab 3 part 5.1
 *------------------------------------------------------------------------
 */
void testio(void){
	int x, y, i;
	x = 0;
	y = clktimemilli;
	while(clktimemilli - y < 8000){ // until wall clock time of 8 sec is reached do
		x++;
		for(i=0; i<10000; i++) ; // consume some CPU cycles before blocking
		sleepms(50);
	}
	kprintf("io: %d %d %d %d\n", currpid, x, proctab[currpid].prgrosscpu, procgrosscpumicro(currpid));
}
