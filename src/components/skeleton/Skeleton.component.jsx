import './Skeleton.style.css';
function Skeleton(props) {
  return <div className='sk-box' style={{ width: `${props.width}px`, height: `${props.height}px` }}></div>;
}
export default Skeleton;
