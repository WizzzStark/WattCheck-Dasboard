/* eslint-disable react/prop-types */
import moment from 'moment';



export const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const timestamp = Number(label);
        const formattedDate = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        const formattedValue = payload[0].value.toFixed(2);

        return (
            <div className="custom-tooltip" style={{
                backgroundColor: '#2c2c2e',
                padding: '10px',
                border: '1px solid #555',
                borderRadius: '5px',
                color: '#fff'
            }}>
                <p className="label">{`Fecha: ${formattedDate}`}</p>
                <p className="intro">{`Consumo: ${formattedValue} kWh`}</p>
            </div>
        );
    }

    return null;
};
