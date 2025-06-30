import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik';
import ErrorMsg from '../components/ErrorMsg';
import Loading from '../components/loader';
import BrigadaService from '../services/brigadaService';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { showNotification } from '../components/notifications/notifications';
import SuggestionService from '../services/suggestionService';
import { er } from '@fullcalendar/core/internal-common';
import { Component } from 'lucide-react';
import ComponentHeader from '../components/Header';
interface SuggestionProps {}

interface SuggestionModel {
    name: string;
    email: string;
    suggestion: string;
    comment: string;
    concern: string;
}

const InitialValues: SuggestionModel = {
    name: '',
    email: '',
    suggestion: '',
    comment: '',
    concern: '',
};
const Suggestion: React.FC<SuggestionProps> = ({}) => {
    const [data, setData] = useState<SuggestionModel>(InitialValues);
    const suggestionService = SuggestionService();
    const formikRef = useRef<FormikProps<SuggestionModel>>(null);

    const {
        mutateAsync: create,
        isPending,
        isError,
    } = useMutation({
        mutationKey: [''],
        mutationFn: async (data: any) => await suggestionService.create(data),
        onSuccess: () => {
            setData(InitialValues);
            showNotification('Form submitted successfully', 'success');
            // formikRef.current?.resetForm();
        },
    });

    const validationSchema = Yup.object({
        suggestion: Yup.string(),
        comment: Yup.string(),
        concern: Yup.string(),
    }).test('at-least-one-filled', 'Please provide at least one of: Suggestion, Comment, or Concern.', (values) => {
        return !!(values.suggestion?.trim() || values.comment?.trim() || values.concern?.trim());
    });

    return (
        <div className="xl:px-80 lg:px-20 md:px-16 px-2 md:py-8">
            <ComponentHeader title="Suggestion Form" desktopSize="4xl" />
            <Formik
                // key={data?.id ? data.id : null}
                enableReinitialize
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    const isEmpty = !(values.suggestion?.trim() || values.comment?.trim() || values.concern?.trim());
                    if (values.name.trim() === '') {
                        values.name = 'Anonymous';
                    }

                    if (isEmpty) {
                        showNotification('Please fill in at least one of Suggestion, Comment, or Concern.', 'warning');
                        return;
                    }
                    const c = await create(values);
                    console.log(c.data.affectedRows > 0);
                    if (c.data.affectedRows > 0) {
                        action.resetForm();
                    }
                }}
            >
                {({ values, resetForm }) => {
                    return (
                        <Form className="">
                            {/* Loader Overlay */}

                            {/* Modal Content */}
                            {isError && <ErrorMsg />}
                            {isPending && <Loading />}
                            {!isPending && !isError && (
                                <div className="">
                                    <div className="bg-white shadow-lg rounded-xl border md:px-12 px-6 py-10">
                                        <div className="">
                                            <div className="  ">
                                                <div className="grid lg:grid-cols-2 gap-2">
                                                    {/* Title */}
                                                    <div className="group">
                                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                        <Field
                                                            type="text"
                                                            name="name"
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                        />
                                                    </div>
                                                    <div className="group ">
                                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                                        <Field
                                                            type="text"
                                                            name="email"
                                                            className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none `}
                                                        />
                                                        {/* {errors.email && touched.email && <span className="ml-2 text-xs font-medium text-red-400">Required</span>} */}
                                                    </div>
                                                    <div className="group lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Suggestion</label>
                                                        <Field
                                                            type="text"
                                                            name="suggestion"
                                                            as="textarea"
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                        />
                                                    </div>

                                                    <div className="group lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Comment</label>
                                                        <Field
                                                            type="text"
                                                            name="comment"
                                                            as="textarea"
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                        />
                                                    </div>

                                                    <div className="group lg:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Concerns</label>
                                                        <Field
                                                            type="text"
                                                            name="concern"
                                                            as="textarea"
                                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                {/* Buttons */}
                                                <div className="flex justify-end items-center gap-2 pt-5 mt-4 border-t border-gray-100 ">
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
