function checkTransferState(fromAddr) {
  if (fromAddr == 'hx0000000000000000000000000000000000000000') {
    return 'MINTED';
  } else {
    return 'BURNT';
  }
}

export function processTransferToStates(txList) {
  let transferData = {
    minted: 0,
    burnt: 0,
    nameChanged: 0,
    statChanged: 0,
  };
  try {
    txList.map((data, index) => {
      switch (checkTransferState(data.fromAddr)) {
        case 'BURNT':
          transferData.burnt += parseInt(data.quantity);
          if (data.quantity == '360') {
            transferData.nameChanged += parseInt(data.quantity);
          }
          break;
        case 'MINTED':
          transferData.minted += parseInt(data.quantity);
          break;
      }
    });
  } catch (e) {}
  return transferData;
}
