function checkTransferState(fromAddr) {
  if (fromAddr == 'hx0000000000000000000000000000000000000000') {
    console.log(`${fromAddr}:MINTED`);
    return 'MINTED';
  } else {
    console.log(`${fromAddr}:BURNT`);

    return 'BURNT';
  }
}

export function processTransferToStates(txList, prevList = null) {
  let transferData = {
    minted: 0.0,
    burnt: 0.0,
    nameChanged: 0.0,
    statChanged: 0,
  };
  if (prevList) {
    transferData = {
      minted: prevList.minted,
      burnt: prevList.burnt,
      nameChanged: prevList.nameChanged,
      statChanged: prevList.statChanged,
    };
  }

  try {
    txList.map((data, index) => {
      switch (checkTransferState(data.fromAddr)) {
        case 'BURNT':
          console.log(data.quantity);
          transferData.burnt += parseFloat(data.quantity);
          // transferData.burnt += parseFloat(data.fee); //? cost fee for service?
          if (data.quantity == '360') {
            transferData.nameChanged += parseFloat(data.quantity);
            // transferData.nameChanged += parseFloat(data.fee);
          }
          break;
        case 'MINTED':
          let afterTax = parseFloat(data.quantity);
          //  - parseFloat(data.fee);
          transferData.minted += afterTax;
          // transferData.burnt += parseFloat(data.fee); //? cost fee for minting?
          break;
      }
    });
  } catch (e) {
    console.log(e);
  }
  return transferData;
}
