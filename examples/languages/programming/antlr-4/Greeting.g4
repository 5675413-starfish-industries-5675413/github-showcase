grammar Greeting;
greeting : 'Hello' ',' 'world' '!' EOF;
WS : [ \t\r\n]+ -> skip;
