import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Transaction.style.css';
import Skeleton from '../../components/skeleton/Skeleton.component';
import StatBox from '../../components/statBox/StatBox.component';
import Pie from '../../components/charts/pie/Pie.chart';
import BarChart from '../../components/charts/bar/Bar.chart';

import { fetchGBETTransfer, fetchGBETTransferSummary } from '../../services/gbet/gbet.action';
import { timeAgo } from '../../services/utils/utilis';

export class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      totalDisplaySize: 20,
      totalPage: 0,
      charts: {
        burntVsMint: {
          burnt: 0,
          minted: 0,
        },
      },
    };
  }

  componentDidMount() {
    console.log('hey');

    this.props.onFetchTransfer(1, this.state.totalDisplaySize);

    if (this.props.GBETTransferSummary.minted == 0) {
      this.props.onFetchTransferSummary();
    }
  }
  ageString(time) {
    return timeAgo(time);
  }

  paginationNextPage(currentPage, totalPage) {
    console.log(currentPage, totalPage);
    if (currentPage >= 1 && currentPage <= totalPage) {
      this.props.onFetchTransfer(currentPage + 1, this.state.totalDisplaySize);
      this.setState({
        pageNo: currentPage + 1,
      });
    }
  }

  paginationPrevPage(currentPage, totalPage) {
    if (currentPage > 1 && currentPage <= totalPage) {
      this.props.onFetchTransfer(currentPage - 1, this.state.totalDisplaySize);
      this.setState({
        pageNo: currentPage - 1,
      });
    }
  }
  render() {
    var GBETTransactionsComp = (
      <div>
        <div style={{ display: 'flex' }}>
          <span>
            <Skeleton width={590} height={50} />
          </span>
          <span>
            <Skeleton width={590} height={50} />
          </span>
        </div>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <span>
            <Skeleton width={590} height={50} />
          </span>
          <span>
            <Skeleton width={590} height={50} />
          </span>
        </div>
      </div>
    );
    var GBETTransferTableComp = (
      <div>
        <Skeleton width={1200} height={600} />
      </div>
    );
    if (!this.props.GBETTransferSummaryLoading) {
      GBETTransactionsComp = (
        <div className='g-Summary'>
          <StatBox
            title={'GBET Minted'}
            value={parseFloat(this.props.GBETTransferSummary.minted).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            mintedEmoji={true}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'GBET Burnt'}
            value={parseFloat(this.props.GBETTransferSummary.burnt).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            burntEmoji={true}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Net GBET'}
            value={parseFloat(
              this.props.GBETTransferSummary.minted - this.props.GBETTransferSummary.burnt
            ).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Transfer GBET'}
            value={parseFloat(this.props.GBETTransferSummary.transfer).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Name Changed'}
            value={parseFloat(this.props.GBETTransferSummary.nameChanged).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Stats Changed'}
            value={parseFloat(this.props.GBETTransferSummary.statChanged).toLocaleString('en-US', {
              maximumFractionDigits: 20,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
        </div>
      );
    }
    if (!this.props.GBETTranferLoading) {
      console.log();
      GBETTransferTableComp = (
        <div className='transaction-Summary'>
          <div>
            <p className='searchFound'>
              A Total of{' '}
              <span style={{ color: '#04a6bd', fontWeight: 'bold' }}>
                {this.props.GBETTransfertotalSize} token transfer(s)
              </span>{' '}
              found.
            </p>
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
                    <td>{this.ageString(new Date(age.split('+')[0]))}</td>
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
                      <span className='toFromIcon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          height='18px'
                          viewBox='0 0 24 24'
                          width='18px'
                          fill='grey'
                        >
                          <path d='M0 0h24v24H0z' fill='none' />
                          <path d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z' />
                        </svg>
                      </span>
                    </td>
                    <td className='tdTo'>
                      <span>
                        <a title={toAddr} href={`https://tracker.icon.foundation/address/${toAddr}`} target='_blank'>
                          {toAddr}
                        </a>
                      </span>
                    </td>
                    <td>
                      <span>
                        {parseFloat(quantity).toLocaleString('en-US', {
                          maximumFractionDigits: 20,
                        })}
                      </span>
                      <span className='tokenName'> GBET</span>
                    </td>
                    <td>
                      <span>
                        {parseFloat(fee).toLocaleString('en-US', {
                          maximumFractionDigits: 20,
                        })}
                      </span>
                      <em> ICX</em>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='pagination'>
              {this.state.pageNo > 1 && this.state.pageNo <= this.props.GBETTransfertotalPage ? (
                <div
                  className='btn leftArrow'
                  onClick={() => {
                    this.paginationPrevPage(this.state.pageNo, this.props.GBETTransfertotalPage);
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'>
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
                  </svg>
                </div>
              ) : null}

              <div className='pageFunction'>
                <span> {this.state.pageNo} </span> <span>/</span> <span> {this.props.GBETTransfertotalPage} </span>
              </div>
              {this.state.pageNo >= 1 && this.state.pageNo <= this.props.GBETTransfertotalPage ? (
                <div
                  className='btn rightArrow'
                  onClick={() => {
                    this.paginationNextPage(this.state.pageNo, this.props.GBETTransfertotalPage);
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'>
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    let totalBurntPer =
      100 * (parseFloat(this.props.GBETTransferSummary.burnt) / parseFloat(this.props.GBETTransferSummary.minted));
    let NameChangePer =
      100 * (parseFloat(this.props.GBETTransferSummary.nameChanged) / parseFloat(this.props.GBETTransferSummary.burnt));
    return (
      <div className='transaction-container'>
        <h1>GBET Transactions Summary</h1>
        {GBETTransactionsComp}
        <div className='chartContainer'>
          <div className='chart'>
            <h1>
              Supply Vs Burnt <span style={{ fontSize: '14px' }}>(%)</span>
            </h1>
            <div className='burntVsMint'>
              <Pie labels={['Supply', 'Burnt']} data={[100 - totalBurntPer, totalBurntPer]} />
            </div>
          </div>
          <div className='chart'>
            <h1>
              Burnt Type Distribution <span style={{ fontSize: '14px' }}>(%)</span>
            </h1>
            <div className='burntVsMint'>
              <Pie labels={['Name Changed', 'Stat Changed']} data={[NameChangePer, 100 - NameChangePer]} />
            </div>
          </div>
          <div className='chart'>
            <h1>
              Transaction distribution <span style={{ fontSize: '14px' }}>(#)</span>
            </h1>
            <div className='burntVsMint'>
              <Pie
                labels={['# of Mints', '# of Burns', '# of Transfers']}
                data={[
                  this.props.GBETTransferSummary.noOfMintedTransaction,
                  this.props.GBETTransferSummary.noOfBurntTransaction,
                  this.props.GBETTransferSummary.noOfTransferTransaction,
                ]}
              />
            </div>
          </div>
        </div>

        <h1>GBET Transactions Table</h1>
        {GBETTransferTableComp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GBETTranferLoading: state.gbetReducer.loadingTransfer,
    GBETTransferSummaryLoading: state.gbetReducer.loadingTransferSummary,
    GBETTransfer: state.gbetReducer.gbetTranfers.data,
    GBETTransfertotalPage: state.gbetReducer.gbetTranfers.totalPage,
    GBETTransfertotalSize: state.gbetReducer.gbetTranfers.totalSize,

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
