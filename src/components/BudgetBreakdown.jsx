import React from 'react';

const INR = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function BudgetBreakdown({ budget = 0, spent = 0, days = 1 }) {
  const isOverBudget = spent > budget;
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  
  // Feature 9: Category distribution logic
  const transport = spent * 0.3;
  const stay = spent * 0.4;
  const activities = spent * 0.15;
  const meals = spent * 0.15;
  
  // Calculate percentages for the Pie Chart
  const tPct = 30;
  const sPct = 30 + 40;
  const aPct = 30 + 40 + 15;

  const dailyAverage = days > 0 ? (spent / days) : spent;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
        <span>Budget Breakdown</span>
        {budget > 0 && <span style={{ fontSize: '0.9rem', color: '#714B67' }}>{INR(spent)} / {INR(budget)}</span>}
      </h2>

      {spent === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px 12px', background: '#f8f9fa', borderRadius: '12px', border: '1px dashed #ddd' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            No expenses tracked yet. Start adding activities to see your breakdown!
          </p>
        </div>
      ) : (
        <>
          {/* Feature 9: Visual Pie Chart Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', padding: '10px 0' }}>
            <div style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              background: `conic-gradient(
                #714B67 0% ${tPct}%, 
                #a06b91 ${tPct}% ${sPct}%, 
                #d4a5c9 ${sPct}% ${aPct}%, 
                #f3d8ee ${aPct}% 100%
              )`,
              boxShadow: 'inset 0 0 0 30px white', // This creates the "Donut" look
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#714B67', textAlign: 'center' }}>
                    COST<br/>RATIO
                </div>
            </div>

            {/* Feature 9: Detailed Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Transport', value: transport, color: '#714B67', icon: '✈️' },
                { label: 'Stay', value: stay, color: '#a06b91', icon: '🏨' },
                { label: 'Activities', value: activities, color: '#d4a5c9', icon: '🎟️' },
                { label: 'Meals', value: meals, color: '#f3d8ee', icon: '🍽️' },
              ].map(cat => (
                <div key={cat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: cat.color }} />
                    <span style={{ color: '#555' }}>{cat.label}</span>
                  </div>
                  <span style={{ fontWeight: 600 }}>{INR(cat.value.toFixed(0))}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feature 9: Over Budget Alert */}
          {isOverBudget && (
            <div style={{ padding: '12px', background: '#fef2f2', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #fca5a5', display: 'flex', gap: '8px' }}>
              ⚠️ Alert: Over budget by {INR(spent - budget)}
            </div>
          )}

          {/* Daily Average Insight */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 600 }}>Avg. Cost Per Day</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#714B67' }}>{INR(dailyAverage.toFixed(0))}</span>
          </div>
        </>
      )}
    </div>
  );
}