import moment from 'moment';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { CustomTooltip } from '../CustomToolTip';
import PropTypes from 'prop-types';

const LineChartComponent = ({ data, text, yAxisValue }) => {

    const getTickCount = (dataLength) => {
        if (dataLength <= 10) return dataLength;
        if (dataLength <= 20) return Math.floor(dataLength / 12);
        return Math.floor(dataLength / 13);
    };

    return (
        <div className='flex flex-col justify-between md:w-[150%] border-[1px] p-5 bg-[#1E1E22]/30 border-[#E1E3F3]/5 rounded-md backdrop-blur-3xl'>

            <h2 className='text-[20px] font-semibold pb-1 pl-3 dashboard_mainText'>{text}</h2>
            <div className='w-full h-[200px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        width={500}
                        height={400}
                        margin={{ top: 10, right: 30, left: 15, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUV" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#48D1CC" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#48D1CC" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#bdbdbd57" strokeDasharray="1 5" vertical={false} />
                        <XAxis
                            dataKey="Timestamp"
                            tickFormatter={(unixTime) => moment(unixTime).format('DD MMM')}
                            interval={0}
                            ticks={data.map(entry => entry.Timestamp).filter((v, i, a) => i % Math.floor(a.length / getTickCount(a.length)) === 0)}
                            axisLine={false}
                            offset={0}
                        />
                        <YAxis stroke="#cccccc4d" tickFormatter={(tick) => {
                            return `${tick} Kg`;
                        }} />
                        <Tooltip content={<CustomTooltip />} labelFormatter={(label) => moment(label).format('YYYY-MM-DD HH:mm:ss')} />
                        <Area
                            type="monotone"
                            dataKey={yAxisValue}
                            stroke="#48D1CC"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorUV)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};


export default LineChartComponent;

LineChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
    yAxisValue: PropTypes.string.isRequired,
};