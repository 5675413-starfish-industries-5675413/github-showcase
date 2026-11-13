pragma circom 2.0.0;
template Identity() {
    signal input message;
    signal output result;
    result <== message;
}
component main = Identity();
