import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend} from 'recharts';
import "./TypeChart.css"

const TypeChart = ({ types, totalTypes }) => {
    const keys = Object.keys(types)
    const data = keys.map((key) => (
        {
            type: key,
            value: types[key]
        })
    )

    const COLORS = keys.map(() => "#" + Math.floor(Math.random()*16777215).toString(16))
    // console.log(COLORS)

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (percent * 100).toFixed(0)
    };
    const CustomTooltip = ({ active, payload }) => {        
        if (active) {
           return (
           <div
              className="custom-tooltip"
              style={{
                 backgroundColor: "#ffff",
                 padding: "5px",
                 border: "1px solid #cccc"
              }}
           >
              <label>{`${payload[0].name}: ${(payload[0].value / totalTypes*100).toFixed(0)}%`}</label>
           </div>
        );
     }
     return null;
  };

    return (
        <div className="pieChart" style={{ width: 400, height: 300 }}>
            <h2>Brewery Types</h2>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="type"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip content={CustomTooltip} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TypeChart;