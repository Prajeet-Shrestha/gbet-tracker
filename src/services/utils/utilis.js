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
var getMonth = function (idx) {
  var objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(idx - 1);

  var locale = 'en-us',
    month = objDate.toLocaleString(locale, { month: 'short' });

  return month;
};
export function processTransferToStates(txList, prevList = null) {
  let transferData = {
    minted: 0.0,
    burnt: 0.0,
    noOfMintedTransaction: 0,
    noOfBurntTransaction: 0,
    noOfTransferTransaction: 0,
    transfer: 0.0,
    nameChanged: 0.0,
    statChanged: 0.0,
    dailyStats: {},
    perMonthStats: {},
  };
  if (prevList) {
    transferData = {
      minted: prevList.minted,
      burnt: prevList.burnt,
      noOfMintedTransaction: prevList.noOfMintedTransaction,
      noOfBurntTransaction: prevList.noOfBurntTransaction,
      noOfTransferTransaction: prevList.noOfTransferTransaction,
      transfer: prevList.transfer,
      nameChanged: prevList.nameChanged,
      statChanged: prevList.statChanged,
      dailyStats: prevList.dailyStats,
      perMonthStats: prevList.perMonthStats,
    };
  }

  try {
    txList.map((data, index) => {
      const dateString = `${new Date(data.age).getUTCFullYear()}_${new Date(data.age).getUTCMonth() + 1}_${new Date(
        data.age
      ).getUTCDate()}`;
      const monthDate = `${getMonth(new Date(data.age).getUTCMonth() + 1)}`;
      const day = `${new Date(data.age).getUTCDate()}`;
      switch (checkTransferState(data.fromAddr, data.toAddr)) {
        case 'BURNT':
          transferData.burnt += parseFloat(data.quantity);
          if (data.quantity == '360' || data.quantity == '432') {
            transferData.nameChanged += parseFloat(data.quantity);
          } else {
            transferData.statChanged += parseFloat(data.quantity);
          }
          transferData.noOfBurntTransaction += 1;
          if (Object.keys(transferData.dailyStats).includes(dateString)) {
            transferData.dailyStats[dateString]['burnt'] += parseFloat(data.quantity);
          } else {
            transferData.dailyStats[dateString] = {
              burnt: parseFloat(data.quantity),
              minted: 0,
              date: data.age,
            };
          }
          //month

          if (Object.keys(transferData.perMonthStats).includes(monthDate)) {
            if (Object.keys(transferData.perMonthStats[monthDate]).includes(day)) {
              transferData.perMonthStats[monthDate][day]['burnt'] += parseFloat(data.quantity);
            } else {
              transferData.perMonthStats[monthDate][day] = {
                burnt: parseFloat(data.quantity),
                minted: 0,
                date: data.age,
              };
            }
          } else {
            transferData.perMonthStats[monthDate] = {};
            transferData.perMonthStats[monthDate][day] = {
              burnt: parseFloat(data.quantity),
              minted: 0,
              date: data.age,
            };
          }
          break;
        case 'MINTED':
          transferData.minted += parseFloat(data.quantity);
          transferData.noOfMintedTransaction += 1;
          if (Object.keys(transferData.dailyStats).includes(dateString)) {
            transferData.dailyStats[dateString]['minted'] += parseFloat(data.quantity);
          } else {
            transferData.dailyStats[dateString] = {
              burnt: 0,
              minted: parseFloat(data.quantity),
              date: data.age,
            };
          }
          if (Object.keys(transferData.perMonthStats).includes(monthDate)) {
            if (Object.keys(transferData.perMonthStats[monthDate]).includes(day)) {
              transferData.perMonthStats[monthDate][day]['minted'] += parseFloat(data.quantity);
            } else {
              transferData.perMonthStats[monthDate][day] = {
                burnt: 0,
                minted: parseFloat(data.quantity),
                date: data.age,
              };
            }
          } else {
            transferData.perMonthStats[monthDate] = {};
            transferData.perMonthStats[monthDate][day] = {
              burnt: 0,
              minted: parseFloat(data.quantity),
              date: data.age,
            };
          }
          break;
        case 'TRANSFER':
          transferData.transfer += parseFloat(data.quantity);
          transferData.noOfTransferTransaction += 1;
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
