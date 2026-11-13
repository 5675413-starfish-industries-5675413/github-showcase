module Hello {
  uses interface Boot;
}
implementation {
  event void Boot.booted() {
    // The greeting is a native startup event; a board-specific sink is required.
  }
}
