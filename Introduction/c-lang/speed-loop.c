// There's no code in the body of the for loop, but your processor is busy incrementing i, comparing it to cycles, and repeating the process. It's late 2017 as I write this, typing on a MacBook Pro with a 2.8 GHz Intel Core i7 processor. Node v9.3.0 is current, and takes less than a second to loop a billion times. How fast is pure C? Let's see.
#include <stdio.h>
#include <time.h>
int main() {
int cycles = 1000000000;
clock_t start, end;
double duration;
start = clock();
for (int i = 0; i < cycles; i++) {
/* Empty loop */
}
end = clock();
duration = ((double)(end - start)) / CLOCKS_PER_SEC;
printf("C looped %d times in %lf seconds\n", cycles,duration);
return 0;
}
