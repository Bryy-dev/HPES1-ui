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

interface SurveyModel {
    // Category 1: 12 questions
    c1_q1: string;
    c1_q2: string;
    c1_q3: string;
    c1_q4: string;
    c1_q5: string;
    c1_q6: string;
    c1_q7: string;
    c1_q8: string;
    c1_q9: string;
    c1_q10: string;
    c1_q11: string;
    c1_q12: string;

    // Category 2: 10 questions
    c2_q1: string;
    c2_q2: string;
    c2_q3: string;
    c2_q4: string;
    c2_q5: string;
    c2_q6: string;
    c2_q7: string;
    c2_q8: string;
    c2_q9: string;
    c2_q10: string;

    // Category 3: 10 questions
    c3_q1: string;
    c3_q2: string;
    c3_q3: string;
    c3_q4: string;
    c3_q5: string;
    c3_q6: string;
    c3_q7: string;
    c3_q8: string;
    c3_q9: string;
    c3_q10: string;

    // Category 4: 8 questions
    c4_q1: string;
    c4_q2: string;
    c4_q3: string;
    c4_q4: string;
    c4_q5: string;
    c4_q6: string;
    c4_q7: string;
    c4_q8: string;

    // Category 5: 9 questions
    c5_q1: string;
    c5_q2: string;
    c5_q3: string;
    c5_q4: string;
    c5_q5: string;
    c5_q6: string;
    c5_q7: string;
    c5_q8: string;
    c5_q9: string;

    // Category 6: 10 questions
    c6_q1: string;
    c6_q2: string;
    c6_q3: string;
    c6_q4: string;
    c6_q5: string;
    c6_q6: string;
    c6_q7: string;
    c6_q8: string;
    c6_q9: string;
    c6_q10: string;

    // Category 7: 9 questions
    c7_q1: string;
    c7_q2: string;
    c7_q3: string;
    c7_q4: string;
    c7_q5: string;
    c7_q6: string;
    c7_q7: string;
    c7_q8: string;
    c7_q9: string;
}
const initialSurveyState: SurveyModel = {
    // Category 1
    c1_q1: '',
    c1_q2: '',
    c1_q3: '',
    c1_q4: '',
    c1_q5: '',
    c1_q6: '',
    c1_q7: '',
    c1_q8: '',
    c1_q9: '',
    c1_q10: '',
    c1_q11: '',
    c1_q12: '',

    // Category 2
    c2_q1: '',
    c2_q2: '',
    c2_q3: '',
    c2_q4: '',
    c2_q5: '',
    c2_q6: '',
    c2_q7: '',
    c2_q8: '',
    c2_q9: '',
    c2_q10: '',

    // Category 3
    c3_q1: '',
    c3_q2: '',
    c3_q3: '',
    c3_q4: '',
    c3_q5: '',
    c3_q6: '',
    c3_q7: '',
    c3_q8: '',
    c3_q9: '',
    c3_q10: '',

    // Category 4
    c4_q1: '',
    c4_q2: '',
    c4_q3: '',
    c4_q4: '',
    c4_q5: '',
    c4_q6: '',
    c4_q7: '',
    c4_q8: '',

    // Category 5
    c5_q1: '',
    c5_q2: '',
    c5_q3: '',
    c5_q4: '',
    c5_q5: '',
    c5_q6: '',
    c5_q7: '',
    c5_q8: '',
    c5_q9: '',

    // Category 6
    c6_q1: '',
    c6_q2: '',
    c6_q3: '',
    c6_q4: '',
    c6_q5: '',
    c6_q6: '',
    c6_q7: '',
    c6_q8: '',
    c6_q9: '',
    c6_q10: '',

    // Category 7
    c7_q1: '',
    c7_q2: '',
    c7_q3: '',
    c7_q4: '',
    c7_q5: '',
    c7_q6: '',
    c7_q7: '',
    c7_q8: '',
    c7_q9: '',
};

