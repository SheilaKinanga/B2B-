import {
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Activity,
  Clock,
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const kpiCards = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$2,456,890',
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      bgColor: 'kpi-bg-blue',
      iconColor: 'kpi-icon-blue',
    },
    {
      id: '2',
      title: 'Production Output',
      value: '15,842',
      change: '+8.2%',
      isPositive: true,
      icon: TrendingUp,
      bgColor: 'kpi-bg-green',
      iconColor: 'kpi-icon-green',
    },
    {
      id: '3',
      title: 'Inventory Value',
      value: '$842,340',
      change: '-3.1%',
      isPositive: false,
      icon: Package,
      bgColor: 'kpi-bg-orange',
      iconColor: 'kpi-icon-orange',
    },
    {
      id: '4',
      title: 'Active Orders',
      value: '342',
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      bgColor: 'kpi-bg-purple',
      iconColor: 'kpi-icon-purple',
    },
    {
      id: '5',
      title: 'Production Efficiency',
      value: '94.2%',
      change: '+2.4%',
      isPositive: true,
      icon: Activity,
      bgColor: 'kpi-bg-teal',
      iconColor: 'kpi-icon-teal',
    },
    {
      id: '6',
      title: 'Average Lead Time',
      value: '4.2 days',
      change: '-1.2 days',
      isPositive: true,
      icon: Clock,
      bgColor: 'kpi-bg-cyan',
      iconColor: 'kpi-icon-cyan',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Monitor your manufacturing operations in real-time</p>
      </div>

      <div className="kpi-grid">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="kpi-card">
              <div className="kpi-content">
                <div>
                  <p className="kpi-title">{card.title}</p>
                  <p className="kpi-value">{card.value}</p>
                  <div className="kpi-change">
                    <span
                      className={
                        card.isPositive ? 'positive' : 'negative'
                      }
                    >
                      {card.change}
                    </span>
                    <span className="muted">vs last month</span>
                  </div>
                </div>
                <div className={`kpi-icon ${card.bgColor}`}>
                  <Icon className={card.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bottom-grid">
        <div className="card">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {[
              { action: 'New order received', details: 'Order #ORD-2847', time: '2 minutes ago' },
              { action: 'Production batch completed', details: 'Batch #BTH-5621', time: '15 minutes ago' },
              { action: 'Inventory restock alert', details: 'SKU #PRD-9432', time: '1 hour ago' },
              { action: 'Quality inspection passed', details: 'Batch #BTH-5610', time: '2 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="dot"></span>
                <div>
                  <p className="activity-title">{activity.action}</p>
                  <p className="activity-details">{activity.details}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Production Status</h3>
          {[
            { name: 'Assembly Line A', progress: 85, status: 'On Track' },
            { name: 'Assembly Line B', progress: 92, status: 'On Track' },
            { name: 'Assembly Line C', progress: 68, status: 'Delayed' },
            { name: 'Assembly Line D', progress: 100, status: 'Completed' },
          ].map((line, index) => (
            <div key={index} className="progress-block">
              <div className="progress-header">
                <span>{line.name}</span>
                <span className={`status ${line.status.toLowerCase().replace(' ', '-')}`}>
                  {line.status}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${line.status.toLowerCase()}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
