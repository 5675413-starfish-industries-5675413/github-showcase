module Hello =
  let lns = [ key /message/ . del /=/ "=" . store /[^\n]+/ . del /\n/ "\n" ]
