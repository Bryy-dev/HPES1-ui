import { useQuery } from '@tanstack/react-query';
import NewsAndEventsService from '../../services/newsAndEvent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewsAndEventsModel } from '../../models/news&EventsModel';
import { dateToString } from '../../components/helper/dateFormmater';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Loading from '../../components/loader';
import ErrorMsg from '../../components/ErrorMsg';
interface FullDetailsProps {}

const FullDetails: React.FC<FullDetailsProps> = ({}) => {
    const { id, title } = useParams();
    const newsAndEventsService = NewsAndEventsService();
    console.log(id, title);
    const [dataDetails, setDataDetails] = useState<NewsAndEventsModel>();
    const {
        data: apiData,
        refetch: refetchData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['details'],
        queryFn: () => newsAndEventsService.fetchById(Number(id)),
    });

    useEffect(() => {
        if (apiData && apiData.data) {
            setDataDetails(apiData.data);
        }
    }, [apiData?.data]);
    console.log(dataDetails);

    const [open, setOpen] = useState(false);

    return (
        <div className="lg:panel px-5 lg:px-10">
            {isLoading && <Loading />}
            {isError && <ErrorMsg />}
            {apiData && apiData.data && (
                <div>
                    <div className="mb-5 flex justify-between">
                        <h2 className="lg:text-3xl text-xl font-black text-gray-800 dark:text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">{dataDetails?.title}</span>
                        </h2>
                    </div>
                    <div className="flex items-center justify-center gap-2 py-5">
                        {dataDetails?.images.slice(0, 2).map((data, index) => {
                            const isSecondImage = index === 1;
                            const moreCount = dataDetails.images.length - 2;
                            const eventDate = new Date(dataDetails.date);
                            const formattedDate = eventDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            });
                            const year = eventDate.getFullYear();

                            return (
                                <div key={index} className="relative">
                                    <div className="absolute top-2 left-2 bg-white rounded-lg overflow-hidden shadow-lg">
                                        <div className="bg-indigo-600 text-white text-center py-1 px-3 text-xs font-bold">{year}</div>
                                        <div className="py-2 px-3 text-center">
                                            <span className="block text-lg font-bold text-gray-900">{formattedDate}</span>
                                        </div>
                                    </div>
                                    <img
                                        src={data.dataURL}
                                        alt={`Image ${index + 1}`}
                                        className={`w-[40rem] h-[20rem] xl:h-[30rem] object-cover object-center rounded-lg hover:shadow-xl hover:cursor-pointer transition-transform duration-500 hover:scale-105 ${
                                            isSecondImage && moreCount > 0 ? 'blur-sm brightness-90' : ''
                                        }`}
                                        onClick={() => setOpen(!open)}
                                    />
                                    {isSecondImage && moreCount > 0 && (
                                        <div className="absolute inset-1 flex items-center justify-center hover:cursor-pointer hover:shadow-xl" onClick={() => setOpen(!open)}>
                                            <span className="text-white xl:text-2xl font-bold bg-black bg-opacity-60 px-4 py-2 rounded-full">+{moreCount} more</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={dataDetails?.images?.map((url, index) => ({
                                src: url.dataURL,
                                title: `${dataDetails.title} `,
                                description: `${dataDetails.description}`, // Title displayed in captions
                            }))}
                            plugins={[Thumbnails, Captions, Zoom]}
                            zoom={{
                                maxZoomPixelRatio: 4, // Optional: up to 4x zoom
                                zoomInMultiplier: 2, // Optional: how much zoom per step
                            }}
                        />
                    </div>

                    <div className="py-5 lg:px-10 border-t-2 text-center">
                        <h2 className="text-base">{dataDetails?.description}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FullDetails;
