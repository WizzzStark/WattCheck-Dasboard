import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { CustomTooltip } from '../CustomToolTip';
import PropTypes from 'prop-types';


const BarChartComponent = ({ data, yAxisValue }) => {

    const getTickCount = (dataLength) => {
        if (dataLength <= 10) return dataLength;
        if (dataLength <= 20) return Math.floor(dataLength / 12);
        return Math.floor(dataLength / 13);
    };

    return (
        <div className='flex flex-col justify-between w-full border-[1px] p-5 bg-[#1E1E22]/50 border-[#E1E3F3]/5 backdrop-blur-3xl rounded-md relative z-[5]'>
            <h2 className='text-[20px] font-semibold pb-1 pl-3 dashboard_mainText'>C02 Consumption per hour</h2>
            <div className='w-full h-[200px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid stroke="#bdbdbd57" strokeDasharray="1 5" vertical={false} />
                        <XAxis
                            dataKey="Timestamp"
                            tickFormatter={(unixTime) => moment(unixTime).format('DD MMM')}
                            interval={0}
                            ticks={data.map(entry => entry.Timestamp).filter((v, i, a) => i % Math.floor(a.length / getTickCount(a.length)) === 0)}
                        />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey={yAxisValue} fill="#25d4b7" name="Consumo por Hora" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BarChartComponent;

BarChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
    yAxisValue: PropTypes.string.isRequired,
};
