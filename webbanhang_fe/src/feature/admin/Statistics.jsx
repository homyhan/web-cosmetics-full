// Statistics.js
import React, { useEffect } from 'react';
import LayoutAdmin from '../../HOCs/LayoutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlySales } from './thunk';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const dispatch = useDispatch();
  const monthlySales = useSelector(state => state.admin.monthlySales);

  useEffect(() => {
    dispatch(fetchMonthlySales());
  }, [dispatch]);

  console.log("Monthly Sales:", monthlySales);
  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlySales,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <LayoutAdmin>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </LayoutAdmin>
  );
};

export default Statistics;
