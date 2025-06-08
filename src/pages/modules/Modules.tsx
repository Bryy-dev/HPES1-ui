import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showPromiseNotification } from '../../components/notifications/notifications';
import ModuleService from '../../services/moduleService';
import { modulesData } from '../../data/moduleSample';

// Import modern icons
import { Download, Search, ChevronLeft, ChevronRight, BookOpen, Calendar, Filter } from 'lucide-react';
import { ModuleModel, ModuleSearchModel } from '../../models/moduleModel';
import { dateToString } from '../../components/helper/dateFormmater';
import { grade_level, subjects, week } from '../../components/helper/options';
import { Field, Form, Formik } from 'formik';
import { moduleSearchInitialState } from '../../states/initialStates';
import Loading from '../../components/loader';
import { capitalizeEachWord } from '../../components/helper/capitalPerWord.';

interface ModulesProps {}

const Modules: React.FC<ModulesProps> = () => {
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        gradeLevel: '',
        subject: '',
        week: '',
    });

    const [moduleData, setModuleData] = useState<ModuleModel[]>([]);
    const [moduleSearch, setModuleSearch] = useState<ModuleSearchModel>(moduleSearchInitialState);

    const totalPages = Array.isArray(moduleData) ? Math.ceil(moduleData.length / ITEMS_PER_PAGE) : 0;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentModules = Array.isArray(moduleData) ? moduleData.slice(startIndex, startIndex + ITEMS_PER_PAGE) : [];

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
        queryKey: ['apiModules'],
        queryFn: async () => await apiService.fetchAll(),
    });

    useEffect(() => {
        if (apiData?.data) {
            setModuleData(apiData.data);
        }
    }, [apiData?.data]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const { mutateAsync: search, isPending } = useMutation({
        mutationKey: [''],
        mutationFn: async (data: any) => await apiService.search(data),
        onMutate: () => {},
        onSuccess: (value: any) => {
            setModuleData(value.data);
            console.log(value);
        },
        onError: (error: any) => {},
    });

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
        <div className="lg:bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm px-8">
            <div className="lg:mb-10 mb-4 py-2">
                <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Learning Modules</span>
                </h2>
            </div>

            <div className="lg:px-40">
                <div className="panel dark:bg-gray-800 p-6 rounded-lg mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-700 dark:text-gray-200">Filter Modules</h3>
                    </div>
                    <Formik
                        // key={data?.id ? data.id : null}
                        enableReinitialize
                        initialValues={moduleSearch}
                        // validationSchema={validationSchema}
                        onSubmit={async (values, action) => {
                            const filteredParams = Object.entries(values).filter(([_, v]) => v !== '');
                            const queryString = new URLSearchParams(filteredParams).toString();
                            console.log(queryString);

                            search(queryString);
                        }}
                    >
                        {({ values, setFieldValue, errors, touched, isValid, isSubmitting }) => {
                            return (
                                <Form className="">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">Grade Level</label>
                                            <Field
                                                name="level"
                                                as="select"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                            >
                                                {grade_level.map((data, index) => (
                                                    <option value={data.key} key={index}>
                                                        {data.value}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                                            <Field
                                                name="subject"
                                                as="select"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                            >
                                                {subjects.map((data, index) => (
                                                    <option value={data.key} key={index}>
                                                        {data.value}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-gray-700">Week</label>
                                            <Field
                                                name="week"
                                                as="select"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                            >
                                                {week.map((data, index) => (
                                                    <option value={data.key} key={index}>
                                                        {data.value}
                                                    </option>
                                                ))}
                                            </Field>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center py-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                        >
                                            <Search className="h-4 w-4" />
                                            <span className="">Filter Results</span>
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>

                <div id="results-container" className="space-y-4">
                    {isLoading && <Loading />}

                    {isPending && <Loading />}

                    {currentModules?.length === 0 && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                            <BookOpen className="mx-auto h-12 w-12 mb-4 opacity-30" />
                            <p className="text-lg font-medium">No modules found</p>
                            <p className="text-sm">Try adjusting your filters to find what you're looking for</p>
                        </div>
                    )}

                    {currentModules.map((item, index) => (
                        <div
                            key={index}
                            className=" dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all transform hover:translate-y-px"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="px-2">
                                    <div className="lg:flex grid items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 py-2 px-3 rounded-full">
                                            {capitalizeEachWord(item.week)}
                                        </span>
                                        <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">{capitalizeEachWord(item.subject)}</h3>
                                    </div>

                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{item.topic}</h4>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>

                                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                        <Calendar className="h-3 w-3" />
                                        <span>{dateToString(item.discussion_date)}</span>
                                    </div>
                                </div>

                                <div className="md:self-end">
                                    <button
                                        type="button"
                                        onClick={() => download(item)}
                                        disabled={isLoading}
                                        className="px-4 py-2 text-white bg-blue-400 border hover:bg-blue-500 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span className="ps-1 pt-0.5">Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {moduleData && moduleData?.length > 0 && (
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
        </div>
    );
};

export default Modules;
