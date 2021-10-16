import { updateObject } from '../../redux/utility';
import * as actionTypes from '../../redux/action.type';

let initialStats = {
  loadingSummary: true,
  loadingTransfer: true,
  loadingTransferSummary: true,
  loadingHolder: true,
  gbetTranfersSummary: { minted: 0, burnt: 0, nameChanged: 0 },
  fetchSummaryFail: null,
  fetchHolderFail: null,
  paginationHoldersTotalSize: {
    totalSize: 0,
    totalPage: 0,
  },
  fetchTransferFail: null,
  gbetSummary: null,
  gbetTranfers: {
    data: [],
    totalPage: 0,
    totalSize: 0,
  },
  gbetHolders: null,
};
// NOTE: Reducer functions for summary of GBET --------- START --------------

const fetchGBETSummaryStart = (state, action) => {
  return updateObject(state, {
    loadingSummary: true,
  });
};

const fetchGBETSummarySuccess = (state, action) => {
  return updateObject(state, {
    loadingSummary: false,
    gbetSummary: action.data.data,
  });
};

const fetchGBETSummaryFail = (state, action) => {
  return updateObject(state, {
    loadingSummary: false,
    fetchSummaryFail: action.error,
  });
};
// NOTE: Reducer functions for summary of GBET --------- END --------------
// NOTE: Reducer functions for Transfer of GBET --------- START --------------
const fetchGBETTransferStart = (state, action) => {
  return updateObject(state, {
    loadingTransfer: true,
  });
};

const fetchGBETTransferSuccess = (state, action) => {
  return updateObject(state, {
    loadingTransfer: false,
    gbetTranfers: {
      totalPage: Math.ceil(parseInt(action.data.totalSize) / 20),
      data: action.data.data,
      totalSize: action.data.totalSize,
    },
  });
};

const fetchGBETTransferFail = (state, action) => {
  return updateObject(state, {
    loadingTransfer: false,
    fetchTransferFail: action.error,
  });
};
// NOTE: Reducer functions for Transfer of GBET --------- END --------------
// NOTE: Reducer functions for Holder of GBET --------- START --------------
const fetchGBETHoldersStart = (state, action) => {
  return updateObject(state, {
    loadingHolder: true,
  });
};

const fetchGBETHoldersSuccess = (state, action) => {
  return updateObject(state, {
    loadingHolder: false,
    gbetHolders: action.data.data,
    paginationHoldersTotalSize: {
      totalSize: action.data.totalSize,
      totalPage: Math.ceil(parseInt(action.data.totalSize) / 20),
    },
  });
};

const fetchGBETHoldersFail = (state, action) => {
  return updateObject(state, {
    loadingHolder: false,
    fetchHolderFail: action.error,
  });
};
// NOTE: Reducer functions for Holder of GBET --------- END --------------
// NOTE: Reducer functions for Transfer Summary of GBET --------- START --------------
const fetchGBETTransferSummaryStart = (state, action) => {
  return updateObject(state, {
    loadingTransferSummary: true,
  });
};

const fetchGBETTransferSummarySuccess = (state, action) => {
  return updateObject(state, {
    loadingTransferSummary: false,
    gbetTranfersSummary: action.data,
  });
};

const fetchGBETTransferSummaryFail = (state, action) => {
  return updateObject(state, {
    loadingTransferSummary: false,
    fetchTransferFail: action.error,
  });
};
// NOTE: Reducer functions for Transfer Summary of GBET --------- END --------------
export const gbetReducer = (state = { ...initialStats }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GBET_SUMMARY_PENDING:
      return fetchGBETSummaryStart(state, action);
    case actionTypes.FETCH_GBET_SUMMARY_FULFILLED:
      return fetchGBETSummarySuccess(state, action);
    case actionTypes.FETCH_GBET_SUMMARY_REJECTED:
      return fetchGBETSummaryFail(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_PENDING:
      return fetchGBETTransferStart(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_FULFILLED:
      return fetchGBETTransferSuccess(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_REJECTED:
      return fetchGBETTransferFail(state, action);
    case actionTypes.FETCH_GBET_HOLDERS_PENDING:
      return fetchGBETHoldersStart(state, action);
    case actionTypes.FETCH_GBET_HOLDERS_FULFILLED:
      return fetchGBETHoldersSuccess(state, action);
    case actionTypes.FETCH_GBET_HOLDERS_REJECTED:
      return fetchGBETHoldersFail(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_SUMMARY_PENDING:
      return fetchGBETTransferSummaryStart(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_SUMMARY_FULFILLED:
      return fetchGBETTransferSummarySuccess(state, action);
    case actionTypes.FETCH_GBET_TRANSFER_SUMMARY_REJECTED:
      return fetchGBETTransferSummaryFail(state, action);
    default:
      return state;
  }
};
