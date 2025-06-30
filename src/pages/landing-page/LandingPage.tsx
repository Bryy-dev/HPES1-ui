import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { isCancelledError, useQuery } from '@tanstack/react-query';
import NewsAndEventsService from '../../services/newsAndEvent';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../components/helper/slugify';
import Loading from '../../components/loader';
import ErrorMsg from '../../components/ErrorMsg';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
    const navigate = useNavigate();
    const apiService = NewsAndEventsService();
    const events = [
        // Regular Holidays
        { title: "New Year's Day", date: '2025-01-01', color: '#4f46e5' },
        { title: 'Araw ng Kagitingan (Day of Valor)', date: '2025-04-09', color: '#4f46e5' },
        { title: 'Maundy Thursday', date: '2025-04-17', color: '#4f46e5' },
        { title: 'Good Friday', date: '2025-04-18', color: '#4f46e5' },
        { title: 'Labor Day', date: '2025-05-01', color: '#4f46e5' },
        { title: 'Independence Day', date: '2025-06-12', color: '#4f46e5' },
        { title: 'National Heroes Day', date: '2025-08-25', color: '#4f46e5' },
        { title: 'Bonifacio Day', date: '2025-11-30', color: '#4f46e5' },
        { title: 'Christmas Day', date: '2025-12-25', color: '#4f46e5' },
        { title: 'Rizal Day', date: '2025-12-30', color: '#4f46e5' },

        // Special (Non-Working) Days
        { title: 'Chinese New Year', date: '2025-01-29', color: '#8b5cf6' },
        { title: 'Black Saturday', date: '2025-04-19', color: '#8b5cf6' },
        { title: 'Ninoy Aquino Day', date: '2025-08-21', color: '#8b5cf6' },
        { title: "All Saints' Day", date: '2025-11-01', color: '#8b5cf6' },
        { title: 'Feast of the Immaculate Conception', date: '2025-12-08', color: '#8b5cf6' },
        { title: 'Christmas Eve', date: '2025-12-24', color: '#8b5cf6' },
        { title: 'Last Day of the Year', date: '2025-12-31', color: '#8b5cf6' },

        // Special (Working) Day
        { title: 'EDSA People Power Revolution Anniversary', date: '2025-02-25', color: '#a855f7' },

        // Islamic Holidays (subject to moon sighting)
        { title: "Eid'l Fitr", date: '2025-04-01', color: '#ec4899' },
        { title: "Eid'l Adha", date: '2025-06-07', color: '#ec4899' },

        // School No-Class Days
        { title: 'Start of Christmas Break', date: '2024-12-21', color: '#f43f5e' },
        { title: 'End of Christmas Break', date: '2025-01-01', color: '#f43f5e' },
        { title: 'End of School Year', date: '2025-04-15', color: '#f43f5e' },
    ];

    const {
        data: apiData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['api'],
        queryFn: () => apiService.landingFetchAll(),
    });

    const {
        data: apiCalendarData,
        isLoading: isLoadingCalendar,
        isError: calendarError,
    } = useQuery({
        queryKey: ['api2'],
        queryFn: () => apiService.getCalendarEvent(),
    });

    const calendarEvent = apiData?.data
        .filter((item) => item.type === 'event')
        .map((item, index) => {
            return {
                title: item.title,
                date: item.date,
            };
        });

    return (
        <div className="">
            {isLoading && isLoadingCalendar && <Loading />}
            {isError && calendarError && <ErrorMsg />}

            {apiData && apiCalendarData && apiCalendarData.data && apiData.data && (
                <div>
                    {/*  News Section */}
                    <section className=" mb-5 bg-white border rounded-xl shadow-lg ">
                        <div className="flex items-center justify-between lg:px-6 px-4 py-7">
                            {/* component header */}
                            <div className="">
                                <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white">
                                    <span className="page-header">Latest News</span>
                                </h2>
                            </div>
                            {/* Carousel Navigation */}
                            <div className="flex space-x-2">
                                <button className="swiper-button-prev-news border-2 text-dark  rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                                <button className="swiper-button-next-news bg-white border-2 text-dark  rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                                navigation={{
                                    nextEl: '.swiper-button-next-news',
                                    prevEl: '.swiper-button-prev-news',
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                effect="fade"
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                className="h-[35rem] md:h-[40rem] overflow-hidden rounded-b-xl"
                            >
                                {apiData?.data.slice(0, 5).map((item, i) => {
                                    const date = new Date(item.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    });
                                    const slugified = slugify(item.title);

                                    return (
                                        <SwiperSlide key={i} className="">
                                            <div className="relative h-full w-full group bg-cover bg-center bg-no-repeat rounded-2xl" style={{ backgroundImage: `url(${item.url})` }}>
                                                {/* Blurry background overlay */}
                                                <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-0"></div>

                                                {/* Foreground image */}
                                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                                    <img src={item.url} className="max-h-full max-w-full object-contain  " alt={`News item ${i + 1}`} />
                                                </div>

                                                {/* Gradient overlay (optional, above bg) */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-20"></div>

                                                {/* Content */}
                                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-30">
                                                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold bg-indigo-600 rounded-full">{date}</div>
                                                    <h3 className="text-base md:text-3xl font-bold mb-2 line-clamp-2">{item.title || `Featured News ${i + 1}`}</h3>
                                                    <p className="text-xs md:text-base text-gray-200 line-clamp-2 mb-4 max-w-2xl">
                                                        {item.description || 'Click to read more about this important announcement and stay updated with the latest campus news.'}
                                                    </p>
                                                    <button
                                                        className="px-5 py-2 bg-white text-indigo-700 rounded-lg font-medium text-sm hover:bg-gray-100 transition transform group-hover:translate-x-1"
                                                        onClick={() => navigate(`/event/${item.id}/${slugified}`)}
                                                    >
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </section>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Events Section */}
                        <section className="lg:col-span-5  flex flex-col gap-2">
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden border">
                                <div className="px-6 pt-4 pb-1">
                                    <h2 className="lg:text-2xl md:text-xl sm:text-lg text-2xl font-black text-gray-800 dark:text-white sm:text-start text-center">
                                        <span className="page-header">Events</span>
                                    </h2>
                                </div>

                                <div className="p-2">
                                    <Swiper
                                        modules={[Navigation, Pagination, Autoplay]}
                                        navigation={{
                                            nextEl: '.swiper-button-next-events',
                                            prevEl: '.swiper-button-prev-events',
                                        }}
                                        pagination={{
                                            clickable: true,
                                            dynamicBullets: true,
                                        }}
                                        autoplay={{
                                            delay: 6000,
                                            disableOnInteraction: false,
                                        }}
                                        spaceBetween={16}
                                        slidesPerView={1}
                                        className="event-swiper rounded-2xl overflow-hidden"
                                    >
                                        {apiData?.data
                                            .slice(0, 5)
                                            .filter((data) => data.type === 'event')
                                            .map((item, i) => {
                                                const eventDate = new Date(item.date);
                                                const formattedDate = eventDate.toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                });
                                                const year = eventDate.getFullYear();

                                                return (
                                                    <SwiperSlide key={i}>
                                                        <div className="relative rounded-2xl overflow-hidden group">
                                                            {/* Event card with modern design */}
                                                            <div className="h-80 relative">
                                                                <img
                                                                    src={item.url}
                                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                    alt={`Event ${i + 1}`}
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                                            </div>

                                                            {/* Date badge */}
                                                            <div className="absolute top-4 left-4 bg-white rounded-lg overflow-hidden shadow-lg">
                                                                <div className="bg-indigo-600 text-white text-center py-1 px-3 text-xs font-bold">{year}</div>
                                                                <div className="py-2 px-3 text-center">
                                                                    <span className="block text-lg font-bold text-gray-900">{formattedDate}</span>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                                                <h3 className="text-xl font-bold mb-2">{item.title || `Featured Event ${i + 1}`}</h3>
                                                                <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                                                                    {item.description || "Join us for this exciting campus event. Don't miss out!"}
                                                                </p>
                                                                <div className="flex items-center text-xs">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16"
                                                                        height="16"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="mr-1"
                                                                    >
                                                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                                    </svg>
                                                                    <span>Campus Center</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                    </Swiper>
                                </div>

                                {/* Navigation buttons for events */}
                                <div className="px-6 py-4 flex justify-between">
                                    <button className="swiper-button-prev-events text-gray-500 hover:text-indigo-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                    </button>
                                    <button className="text-indigo-600 text-sm font-medium hover:underline" onClick={() => navigate('News&Events')}>
                                        View All Events
                                    </button>
                                    <button className="swiper-button-next-events text-gray-500 hover:text-indigo-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden border py-5 mt-2">
                                <div className="px-6 ">
                                    <h2 className="text-2xl font-black text-gray-800 dark:text-white ">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Quick Downloads</span>
                                    </h2>
                                </div>
                                <div className="px-4 py-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <a
                                            href="/downloads/student-handbook.pdf"
                                            download
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all hover:bg-indigo-50 dark:hover:bg-gray-600 hover:shadow-md"
                                        >
                                            <div className="rounded-lg bg-indigo-100 p-3 mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-indigo-600"
                                                >
                                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">Student Handbook</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 2.4 MB</p>
                                            </div>
                                        </a>

                                        <a
                                            href="/downloads/school-calendar.pdf"
                                            download
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all hover:bg-indigo-50 dark:hover:bg-gray-600 hover:shadow-md"
                                        >
                                            <div className="rounded-lg bg-indigo-100 p-3 mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-indigo-600"
                                                >
                                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">School Calendar 2024–2025</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 1.8 MB</p>
                                            </div>
                                        </a>

                                        <a
                                            href="/downloads/enrollment-form.pdf"
                                            download
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all hover:bg-indigo-50 dark:hover:bg-gray-600 hover:shadow-md"
                                        >
                                            <div className="rounded-lg bg-indigo-100 p-3 mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-indigo-600"
                                                >
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                    <polyline points="14 2 14 8 20 8"></polyline>
                                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                                    <polyline points="10 9 9 9 8 9"></polyline>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">Enrollment Form</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 845 KB</p>
                                            </div>
                                        </a>

                                        <a
                                            href="/downloads/code-of-conduct.pdf"
                                            download
                                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-all hover:bg-indigo-50 dark:hover:bg-gray-600 hover:shadow-md"
                                        >
                                            <div className="rounded-lg bg-indigo-100 p-3 mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-indigo-600"
                                                >
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 dark:text-white">Code of Conduct</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 1.2 MB</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Right Column: Calendar and Downloadables */}
                        <section className="lg:col-span-7 space-y-8">
                            {/* Calendar */}
                            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md overflow-hidden border">
                                <div className="px-6 py-5">
                                    <h2 className="text-2xl font-black text-gray-800 dark:text-white ">
                                        <span className="page-header">Academic Calendar</span>
                                    </h2>
                                </div>
                                <div className="calendar-wrapper px-4 text-dark">
                                    <FullCalendar
                                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={{
                                            left: `${window.innerWidth > 768 ? 'prev,next today' : 'title'}`,
                                            center: `${window.innerWidth < 768 ? 'prev,next today' : 'title'}`,
                                            right: `${window.innerWidth > 768 ? 'dayGridMonth' : ''}`,
                                        }}
                                        // height={450}
                                        events={apiCalendarData?.data}
                                        displayEventTime={false}
                                        eventClassNames="rounded-lg px-2"
                                        dayMaxEventRows={0}
                                        moreLinkContent={(arg) => `${arg.num === 1 ? 'Event' : 'Events'} (${arg.num})`}
                                        moreLinkClassNames={['px-3', 'py-1', 'rounded-full', 'bg-cyan-200', 'text-gray-900', 'text-xs', 'font-bold', 'hover:bg-indigo-200']}
                                        eventClick={(info) => {
                                            const eventId = info.event.id;
                                            const slugified = slugify(info.event._def.title);
                                            navigate(`/event/${eventId}/${slugified}`);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Downloadables */}
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
