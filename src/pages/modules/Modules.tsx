import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { itemImages } from '../../data/ItemImages';
import { faCancel, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { modulesData } from '../../data/moduleSample';
import { useState } from 'react';

interface ModulesProps {}

const Modules: React.FC<ModulesProps> = ({}) => {
    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(modulesData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentModules = modulesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="panel">
            {/* {itemImages.map((item) => {
                return (
                    <li key={item.id} className="mb-2.5 cursor-grab">
                        <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center">
                            <div className="ltr:sm:mr-4 rtl:sm:ml-4">
                                <img alt="avatar" src={`/assets/images/profile-${item.src}.jpeg`} className="w-11 h-11 rounded-full mx-auto" />
                            </div>
                            <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                <div className="font-semibold md:my-0 my-3">
                                    <div className="text-dark dark:text-[#bfc9d4] text-base">{item.description}</div>
                                    <div className="text-white-dark text-xs">{item.title}</div>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-secondary btn-sm px-5 py-2">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })} */}

            <h2 className="header-text mb-5">Modules</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-1 gap-2 flex items-center mx-40 mb-5">
                    <div className="col-span-3">
                        <label>Grade Level</label>
                        <select className="form-input">
                            <option value="">Choose Grade Level</option>
                            <option value="1">Grade 1</option>
                            <option value="2">Grade 2</option>
                            <option value="3">Grade 3</option>
                            <option value="4">Grade 4</option>
                            <option value="5">Grade 5</option>
                            <option value="6">Grade 7</option>
                        </select>
                    </div>

                    <div className="col-span-3">
                        <label>Subject</label>
                        <select className="form-input">
                            <option value="">Choose Subject</option>
                            <option value="1">Mathematics</option>
                            <option value="2">Filipino</option>
                            <option value="3">Araling Panlipunan</option>
                            <option value="4">TLE</option>
                            <option value="5">MAPEH</option>
                        </select>
                    </div>

                    <div className="col-span-3">
                        <label>Week</label>
                        <select className="form-input">
                            <option value="">Choose Week</option>
                            <option value="1">WEEK 1</option>
                            <option value="2">WEEK 2</option>
                            <option value="3">WEEK 3</option>
                            <option value="4">WEEK 4</option>
                            <option value="5">WEEK 5</option>
                        </select>
                    </div>
                    <div className="">
                        <button type="submit" className="btn btn-info btn-sm">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <div className="pt-5 mx-40">
                {currentModules.map((item) => (
                    <ul key={item.id}>
                        <li>
                            <div className="bg-white dark:bg-[#1b2e4b] rounded-md border border-white-light dark:border-dark px-6 py-3.5 flex md:flex-row flex-col ltr:md:text-left rtl:md:text-right text-center items-md-center mb-2">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 flex items-center">
                                    <h2 className="font-bold text-gray-400">{`${item.week}:`}</h2>
                                </div>
                                <div className="flex md:flex-row flex-col justify-between items-center flex-1">
                                    <div className="font-semibold md:my-0 my-3">
                                        <div className="text-dark dark:text-[#bfc9d4] text-lg font-black text-blue-500">{item.Subject}</div>
                                        <div className="text-gray-800 dark:text-[#bfc9d4] text-sm font-bold">{item.lesson}</div>
                                        <div className="text-gray-500 text-xs">{item.description}</div>
                                        <div className="text-gray-400 text-xs">{item.date}</div>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-dark btn-sm px-5 py-2">
                                            <FontAwesomeIcon icon={faDownload} />
                                            <span className="ps-2">Download</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-2">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50  font-black">
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => goToPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 '}`}>
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50 font-black">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modules;
