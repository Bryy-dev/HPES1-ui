import { Field, Form, Formik, useFormikContext } from 'formik';
import ErrorMsg from '../components/ErrorMsg';
import Loading from '../components/loader';
import BrigadaService from '../services/brigadaService';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { showNotification } from '../components/notifications/notifications';
import SuggestionService from '../services/suggestionService';
interface SuggestionProps {}

const Suggestion: React.FC<SuggestionProps> = ({}) => {
    const [data, setData] = useState<{ name: string; email: string; suggestion: string }>({ name: '', email: '', suggestion: '' });
    const suggestionService = SuggestionService();
    const {
        mutateAsync: create,
        isPending,
        isError,
    } = useMutation({
        mutationKey: [''],
        mutationFn: (data: any) => suggestionService.create(data),
        onSuccess: () => {
            showNotification('Form submitted successfully', 'success');
            setData({ name: '', email: '', suggestion: '' });
        },
    });
    const validationSchema = Yup.object().shape({
        suggestion: Yup.string().required('Required'),
    });
    const [onsubmit, setOnSubmit] = useState<boolean>(false);

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
                    return (
                        <Form className="">
                            {/* Loader Overlay */}

                            {/* Modal Content */}
                            {isError && <ErrorMsg />}
                            {isPending && <Loading />}
                            {!isPending && !isError && (
                                <div className="lg:panel px-2">
                                    <div className="mb-5 lg:py-2 text-center">
                                        <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white ">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Comment & Suggestion Form</span>
                                        </h2>
                                    </div>

                                    <div className={''}>
                                        <div className="p-2 text-gray-black  lg:px-20 py-10 bg-white lg:shadow-none lg:border-none lg:rounded-none shadow-xl border rounded-lg ">
                                            <div className="grid lg:grid-cols-1 gap-4 lg:px-20 px-4 ">
                                                {/* Title */}
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Comment & Suggestion</label>
                                                    <Field
                                                        type="text"
                                                        name="suggestion"
                                                        as="textarea"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
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

export default Suggestion;
