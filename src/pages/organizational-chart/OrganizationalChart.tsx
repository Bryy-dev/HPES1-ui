interface OrganizationalChartProps {}

const OrganizationalChart: React.FC<OrganizationalChartProps> = ({}) => {
    return (
        <div>
            {' '}
            <img src={'../../public/assets/images/org-chart.png'} className="max-h-full max-w-full object-contain rounded-xl p-5" alt="itemImage" />
        </div>
    );
};

export default OrganizationalChart;
