import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

const ErrorMsg = ({
    title = 'Something went wrong',
    message = 'We encountered an unexpected error. Please try again.',
    onRetry = null,
    onGoHome = null,
    type = 'error', // "error", "warning", "network"
}) => {
    const getIcon = () => {
        switch (type) {
            case 'network':
                return <AlertTriangle className="h-12 w-12 text-orange-500" />;
            case 'warning':
                return <AlertTriangle className="h-12 w-12 text-yellow-500" />;
            default:
                return <AlertTriangle className="h-12 w-12 text-red-500" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'network':
                return 'bg-orange-50 border-orange-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            default:
                return 'bg-red-50 border-red-200';
        }
    };

    return (
        <div className="flex justify-center py-12">
            <div className={`max-w-md w-full mx-4 p-8 rounded-lg border-2 ${getBgColor()} text-center`}>
                <div className="flex justify-center mb-4">{getIcon()}</div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {onRetry && (
                        <button
                            onClick={onRetry}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                        </button>
                    )}

                    {onGoHome && (
                        <button
                            onClick={onGoHome}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            <Home className="h-4 w-4 mr-2" />
                            Go Home
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorMsg;
