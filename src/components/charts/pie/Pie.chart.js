import { React } from 'react';
import { Doughnut } from 'react-chartjs-2';

function Pie(props) {
  let labels = props.labels;
  let data = props.data;
  // console.log(labels, data);
  return (
    <div>
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: '',
              data: data,
              backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)'],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
}
export default Pie;
