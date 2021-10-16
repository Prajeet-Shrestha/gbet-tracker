import axios from 'axios';
import * as actionTypes from '../../redux/action.type';
import { globalProps } from '../const/properties';
import { processTransferToStates } from '../utils/utilis';
// NOTE: action functions for summary of GBET --------- START --------------
export const fetchGBETSummaryStart = () => {
  return {
    type: actionTypes.FETCH_GBET_SUMMARY_PENDING,
  };
};

export const fetchGBETSummarySuccess = (response) => {
  return {
    type: actionTypes.FETCH_GBET_SUMMARY_FULFILLED,
    data: response,
  };
};

export const fetchGBETSummaryFail = (error) => {
  return {
    type: actionTypes.FETCH_GBET_SUMMARY_REJECTED,
    error: error,
  };
};

export const fetchGBETSummary = () => {
  let url = globalProps.trackerBaseUrl + `/summary?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267`;
  return (dispatch) => {
    dispatch(fetchGBETSummaryStart());
    console.log('FETCHING  Summary!!');
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchGBETSummarySuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchGBETSummaryFail(error));
      });
  };
};
// NOTE: action functions for summary of GBET --------- END --------------
// NOTE: action functions for Transfer of GBET --------- START --------------
export const fetchGBETTransferStart = () => {
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_PENDING,
  };
};

export const fetchGBETTransferSuccess = (response) => {
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_FULFILLED,
    data: response,
  };
};

export const fetchGBETTransferFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_REJECTED,
    error: error,
  };
};

export const fetchGBETTransfer = (page, count) => {
  let url =
    globalProps.trackerBaseUrl +
    `/txList?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267&page=${page}&count=${count}`;
  return (dispatch) => {
    dispatch(fetchGBETTransferStart());
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchGBETTransferSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchGBETTransferFail(error));
      });
  };
};
// NOTE: action functions for Transfer of GBET --------- END --------------
// NOTE: action functions for Holder of GBET --------- START --------------
export const fetchGBETHoldersStart = () => {
  return {
    type: actionTypes.FETCH_GBET_HOLDERS_PENDING,
  };
};

export const fetchGBETHoldersSuccess = (response) => {
  return {
    type: actionTypes.FETCH_GBET_HOLDERS_FULFILLED,
    data: response,
  };
};

export const fetchGBETHoldersFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.FETCH_GBET_HOLDERS_REJECTED,
    error: error,
  };
};

export const fetchGBETHolders = (page, count) => {
  let url =
    globalProps.trackerBaseUrl +
    `/holders?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267&page=${page}&count=${count}`;
  return (dispatch) => {
    dispatch(fetchGBETHoldersStart());
    console.log('FETCHING  Summary!!');
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchGBETHoldersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchGBETHoldersFail(error));
      });
  };
};
// NOTE: action functions for Holder of GBET --------- END --------------
// NOTE: action functions for TransferSummary of GBET --------- START --------------
export const fetchGBETTransferSummaryStart = () => {
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_SUMMARY_PENDING,
  };
};

export const fetchGBETTransferSummarySuccess = (response) => {
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_SUMMARY_FULFILLED,
    data: response,
  };
};

export const fetchGBETTransferSummaryFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.FETCH_GBET_TRANSFER_SUMMARY_REJECTED,
    error: error,
  };
};

export const fetchGBETTransferSummary = () => {
  let stat = {
    totalSize: 0,
    page: 0,
    totalPage: 0,
    list: null,
  };
  let transferData = {
    minted: 0,
    burnt: 0,
    isLoading: true,
    nameChanged: 0,
    statChanged: 0,
  };
  let url =
    globalProps.trackerBaseUrl + `/txList?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267&page=1&count=100`;

  return async (dispatch) => {
    dispatch(fetchGBETTransferSummaryStart());
    await axios
      .get(url)
      .then((res) => {
        stat = {
          totalSize: res.data.totalSize,
          page: 1,
          totalPage: Math.ceil(parseInt(res.data.totalSize) / 100),
          list: res.data.data,
        };
      })
      .catch((error) => {
        dispatch(fetchGBETTransferSummaryFail(error));
      });
    transferData = await processTransferToStates(stat.list);
    dispatch(fetchGBETTransferSummarySuccess(transferData));

    for (let i = 2; i <= stat.totalPage; i++) {
      await axios
        .get(
          globalProps.trackerBaseUrl +
            `/txList?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267&page=${i}&count=100`
        )
        .then(async (res) => {
          stat = {
            totalSize: res.data.totalSize,
            page: i,
            totalPage: Math.ceil(parseInt(res.data.totalSize) / 100),
            list: res.data.data,
          };
          let newTransferData = await processTransferToStates(stat.list, transferData);
          transferData = newTransferData;
          if (i == stat.totalPage) {
            transferData['isLoading'] = false;
          } else {
            transferData['isLoading'] = true;
          }
          dispatch(fetchGBETTransferSummarySuccess(transferData));
        })
        .catch((error) => {
          dispatch(fetchGBETTransferSummaryFail(error));
        });
    }
  };
};

// NOTE: action functions for Transfer of GBET --------- END --------------
