import React, { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { itemImages } from '../../data/ItemImages';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
    const calendarRef = useRef<any>(null);

    const events = [
        // Regular Holidays
        { title: "New Year's Day", date: '2025-01-01' },
        { title: 'Araw ng Kagitingan (Day of Valor)', date: '2025-04-09' },
        { title: 'Maundy Thursday', date: '2025-04-17' },
        { title: 'Good Friday', date: '2025-04-18' },
        { title: 'Labor Day', date: '2025-05-01' },
        { title: 'Independence Day', date: '2025-06-12' },
        { title: 'National Heroes Day', date: '2025-08-25' },
        { title: 'Bonifacio Day', date: '2025-11-30' },
        { title: 'Christmas Day', date: '2025-12-25' },
        { title: 'Rizal Day', date: '2025-12-30' },

        // Special (Non-Working) Days
        { title: 'Chinese New Year', date: '2025-01-29' },
        { title: 'Black Saturday', date: '2025-04-19' },
        { title: 'Ninoy Aquino Day', date: '2025-08-21' },
        { title: "All Saints' Day", date: '2025-11-01' },
        { title: 'Feast of the Immaculate Conception', date: '2025-12-08' },
        { title: 'Christmas Eve', date: '2025-12-24' },
        { title: 'Last Day of the Year', date: '2025-12-31' },

        // Special (Working) Day
        { title: 'EDSA People Power Revolution Anniversary', date: '2025-02-25' },

        // Islamic Holidays (subject to moon sighting)
        { title: "Eid'l Fitr", date: '2025-04-01' }, // Tentative
        { title: "Eid'l Adha", date: '2025-06-07' }, // Tentative

        // School No-Class Days
        { title: 'Start of Christmas Break', date: '2024-12-21' },
        { title: 'End of Christmas Break', date: '2025-01-01' },
        { title: 'End of School Year', date: '2025-04-15' },
    ];

    return (
        //main panel
        <div className="pc:grid grid-cols-8 gap-3">
            <div className="col-span-8 panel">
            <div className="">
                    <h2 className="header-text">News </h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{ nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' }}
                        pagination={{ clickable: true }}
                        className="swiper max-w-7xl mx-auto mb-5"
                        id="slider2"
                    >
                        <div className="swiper-wrapper">
                            {itemImages.map((item, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="h-[40rem] w-full relative overflow-hidden p-7 " style={{ backgroundImage: `url(${item.src})` }}>
                                            {/* Blurred background */}
                                            <div className="absolute inset-0 bg-cover bg-center blur-sm brightness-75 z-0" style={{ backgroundImage: `url(${item.src})` }}></div>
                                            {/* Upper text */}
                                            <div className="absolute top-0 left-0 w-full p-5 z-20">
                                                <div className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-md inline-block">{item.date}</div>
                                            </div>

                                            {/* Clear foreground image */}
                                            <div className="relative h-full w-full flex justify-center items-center z-10">
                                                <img src={item.src} className="max-h-full max-w-full object-contain rounded-2xl" alt="itemImage" />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </div>
                    </Swiper>
                </div>
               
            </div>
            {/* left side panel */}
            <div className="col-span-4 panel">
                <div className="">
                    <h2 className="header-text">Events</h2>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation={{ nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' }}
                        pagination={{ clickable: true }}
                        className="swiper max-w-3xl mx-auto mb-5"
                        id="slider2"
                    >
                        <div className="swiper-wrapper">
                            {itemImages.map((item, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="h-[40rem] w-full relative overflow-hidden p-7 " style={{ backgroundImage: `url(${item.src})` }}>
                                            {/* Blurred background */}
                                            <div className="absolute inset-0 bg-cover bg-center blur-sm brightness-75 z-0" style={{ backgroundImage: `url(${item.src})` }}></div>
                                            {/* Upper text */}
                                            <div className="absolute top-0 left-0 w-full p-5 z-20">
                                                <div className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-md inline-block">{item.date}</div>
                                            </div>

                                            {/* Clear foreground image */}
                                            <div className="relative h-full w-full flex justify-center items-center z-10">
                                                <img src={item.src} className="max-h-full max-w-full object-contain rounded-2xl" alt="itemImage" />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </div>
                    </Swiper>
                </div>
            </div>

            {/* right side panel */}
            <div className="col-span-4 grid gap-2">
                <div className="panel calendar-wrapper">
                    <h2 className="header-text">Calendar</h2>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        editable={true}
                        height={500}
                        moreLinkContent={(arg) => `${arg.num} event(s)`}
                        moreLinkClassNames={[
                            'px-3',
                            'py-2', // spacing
                            'rounded-full', // pill shape
                            'bg-indigo-50', // light background
                            'text-indigo-600', // text color
                            'hover:bg-indigo-100', // hover effect
                            'font-medium', // weight
                        ]}
                        selectable={true}
                        dayMaxEvents={true}
                        droppable={true}
                        events={events}
                        dayMaxEventRows={true}
                    />
                </div>

                <div className="panel">
                    <h2 className="header-text">Downloadables</h2>
                    <ul className="download-list grid grid-cols-2">
                        <li>
                            <a href="/downloads/student-handbook.pdf" download>
                                📘 Student Handbook
                            </a>
                        </li>
                        <li>
                            <a href="/downloads/school-calendar.pdf" download>
                                📅 School Calendar 2024–2025
                            </a>
                        </li>
                        <li>
                            <a href="/downloads/enrollment-form.pdf" download>
                                📝 Enrollment Form
                            </a>
                        </li>
                        <li>
                            <a href="/downloads/code-of-conduct.pdf" download>
                                📄 Code of Conduct
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