const SatisfactionSurveyForm: React.FC<SuggestionProps> = ({}) => {
    const [data, setData] = useState<SurveyModel>(initialSurveyState);
    const [step, setStep] = useState<number>(1);
    const surveyService = SurveyService();
    const {
        mutateAsync: create,
        isPending,
        isError,
    } = useMutation({
        mutationKey: [''],
        mutationFn: (data: any) => surveyService.insert(data),
        onSuccess: () => {
            showNotification('Form submitted successfully', 'success');
            setData(initialSurveyState);
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

    const generateSurveyValidationSchema = () => {
        const schemaFields: Record<string, Yup.StringSchema> = {};

        const categories = {
            c1: 12,
            c2: 10,
            c3: 10,
            c4: 8,
            c5: 9,
            c6: 10,
            c7: 9,
        };

        for (const [category, count] of Object.entries(categories)) {
            for (let i = 1; i <= count; i++) {
                const fieldName = `${category}_q${i}`;
                schemaFields[fieldName] = Yup.string().required('Required');
            }
        }

        return Yup.object().shape(schemaFields);
    };

    const validationSchema = generateSurveyValidationSchema();

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

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    interface SurveyAnswer {
        category_id: string;
        question_id: string;
        answer: string;
    }

    return (
        <div>
            <Formik
                // key={data?.id ? data.id : null}
                enableReinitialize
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    const transformed = Object.entries(values).map(([key, answer]) => {
                        const [catRaw, quesRaw] = key.split('_'); // e.g., "c1_q2"
                        const category_id = parseInt(catRaw.replace('c', ''), 10); // "c1" → 1
                        const question_id = parseInt(quesRaw.replace('q', ''), 10); // "q2" → 2

                        return {
                            category_id,
                            question_id,
                            answer,
                        };
                    });
                    console.log(transformed);
                    create(transformed);
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
                            showNotification('Please rate questions before submitting', 'warning');
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
                                <div className="lg:panel">
                                    <div className="">
                                        <div className="mb-5 lg:py-2 text-center">
                                            <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white">
                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Client Satisfaction Survey Form</span>
                                            </h2>
                                        </div>

                                        <div className={'flex items-center justify-center my-2'}>
                                            <div className=" text-gray-black">
                                                {/* Rating */}
                                                <div className="flex flex-col justify-center">
                                                    {step == 1 && (
                                                        <div className="px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5 ">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white  ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">Guidance / Registrar's Office</span>
                                                            </h2>
                                                            {guidanceQuestions.map((data: any, index: number) => {
                                                                const name = `c1_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 2 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">School Clinic / Health Services</span>
                                                            </h2>
                                                            {clinicQuestions.map((data: any, index: number) => {
                                                                const name = `c2_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 3 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Interactions With Teacher</span>
                                                            </h2>
                                                            {teacherQuestions.map((data: any, index: number) => {
                                                                const name = `c3_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 4 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5 ">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">
                                                                    Administrative Office / Clerk's Office
                                                                </span>
                                                            </h2>
                                                            {adminQuestion.map((data: any, index: number) => {
                                                                const name = `c4_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 5 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5 ">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">Supply Office</span>
                                                            </h2>
                                                            {supplyQuestions.map((data: any, index: number) => {
                                                                const name = `c5_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 6 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5 ">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">General Services</span>
                                                            </h2>
                                                            {generalServicesQuestions.map((data: any, index: number) => {
                                                                const name = `c6_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between px-4 rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}

                                                    {step == 7 && (
                                                        <div className="lg:mt-8 mt-4 px-4">
                                                            <div className=" max-w-2xl pt-2 mb-5 ">
                                                                <h2>
                                                                    <b>Instructions:</b> Please indicate your level of satisfaction with the services provided by the office by checking the box that
                                                                    best represents your experience.
                                                                </h2>

                                                                <div className="flex flex-col">
                                                                    <p>Scale:</p>
                                                                    <p>4 – Very Satisfied</p>
                                                                    <p>3 – Satisfied</p>
                                                                    <p>2 – Slightly Satisfied</p>
                                                                    <p>1 – Not Satisfied</p>
                                                                    <p>NA if not applicable with the service availed</p>
                                                                </div>
                                                            </div>
                                                            <h2 className="lg:text-xl text-lg font-black text-gray-800 dark:text-white ">
                                                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500 ">Canteen Services</span>
                                                            </h2>
                                                            {canteenQuestions.map((data: any, index: number) => {
                                                                const name = `c7_q${index + 1}`;
                                                                return (
                                                                    <div className="group lg:col-span-2  lg:flex items-center lg:justify-between  rounded mb-1 py-1 px-2" key={index}>
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
                                                    )}
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex justify-end items-center gap-1 pt-5 mt-4 border-t border-gray-100 px-5 lg:px-0">
                                                    <button
                                                        className="px-6 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            resetForm();
                                                        }}
                                                    >
                                                        Clear
                                                    </button>
                                                    <button
                                                        className="px-6 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100  rounded-lg transition-colors duration-200 text-sm font-medium flex items-center shadow-sm"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setStep(step - 1);
                                                            goToTop();
                                                        }}
                                                        disabled={step == 1}
                                                    >
                                                        Back
                                                    </button>

                                                    {step == 7 ? (
                                                        <button
                                                            type="submit"
                                                            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center shadow-sm"
                                                        >
                                                            Submit
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center shadow-sm"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setStep(step + 1);
                                                                goToTop();
                                                            }}
                                                        >
                                                            Next
                                                        </button>
                                                    )}
                                                </div>
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
