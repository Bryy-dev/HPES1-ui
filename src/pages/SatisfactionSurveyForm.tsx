import { Field, Form, Formik, useFormikContext } from 'formik';
import ErrorMsg from '../components/ErrorMsg';
import Loading from '../components/loader';
import BrigadaService from '../services/brigadaService';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { showNotification } from '../components/notifications/notifications';
import SuggestionService from '../services/suggestionService';
import SurveyService from '../services/surveyService';
interface SuggestionProps {}

const SatisfactionSurveyForm: React.FC<SuggestionProps> = ({}) => {
    const [data, setData] = useState<{ name: string; email: string; suggestion: string }>({ name: '', email: '', suggestion: '' });
    const surveyService = SurveyService();
    const {
        mutateAsync: create,
        isPending,
        isError,
    } = useMutation({
        mutationKey: [''],
        mutationFn: (data: any) => surveyService.fetchAll(),
        onSuccess: () => {
            showNotification('Form submitted successfully', 'success');
            setData({ name: '', email: '', suggestion: '' });
        },
    });

    const {
        data: surveyData,
        refetch: refetchData,
        isLoading,
    } = useQuery({
        queryKey: ['survey'],
        queryFn: () => surveyService.fetchAll(),
    });
    const validationSchema = Yup.object().shape({
        suggestion: Yup.string().required('Required'),
    });
    const [onsubmit, setOnSubmit] = useState<boolean>(false);

    const guidanceQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 1) || [];
    }, [surveyData]);

    const clinicQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 2) || [];
    }, [surveyData]);

    const teacherQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 3) || [];
    }, [surveyData]);

    const adminQuestion = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 4) || [];
    }, [surveyData]);

    const supplyQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 5) || [];
    }, [surveyData]);

    const generalServicesQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 6) || [];
    }, [surveyData]);

    const canteenQuestions = useMemo(() => {
        return surveyData?.data.filter((item: any) => item.category_id === 7) || [];
    }, [surveyData]);

    return (
        <div>
            <Formik
                // key={data?.id ? data.id : null}
                enableReinitialize
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    create(values);
                }}
            >
                {({ values, setFieldValue, errors, touched, isValid, isSubmitting, resetForm }) => {
                    useEffect(() => {
                        if (isSubmitting) {
                            setOnSubmit(!onsubmit);
                        }
                    }, [isSubmitting]);

                    useEffect(() => {
                        if (!isValid) {
                            showNotification('You need to input a suggestion before you can submit', 'warning');
                        }
                    }, [onsubmit]);
                    console.log(values);
                    return (
                        <Form className="">
                            {/* Loader Overlay */}

                            {/* Modal Content */}
                            {isError && <ErrorMsg />}
                            {isPending && <Loading />}
                            {!isPending && !isError && (
                                <div className="lg:panel px-2">
                                    <div className="mb-5 lg:py-2  text-center">
                                        <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Client Satisfaction Survey Form</span>
                                        </h2>
                                    </div>

                                    <div className={'flex items-center justify-center my-2'}>
                                        <div className=" text-gray-black bg-white lg:shadow-none lg:border-none lg:rounded-none shadow-xl border rounded-lg">
                                            {/* Rating */}
                                            <div className="flex flex-col justify-center">
                                                <div className="">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Guidance / Registrar's Office</span>
                                                    </h2>
                                                    {guidanceQuestions.map((data: any, index: number) => {
                                                        const name = `c1_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">School Clinic / Health Services</span>
                                                    </h2>
                                                    {clinicQuestions.map((data: any, index: number) => {
                                                        const name = `c2_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Interactions With Teacher</span>
                                                    </h2>
                                                    {teacherQuestions.map((data: any, index: number) => {
                                                        const name = `c3_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Administrative Office / Clerk's Office</span>
                                                    </h2>
                                                    {adminQuestion.map((data: any, index: number) => {
                                                        const name = `c4_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Supply Office</span>
                                                    </h2>
                                                    {supplyQuestions.map((data: any, index: number) => {
                                                        const name = `c5_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">General Services</span>
                                                    </h2>
                                                    {generalServicesQuestions.map((data: any, index: number) => {
                                                        const name = `c6_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="lg:mt-8 mt-4">
                                                    <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Canteen Services</span>
                                                    </h2>
                                                    {canteenQuestions.map((data: any, index: number) => {
                                                        const name = `c7_q${index}`;
                                                        return (
                                                            <div className="group lg:col-span-2  lg:flex items-center lg:justify-between border rounded mb-1 py-1 px-2" key={index}>
                                                                <label className="block text-sm font-medium text-gray-700 mr-5">{`${index + 1}) ${data.question}`}</label>
                                                                <div className="flex flex-wrap gap-4  px-2 py-2">
                                                                    {[1, 2, 3, 4].map((num) => (
                                                                        <label key={num} className=" items-center space-x-2">
                                                                            <Field type="radio" name={name} value={String(num)} className="form-radio text-blue-500" />
                                                                            <span>{num}</span>
                                                                        </label>
                                                                    ))}
                                                                    <label className="flex items-center space-x-2">
                                                                        <Field type="radio" name={name} value="NA" className="form-radio text-blue-500" />
                                                                        <span>N/A</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex justify-end items-center gap-3 pt-5 mt-4 border-t border-gray-100 px-5 lg:px-0">
                                                <button
                                                    className="px-4 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        resetForm();
                                                    }}
                                                >
                                                    Clear
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center shadow-sm"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default SatisfactionSurveyForm;
