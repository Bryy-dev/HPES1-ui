import clsx from 'clsx';

const sizeMap = {
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
};

interface HeaderProps {
    title: string;
    className?: string;
    size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    tabletSize?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    mobileSize?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    desktopSize?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    defaultSize?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
}

const ComponentHeader: React.FC<HeaderProps> = ({ title, size, desktopSize, tabletSize, mobileSize, defaultSize = '3xl', className }) => {
    return (
        <div className="mb-4">
            <h2
                className={clsx(
                    'font-black text-gray-800 dark:text-white relative inline-block',
                    sizeMap[defaultSize],
                    mobileSize && sizeMap[mobileSize],
                    tabletSize && `md:${sizeMap[tabletSize]}`,
                    desktopSize && `lg:${sizeMap[desktopSize]}`,
                    className
                )}
            >
                <span className="page-header">{title}</span>
                <span className="block mt-1 w-1/3 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></span>
            </h2>
        </div>
    );
};

export default ComponentHeader;
