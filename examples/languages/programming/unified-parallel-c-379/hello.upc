#include <upc.h>
#include <stdio.h>
int main(void) {
  if (MYTHREAD == 0) puts("Hello, world!");
  return 0;
}
