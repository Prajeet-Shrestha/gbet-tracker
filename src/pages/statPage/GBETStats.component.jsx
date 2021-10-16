import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GBETStats.style.css';
import Skeleton from '../../components/skeleton/Skeleton.component';
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
    this.props.onFetchTransfer(1, 100);
    this.props.onFetchHolders(1, 10);

    if (this.props.GBETTransferSummary.minted == 0) {
      this.props.onFetchTransferSummary();
    }
  }
  ageString(time) {
    return timeAgo(time);
  }
  render() {
    // console.log('summary:', this.props.GBETSummaryLoading);
    // console.log('trans:', this.props.GBETTranferLoading);
    // console.log('holder:', this.props.GBETHoldersLoading);

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
      GBETSummaryComp = (
        <div className='g-Summary'>
          <div className='statBox'>
            <div className='gs-title'>Total Supply</div>
            <div className='value'>
              {this.props.GBETSummary.totalSupply} <span className='tokenName'> GBET</span>
            </div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Contract</div>
            <div className='value'>
              {' '}
              <a href='https://tracker.icon.foundation/contract/cx6139a27c15f1653471ffba0b4b88dc15de7e3267'>
                {this.props.GBETSummary.contract}
              </a>
            </div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Decimals</div>
            <div className='value'>{this.props.GBETSummary.decimals}</div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Total Transfers</div>
            <div className='value'>{this.props.GBETSummary.transfers}</div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Price</div>
            <div className='value'>{this.props.GBETSummary.price ? this.props.GBETSummary.price : '-'}</div>
          </div>
          <div className='statBox'>
            <div className='gs-title'>Holders</div>
            <div className='value'>
              {this.props.GBETSummary.holders} <span className='tokenName'> Address(es)</span>{' '}
            </div>
          </div>
        </div>
      );
    }
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
                      <span>{quantity}</span>
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

          {/* ------------------------------------ */}
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
        </div>
      );
    }
    return (
      <div className='gStat-container'>
        <div className='gs-title'>
          <h1>GangstaBet Token (GBET)</h1>
          <p>
            Last Updated:
            {this.ageString(this.state.startTime)}
          </p>
        </div>
        {GBETSummaryComp}
        <div className='gs-title'>
          <h1>GBET Transactions</h1>
          <p>
            Last Updated:
            {this.ageString(this.state.startTime)}
          </p>
        </div>
        {GBETTransactionsComp}
        <div className='gs-title'>
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
