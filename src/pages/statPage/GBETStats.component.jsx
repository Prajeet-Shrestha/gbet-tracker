import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GBETStats.style.css';
import Skeleton from '../../components/skeleton/Skeleton.component';
import StatBox from '../../components/statBox/StatBox.component';

import {
  fetchGBETSummary,
  fetchGBETTransfer,
  fetchGBETHolders,
  fetchGBETTransferSummary,
} from '../../services/gbet/gbet.action';
import { NavLink } from 'react-router-dom';
import { timeAgo } from '../../services/utils/utilis';

export class GBETStats extends Component {
  constructor(props) {
    super(props);
    var startDate = new Date();
    this.state = {
      startTime: new Date(),
    };
  }

  componentDidMount() {
    console.log('hey');
    this.props.onFetchSummary();

    setInterval(() => {
      var startDate = new Date();
      this.setState({
        startTime: startDate,
      });
      this.props.onFetchSummary();
    }, 180000);
    this.props.onFetchTransfer(1, 100);
    this.props.onFetchHolders(1, 10);

    if (this.props.GBETTransferSummary.minted == 0) {
      this.props.onFetchTransferSummary();
      setInterval(() => {
        var startDate = new Date();
        this.setState({
          startTime: startDate,
        });
        this.props.onFetchTransferSummary();
      }, 180000);
    }
  }
  ageString(time) {
    return timeAgo(time);
  }
  render() {
    var GBETSummaryComp = (
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
    var GBETHolderComp = (
      <div>
        <Skeleton width={1200} height={600} />
      </div>
    );
    if (!this.props.GBETSummaryLoading) {
      // console.log(`Total Pages Of Tracs: ${Math.ceil(parseInt(this.props.GBETSummary.transfers) / 100)}`);
      let totalSupply = this.props.GBETSummary.totalSupply.split('.');
      let formatted = parseFloat(totalSupply[0]).toLocaleString('en-US', {
        maximumFractionDigits: 1,
      });

      console.log(totalSupply);
      GBETSummaryComp = (
        <div className='g-Summary'>
          <StatBox title={'Total Supply'} value={formatted.toString() + '.' + totalSupply[1]} unitName={'GBET'} />
          <StatBox
            title={'Contract'}
            value={this.props.GBETSummary.contract}
            isValueLink={true}
            link={'https://tracker.icon.foundation/contract/cx6139a27c15f1653471ffba0b4b88dc15de7e3267'}
            unitName={''}
          />
          <StatBox title={'Decimals'} value={this.props.GBETSummary.decimals} unitName={''} />
          <StatBox
            title={'Total Transfers'}
            value={parseFloat(this.props.GBETSummary.transfers).toLocaleString('en-US', {
              maximumFractionDigits: 1,
            })}
            unitName={''}
          />
          <StatBox
            title={'Price'}
            value={this.props.GBETSummary.price ? this.props.GBETSummary.price : '-'}
            unitName={''}
          />
          <StatBox
            title={'Holders'}
            value={parseFloat(this.props.GBETSummary.holders).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            unitName={'Address(es)'}
          />
        </div>
      );
    }
    if (!this.props.GBETTranferLoading) {
      GBETTransactionsComp = (
        <div className='g-Summary'>
          <StatBox
            title={'GBET Minted'}
            value={parseFloat(this.props.GBETTransferSummary.minted).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            mintedEmoji={true}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'GBET Burnt'}
            value={parseFloat(this.props.GBETTransferSummary.burnt).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
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
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Transfer GBET'}
            value={parseFloat(this.props.GBETTransferSummary.transfer).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Name Changed'}
            value={parseFloat(this.props.GBETTransferSummary.nameChanged).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <StatBox
            title={'Stats Changed'}
            value={parseFloat(this.props.GBETTransferSummary.statChanged).toLocaleString('en-US', {
              maximumFractionDigits: this.props.GBETSummary.decimals,
            })}
            isLoading={this.props.GBETTransferSummary.isLoading}
            unitName={'GBET'}
          />
          <NavLink to='/transfers'>
            <div className='showMore'>
              <span> Show more </span>
              <span className='moreIcon'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M7.49992 4.16687V5.83354H12.9916L3.33325 15.4919L4.50825 16.6669L14.1666 7.00854V12.5002H15.8333V4.16687H7.49992Z'
                    fill='black'
                    fillOpacity='0.5'
                  />
                </svg>
              </span>
            </div>
          </NavLink>
        </div>
      );
    }
    if (!this.props.GBETHoldersLoading) {
      // console.log(this.props.GBETHolders);

      GBETHolderComp = (
        <div className='holders-Summary'>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Addresses</th>
                  <th>Quantity</th>
                  <th>
                    Percentage<em>%</em>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.GBETHolders.map(({ rank, address, quantity, percentage }, index) => (
                  <tr key={index}>
                    <td>{rank}</td>
                    <td>
                      <span>
                        <a title={address} href={`https://gangstabet.io/wallet/${address}`} target='_blank'>
                          {address}
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
                      <span>{percentage}</span>
                      <em>%</em>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <NavLink to='/holders'>
            <div className='showMore'>
              <span> Show more </span>
              <span className='moreIcon'>
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M7.49992 4.16687V5.83354H12.9916L3.33325 15.4919L4.50825 16.6669L14.1666 7.00854V12.5002H15.8333V4.16687H7.49992Z'
                    fill='black'
                    fillOpacity='0.5'
                  />
                </svg>
              </span>
            </div>
          </NavLink>
        </div>
      );
    }
    return (
      <div className='gStat-container'>
        <div className='gs-mainTitle'>
          <h1>GangstaBet Token (GBET)</h1>
          <p>
            Last Updated:
            {this.ageString(this.state.startTime)}
          </p>
        </div>
        {GBETSummaryComp}
        <div className='gs-mainTitle'>
          <h1>GBET Transactions</h1>
          <p>
            Last Updated:
            {this.ageString(this.state.startTime)}
          </p>
        </div>
        {GBETTransactionsComp}
        <div className='gs-mainTitle'>
          <h1>GBET Holders</h1>
          <p>
            Last Updated:
            {this.ageString(this.state.startTime)}
          </p>
        </div>
        {GBETHolderComp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GBETSummary: state.gbetReducer.gbetSummary,
    GBETSummaryLoading: state.gbetReducer.loadingSummary,
    GBETTranferLoading: state.gbetReducer.loadingSummary,
    GBETTransfer: state.gbetReducer.gbetTranfers.data,
    GBETTransferSummaryLoading: state.gbetReducer.loadingTransferSummary,
    GBETHoldersLoading: state.gbetReducer.loadingHolder,
    GBETHolders: state.gbetReducer.gbetHolders,
    GBETTransferSummary: state.gbetReducer.gbetTranfersSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSummary: () => dispatch(fetchGBETSummary()),
    onFetchTransferSummary: () => dispatch(fetchGBETTransferSummary()),

    onFetchTransfer: (page, count) => dispatch(fetchGBETTransfer(page, count)),
    onFetchHolders: (page, count) => dispatch(fetchGBETHolders(page, count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GBETStats);
