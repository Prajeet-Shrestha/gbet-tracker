import './StatBox.style.css';
function StatBox(props) {
  return (
    <div className='statBox'>
      <div className='gs-title'> {props.title} </div>
      <div className='value'>
        {props.isValueLink ? (
          <a target='_blank' href={props.link}>
            {props.value}
          </a>
        ) : (
          <>{props.value}</>
        )}

        <span className='tokenName'> {props.unitName}</span>
        {props.mintedEmoji ? <span className='emoji burnt'>🌿</span> : null}
        {props.burntEmoji ? <span className='emoji burnt'>🔥</span> : null}
        {props.isLoading ? (
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
  );
}
export default StatBox;
