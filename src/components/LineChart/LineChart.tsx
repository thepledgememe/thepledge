import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const data = [
    { date: '8/11', tokens: 10 },
    { date: '8/11', tokens: 60 },
    { date: '8/11', tokens: 30 },
    { date: '8/11', tokens: 90 },
    { date: '8/11', tokens: 50 },
    { date: '8/11', tokens: 100 },
    { date: '8/11', tokens: 89 },
];

const TokenPledgeLineChart = () => {
    return (
        <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="tokens" stroke="#8884d8" />
        </LineChart>
    );
};

export default TokenPledgeLineChart;
