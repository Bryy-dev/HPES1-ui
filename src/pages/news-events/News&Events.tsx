import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsAndEventsService from '../../services/newsAndEvent';
import { Calendar, ChevronRight, Expand, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../components/helper/slugify';
import Loading from '../../components/loader';
import ErrorMsg from '../../components/ErrorMsg';
import ComponentHeader from '../../components/Header';

interface NewsAndEventProps {}

const NewsAndEvents: React.FC<NewsAndEventProps> = () => {
    const [expandedItem, setExpandedItem] = useState(null);
    const newsAndEventsService = NewsAndEventsService();

    const {
        data: newsAndEventsData,
        refetch: refetchData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['listing'],
        queryFn: () => newsAndEventsService.fetchAll(),
    });
    const navigate = useNavigate();
    return (
        <div className="px-3 md:px-8 lg:py-8">
            {isLoading && <Loading />}
            {isError && <ErrorMsg />}
            {newsAndEventsData && newsAndEventsData.data && (
                <div>
                    <ComponentHeader title="News & Events" desktopSize="4xl" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {newsAndEventsData?.data.map((item) => {
                            const slugified = slugify(item.title);

                            return (
                                <div
                                    onClick={() => navigate(`/news/${item.id}/${slugified}`)}
                                    key={item.id}
                                    className={` shadow-xl h-[28rem] relative overflow-hidden hover:cursor-pointer rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                                        expandedItem === item.id ? 'col-span-3 md:row-span-2' : 'bg-white dark:bg-gray-800'
                                    }`}
                                >
                                    <div
                                        className={`
               flex flex-col 
               ${expandedItem === item.id ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}
             `}
                                    >
                                        {/* Card Top Section with Images */}
                                        <div className="relative w-full h-64 overflow-hidden border">
                                            {item.images && item.images.length > 0 ? (
                                                <>
                                                    {item.images.length === 1 ? (
                                                        <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={item.images[0].dataURL} alt={item.title} />
                                                    ) : (
                                                        <div className="w-full h-full grid grid-cols-2 gap-1">
                                                            <div className={`${expandedItem === item.id ? '' : 'h-64'} overflow-hidden`}>
                                                                <img
                                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                                    src={item.images[0].dataURL}
                                                                    alt={`${item.title} - image 1`}
                                                                />
                                                            </div>
                                                            <div className="relative overflow-hidden">
                                                                <img
                                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                                    src={item.images[1].dataURL}
                                                                    alt={`${item.title} - image 2`}
                                                                />
                                                                {item.images.length > 2 && (
                                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                                                        <span className="text-white font-medium">+{item.images.length - 2} more</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                            )}

                                            <div className="absolute top-3 right-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    <Tag size={12} className="mr-1" />
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">{item.title}</h3>

                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
                                                <div className="flex items-center">
                                                    <Calendar size={14} className="mr-1" />
                                                    {new Date(item.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>

                                            <p className={`text-gray-600 dark:text-gray-300 text-sm ${expandedItem === item.id ? '' : 'line-clamp-3'}`}>{item.description}</p>

                                            {/* Image Gallery (visible when expanded) */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {newsAndEventsData?.data.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No news or events available at this time.</p>
                </div>
            )}
        </div>
    );
};

export default NewsAndEvents;
