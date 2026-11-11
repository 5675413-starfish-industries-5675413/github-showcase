%{
#include <stdio.h>
int yylex(void);
void yyerror(const char *s);
%}
%token HELLO
%%
greeting: HELLO { puts("Hello, world!"); };
%%
int main(void) { return yyparse(); }
