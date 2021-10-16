import axios from 'axios';
import * as actionTypes from '../../redux/action.type';
import { globalProps } from '../const/properties';

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

export const fetchGBETTransfer = () => {
  let url = globalProps.trackerBaseUrl + `/txList?contractAddr=cx6139a27c15f1653471ffba0b4b88dc15de7e3267&count=100`;
  return (dispatch) => {
    dispatch(fetchGBETTransferStart());
    console.log('FETCHING  Summary!!');
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
