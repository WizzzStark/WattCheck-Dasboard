import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const LineChartComponent = ({ data, colors }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="CO2" stroke={colors[1]} name="Estimación de CO2" />
                <CartesianGrid stroke="#475569" />
                <XAxis dataKey="Hora" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend wrapperStyle={{ color: 'white' }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;

LineChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
};