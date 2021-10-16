function checkTransferState(fromAddr, toAddr) {
  if (fromAddr == 'hx0000000000000000000000000000000000000000') {
    return 'MINTED';
  } else {
    if (toAddr == 'hx0000000000000000000000000000000000000000') {
      return 'BURNT';
    } else {
      return 'TRANSFER';
    }
  }
}

export function processTransferToStates(txList, prevList = null) {
  let transferData = {
    minted: 0.0,
    burnt: 0.0,
    transfer: 0.0,
    nameChanged: 0.0,
    statChanged: 0,
  };
  if (prevList) {
    transferData = {
      minted: prevList.minted,
      burnt: prevList.burnt,
      transfer: prevList.transfer,
      nameChanged: prevList.nameChanged,
      statChanged: prevList.statChanged,
    };
  }

  try {
    txList.map((data, index) => {
      switch (checkTransferState(data.fromAddr, data.toAddr)) {
        case 'BURNT':
          transferData.burnt += parseFloat(data.quantity);
          if (data.quantity == '360' || data.quantity == '432') {
            transferData.nameChanged += parseFloat(data.quantity);
          }
          break;
        case 'MINTED':
          transferData.minted += parseFloat(data.quantity);
          break;
        case 'TRANSFER':
          transferData.transfer += parseFloat(data.quantity);
          break;
      }
    });
  } catch (e) {
    console.log(e);
  }
  return transferData;
}

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (prefomattedDate) {
    return `${prefomattedDate} at ${hours}:${minutes}`;
  }

  if (hideYear) {
    return `${day}. ${month} at ${hours}:${minutes}`;
  }

  return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

export function timeAgo(dateParam) {
  // console.log(dateParam);
  if (!dateParam) {
    return null;
  }
  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
  const today = new Date();
  const yesterday = new Date(today - DAY_IN_MS);
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const isToday = today.toDateString() === date.toDateString();
  const isYesterday = yesterday.toDateString() === date.toDateString();
  const isThisYear = today.getFullYear() === date.getFullYear();

  if (seconds < 5) {
    return 'Few seconds ago';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (seconds < 90) {
    return 'about a minute ago';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (isToday) {
    return getFormattedDate(date, 'Today');
  } else if (isYesterday) {
    return getFormattedDate(date, 'Yesterday');
  } else if (isThisYear) {
    return getFormattedDate(date, false, true);
  }

  return getFormattedDate(date);
}
