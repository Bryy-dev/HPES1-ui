import React from 'react';
import { itemImages } from '../../data/ItemImages';

interface NewsAndEventProps {}

const NewsAndEvents: React.FC<NewsAndEventProps> = () => {
    // Group the images by groupId
    const groupedImages = itemImages.reduce((acc, item) => {
        if (!acc[item.groupId]) acc[item.groupId] = [];
        acc[item.groupId].push(item);
        return acc;
    }, {} as Record<number, typeof itemImages>);

    return (
        <div className="panel">
            <h2 className="header-text text-center">News & Events</h2>
            <div className="grid grid-cols-3 gap-2">
                {Object.entries(groupedImages).map(([groupId, groupItems]) => {
                    const groupTitle = groupItems[0]?.title || `Event Group ${groupId}`;
                    const type = groupItems[0]?.status;
                    const date = groupItems[0]?.date;
                    return (
                        <div key={groupId}>
                            <div className="max-w-[27rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5 mb-4">
                                <div className="flex justify-between mb-5">
                                    <h6 className="text-black font-bold text-base dark:text-white-light">{groupTitle}</h6>
                                    <span className="badge bg-primary/5 text-primary py-1.5 dark:bg-primary dark:text-white">{type}</span>
                                </div>
                                <div className="flex items-center justify-start -space-x-3 rtl:space-x-reverse mb-5">
                                    {groupItems.slice(0, 3).map((item) => (
                                        <img
                                            key={item.id}
                                            className="w-32 h-32 object-cover ring-2 ring-white dark:ring-[#515365] shadow-[0_0_15px_1px_rgba(113,106,202,0.30)] dark:shadow-none"
                                            src={item.src.replace('../../public', '')}
                                            alt="event"
                                        />
                                    ))}
                                    {groupItems.length > 3 && (
                                        <span className="bg-white rounded-full px-1 py-2 text-center text-primary text-xs shadow-[0_0_20px_0_#d0d0d0] dark:shadow-none dark:bg-black dark:text-white">
                                            +{groupItems.length - 3} more
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xs mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                                </div>
                                <div className="text-right">
                                    <span className="text-secondary font-semibold text-xs">{date}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NewsAndEvents;
