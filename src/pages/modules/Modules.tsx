import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { showPromiseNotification } from '../../components/notifications/notifications';
import ModuleService from '../../services/moduleService';
import { modulesData } from '../../data/moduleSample';

// Import modern icons
import { Download, Search, ChevronLeft, ChevronRight, BookOpen, Calendar, Filter } from 'lucide-react';

interface ModulesProps {}

const Modules: React.FC<ModulesProps> = () => {
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        gradeLevel: '',
        subject: '',
        week: '',
    });

    const totalPages = Math.ceil(modulesData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentModules = modulesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // Scroll to top of results
            document.getElementById('results-container')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const apiService = ModuleService();
    const {
        data: apiData,
        refetch: refetchApiData,
        isLoading,
    } = useQuery({
        queryKey: ['api'],
        queryFn: () => apiService.fetch(),
        staleTime: 0,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement filtering logic here
        refetchApiData();
    };

    const download = async (data: any) => {
        const filename = `${data.week}-${data.subject}-${data.topic}-${data.level}-Module.pdf`;
        const fileUrl = data.pdf_url;

        const downloadPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error('Network response was not ok');

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        showPromiseNotification(
            downloadPromise,
            {
                pending: 'Downloading Module...',
                success: 'Download complete!',
                error: 'Download failed!',
            },
            {
                theme: 'light',
                position: 'top-right',
            }
        );
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm px-40">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Educational Modules</h2>
                <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-medium">{apiData?.data.length || 0} Available</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-700 dark:text-gray-200">Filter Modules</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade Level</label>
                            <select
                                name="gradeLevel"
                                value={filters.gradeLevel}
                                onChange={handleFilterChange}
                                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="">All Grade Levels</option>
                                <option value="1">Grade 1</option>
                                <option value="2">Grade 2</option>
                                <option value="3">Grade 3</option>
                                <option value="4">Grade 4</option>
                                <option value="5">Grade 5</option>
                                <option value="6">Grade 6</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                            <select
                                name="subject"
                                value={filters.subject}
                                onChange={handleFilterChange}
                                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="">All Subjects</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Filipino">Filipino</option>
                                <option value="Araling Panlipunan">Araling Panlipunan</option>
                                <option value="TLE">TLE</option>
                                <option value="MAPEH">MAPEH</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Week</label>
                            <select
                                name="week"
                                value={filters.week}
                                onChange={handleFilterChange}
                                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            >
                                <option value="">All Weeks</option>
                                <option value="WEEK 1">WEEK 1</option>
                                <option value="WEEK 2">WEEK 2</option>
                                <option value="WEEK 3">WEEK 3</option>
                                <option value="WEEK 4">WEEK 4</option>
                                <option value="WEEK 5">WEEK 5</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm">
                            <Search className="h-4 w-4" />
                            <span>Filter Results</span>
                        </button>
                    </div>
                </form>
            </div>

            <div id="results-container" className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : apiData?.data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-30" />
                        <p className="text-lg font-medium">No modules found</p>
                        <p className="text-sm">Try adjusting your filters to find what you're looking for</p>
                    </div>
                ) : (
                    apiData?.data.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all transform hover:translate-y-px"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 py-1 px-2 rounded-full">{item.week}</span>
                                        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{item.subject}</h3>
                                    </div>

                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.topic}</h4>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>

                                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            {new Date(item.discussion_date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="md:self-end">
                                    <button
                                        type="button"
                                        onClick={() => download(item)}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {apiData?.data.length > 0 && (
                <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-1">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>

                        <div className="flex space-x-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`
                    w-10 h-10 flex items-center justify-center rounded-lg transition-colors
                    ${currentPage === page ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg enabled:hover:bg-gray-100 dark:enabled:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Modules;
