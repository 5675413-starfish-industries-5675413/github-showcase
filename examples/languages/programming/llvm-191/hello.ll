; A constant greeting in LLVM intermediate representation.
@message = private constant [14 x i8] c"Hello, world!\00"
declare i32 @puts(ptr)
define i32 @main() {
entry:
  %result = call i32 @puts(ptr @message)
  ret i32 0
}
