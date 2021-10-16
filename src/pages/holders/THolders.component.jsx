import React, { Component } from 'react';
import { connect } from 'react-redux';
import './THolders.style.css';
import Skeleton from '../../components/skeleton/Skeleton.component';

import { fetchGBETHolders } from '../../services/gbet/gbet.action';
import { timeAgo } from '../../services/utils/utilis';

export class THolders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      totalDisplaySize: 20,
      totalPage: 0,
    };
  }

  componentDidMount() {
    this.props.onFetchHolders(1, this.state.totalDisplaySize);
  }
  ageString(time) {
    return timeAgo(time);
  }

  paginationNextPage(currentPage, totalPage) {
    console.log(currentPage, totalPage);
    if (currentPage >= 1 && currentPage <= totalPage) {
      this.props.onFetchHolders(currentPage + 1, this.state.totalDisplaySize);
      this.setState({
        pageNo: currentPage + 1,
      });
    }
  }

  paginationPrevPage(currentPage, totalPage) {
    if (currentPage > 1 && currentPage <= totalPage) {
      this.props.onFetchHolders(currentPage - 1, this.state.totalDisplaySize);
      this.setState({
        pageNo: currentPage - 1,
      });
    }
  }
  render() {
    var GBETHoldersTableComp = (
      <div>
        <Skeleton width={1200} height={600} />
      </div>
    );

    if (!this.props.GBETHoldersLoading) {
      GBETHoldersTableComp = (
        <div className='transaction-Summary'>
          <div>
            <p className='searchFound'>
              A Total of{' '}
              <span style={{ color: '#04a6bd', fontWeight: 'bold' }}>{this.props.TotalHolders} token holder(s)</span>{' '}
              found.
            </p>
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
            <div className='pagination'>
              {this.state.pageNo > 1 && this.state.pageNo <= this.props.TotalPages ? (
                <div
                  className='btn leftArrow'
                  onClick={() => {
                    this.paginationPrevPage(this.state.pageNo, this.props.TotalPages);
                  }}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'>
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
                  </svg>
                </div>
              ) : null}

              <div className='pageFunction'>
                <span> {this.state.pageNo} </span> <span>/</span> <span> {this.props.TotalPages} </span>
              </div>
              {this.state.pageNo >= 1 && this.state.pageNo <= this.props.TotalPages ? (
                <div
                  className='btn rightArrow'
                  onClick={() => {
                    this.paginationNextPage(this.state.pageNo, this.props.TotalPages);
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
    return (
      <div className='transaction-container'>
        <h1>GBET Holders Table</h1>
        {GBETHoldersTableComp}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GBETHoldersLoading: state.gbetReducer.loadingHolder,
    GBETHolders: state.gbetReducer.gbetHolders,
    TotalHolders: state.gbetReducer.paginationHoldersTotalSize.totalSize,
    TotalPages: state.gbetReducer.paginationHoldersTotalSize.totalPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHolders: (page, count) => dispatch(fetchGBETHolders(page, count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(THolders);
