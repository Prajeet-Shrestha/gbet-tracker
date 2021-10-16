import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Transaction.style.css';

import { fetchGBETTransfer, fetchGBETTransferSummary } from '../../services/gbet/gbet.action';
import { processTransferToStates } from '../../services/utils/utilis';

export class Transaction extends Component {
  componentDidMount() {
    console.log('hey');

    this.props.onFetchTransfer(1, 10);

    if (this.props.GBETTransferSummary.minted == 0) {
      this.props.onFetchTransferSummary();
    }
  }
  render() {
    var GBETTransactionsComp = null;
    var GBETTransferTableComp = null;
    if (!this.props.GBETTranferLoading) {
      GBETTransactionsComp = (
        <div className='g-Summary'>
          <div className='statBox'>
            <div className='gs-title'>GBET Minted</div>
            <div className='value'>
              {this.props.GBETTransferSummary.minted} <span className='tokenName'> GBET</span>
              {this.props.GBETTransferSummary.isLoading ? (
                <span className='iconUp'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='18px'
                    viewBox='0 0 24 24'
                    width='18px'
                    fill='rgb(9, 189, 9)'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>GBET Burnt</div>
            <div className='value'>
              {this.props.GBETTransferSummary.burnt} <span className='tokenName'> GBET</span>
              {this.props.GBETTransferSummary.isLoading ? (
                <span className='iconUp'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='18px'
                    viewBox='0 0 24 24'
                    width='18px'
                    fill='rgb(9, 189, 9)'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Net GBET</div>
            <div className='value'>
              {this.props.GBETTransferSummary.minted - this.props.GBETTransferSummary.burnt}
              <span className='tokenName'> GBET</span>
              {this.props.GBETTransferSummary.isLoading ? (
                <span className='iconUp'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='18px'
                    viewBox='0 0 24 24'
                    width='18px'
                    fill='rgb(9, 189, 9)'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Name Changed</div>
            <div className='value'>
              {this.props.GBETTransferSummary.nameChanged} <span className='tokenName'> GBET</span>
              {this.props.GBETTransferSummary.isLoading ? (
                <span className='iconUp'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='18px'
                    viewBox='0 0 24 24'
                    width='18px'
                    fill='rgb(9, 189, 9)'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
                  </svg>
                </span>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    if (!this.props.GBETTranferLoading) {
      // console.log(this.props.GBETHolders);

      GBETTransferTableComp = (
        <div className='transaction-Summary'>
          <div>
            <table>
              <thead>
                <tr>
                  <th>TxHash</th>
                  <th>Age</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Quantity</th>
                  <th>TxFee</th>
                </tr>
              </thead>
              <tbody>
                {this.props.GBETTransfer.map(({ txHash, age, toAddr, fromAddr, quantity, fee }, index) => (
                  <tr key={index}>
                    <td>
                      <a title={txHash} href={`https://gangstabet.io/wallet/${txHash}`} target='_blank'>
                        {txHash}
                      </a>
                    </td>
                    <td>{age}</td>
                    <td>
                      <span>
                        <a
                          title={fromAddr}
                          href={`https://tracker.icon.foundation/address/${fromAddr}`}
                          target='_blank'
                        >
                          {fromAddr}
                        </a>
                      </span>
                    </td>
                    <td>
                      <span>
                        <a title={toAddr} href={`https://tracker.icon.foundation/address/${toAddr}`} target='_blank'>
                          {toAddr}
                        </a>
                      </span>
                    </td>
                    <td>
                      <span>{quantity}</span>
                      <span className='tokenName'> GBET</span>
                    </td>
                    <td>
                      <span>{fee}</span>
                      <em> ICX</em>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    return (
      <div className='gStat-container'>
        <h1>GBET Transactions Summary</h1>
        {GBETTransactionsComp}
        <h1>GBET Transactions Table</h1>
        {GBETTransferTableComp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GBETTranferLoading: state.gbetReducer.loadingTransfer,
    GBETTransfer: state.gbetReducer.gbetTranfers,
    GBETTransferSummary: state.gbetReducer.gbetTranfersSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTransferSummary: () => dispatch(fetchGBETTransferSummary()),
    onFetchTransfer: (page, count) => dispatch(fetchGBETTransfer(page, count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
