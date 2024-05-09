/* eslint-disable react/prop-types */

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { CustomTooltip } from '../CustomToolTip';

const DateAreaChart = ({ data, text }) => {

  const getTickCount = (dataLength) => {
    if (dataLength <= 10) return dataLength;
    if (dataLength <= 20) return Math.floor(dataLength / 12);
    return Math.floor(dataLength / 25);
  };


  return (
    <div className='flex flex-col justify-between w-full border-[1px] p-5 bg-[#1E1E22]/50 border-[#E1E3F3]/5 backdrop-blur-3xl rounded-md relative z-[5]'>
      <h2 className='text-[20px] font-semibold pb-1 pl-3 dashboard_mainText'>{text}</h2>
      <div className='w-full h-[200px]'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7274f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7274f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#bdbdbd57" strokeDasharray="1 5" vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(unixTime) => moment(unixTime).format('DD MMM')}
              interval={0}
              ticks={data.map(entry => entry.timestamp).filter((v, i, a) => i % Math.floor(a.length / getTickCount(a.length)) === 0)}
              axisLine={false}
              offset={0}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} labelFormatter={(label) => moment(label).format('YYYY-MM-DD HH:mm:ss')} />
            <Area type="monotone" dataKey="value" stroke="#7274f1" strokeWidth={1} fill="url(#colorData)" fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DateAreaChart;

