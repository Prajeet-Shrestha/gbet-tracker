import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ lineLabel1, lineValue1, color }) {
  //   const [lineMintedBurnt, setLineMintedBurnt] = useState({
  //     minted: {
  //       labels: [],
  //       value: [],
  //     },
  //     burnt: {
  //       labels: [],
  //       value: [],
  //     },
  //   });
  //   useEffect(() => {
  //     console.log(byMonth);
  //   }, [byMonth]);
  //   useEffect(() => {
  //     console.log(byMonth);
  //   }, []);
  //   console.log(byMonth);

  return (
    <div>
      <Line
        data={{
          labels: lineLabel1,

          datasets: [
            {
              label: '',
              data: lineValue1,
              fill: true,
              backgroundColor: color == 'red' ? 'rgba(255, 0, 0,0.1)' : 'rgba(75, 192, 192,0.1)',
              borderColor: color == 'red' ? '#FF6056' : 'rgb(75, 192, 192)',
              tension: 0.4,
            },
          ],
        }}
      />
    </div>
  );
}
