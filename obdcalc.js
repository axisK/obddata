var bigdecimal = require("bigdecimal");
var TWO = new bigdecimal.BigInteger("2");
var pidDescriptions = require("./obd_data.js");

var modesAndPids = [
  [1, ["BE3FA813", "801FF011", "FAD00000"]],
  [2, ["7E3F8003", "001E2001", "7AD00000"]],
  [6, ["C0000001", "800080D9", "00000001", "00000001", "80000001", "78000000"]],
  [9, ["55000000"]]
];

for (var mpCounter = 0; mpCounter < modesAndPids.length; mpCounter++) {
  mode = modesAndPids[mpCounter][0];
  modeDescriptions = pidDescriptions[mode-1];
  if (modesAndPids[mpCounter][1].length != 0) {
    console.log("Mode " + mode + " Enabled features");
    console.log("=======================");
    for (var pCounter = 0; pCounter < modesAndPids[mpCounter][1].length; pCounter++) {
      pid = new bigdecimal.BigInteger(modesAndPids[mpCounter][1][pCounter], 16);

      for (var pdCounter = 0; pdCounter < pidDescriptions[mode-1].length; pdCounter++) {
        if ((pCounter * 32) < (pidDescriptions[mode-1][pdCounter].pid) && ((pCounter + 1) * 32) >= (pidDescriptions[mode-1][pdCounter].pid)) {
        bitMask = TWO.pow(32 - (pidDescriptions[mode-1][pdCounter].pid % 32));
        if (bitMask.and(pid).compareTo(bitMask) == 0) {
          console.log(pidDescriptions[mode-1][pdCounter].text);
        }
        }
      }
    }
    console.log();
  }
}
