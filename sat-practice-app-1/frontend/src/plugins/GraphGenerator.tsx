import React from 'react';
import { Line } from 'react-chartjs-2';
import { typography, applyTypography, textColors } from '../styles/typography';

interface GraphData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
    }[];
}

interface GraphGeneratorProps {
    data: GraphData;
}

const GraphGenerator: React.FC<GraphGeneratorProps> = ({ data }) => {
    return (
        <div style={{
            background: '#fff',
            borderRadius: 20,
            padding: '32px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 16px rgba(60,72,100,0.08)'
        }}>
            <h2 style={{
                ...applyTypography(typography.heading.lg),
                color: textColors.primary,
                marginBottom: 24,
                textAlign: 'center'
            }}>Performance Graph</h2>
            <div style={{ 
                position: 'relative',
                height: '400px'
            }}>
                <Line 
                    data={data} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        family: "'Inter', sans-serif",
                                        size: 14,
                                        weight: 500
                                    },
                                    color: textColors.primary
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    font: {
                                        family: "'Inter', sans-serif",
                                        size: 12,
                                        weight: 400
                                    },
                                    color: textColors.secondary
                                }
                            },
                            y: {
                                ticks: {
                                    font: {
                                        family: "'Inter', sans-serif",
                                        size: 12,
                                        weight: 400
                                    },
                                    color: textColors.secondary
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default GraphGenerator;