import { faCancel, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { DocumentModel } from '../../models/documentModel';
import DocumentService from '../../services/documentService';
import { useMutation } from '@tanstack/react-query';
import { showNotification, showPromiseNotification } from '../../components/notifications/notifications';
import { documentInitialState } from '../../states/initialStates';
import { Field, Form, Formik } from 'formik';
interface IssuanceProps {}

const IssuancePage: React.FC<IssuanceProps> = ({}) => {
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState<DocumentModel>(documentInitialState);
    const [prepareId, setPrepareId] = useState<number>();
    const [rejectId, setRejectId] = useState<number>();
    const [textToSearch, setTextToSearch] = useState<string>('');
    const documentService = DocumentService();
    const { mutateAsync: insert } = useMutation({
        mutationKey: [''],
        mutationFn: (data: DocumentModel) => documentService.insert(data),
        onMutate: () => {
            // setIsloading(!isLoading);
        },
        onSuccess: () => {
            close();
            setSelectedData(documentInitialState);
        },
        onError: (error: any) => {},
    });
    return (
        <>
            <Formik
                // key={data?.id ? data.id : null}
                enableReinitialize
                initialValues={selectedData}
                // validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    const result = insert(values);
                    showPromiseNotification(result, {
                        pending: 'Sending Request Please wait..',
                        success: 'Request has been sent, wait for an email for the status of your request. thank you',
                        error: 'Failed to send request.',
                    });
                }}
            >
                {({ values, setFieldValue, errors, touched, isValid, isSubmitting }) => {
                    return (
                        <Form className="">
                            {/* Loader Overlay */}

                            {/* Modal Content */}
                            <div className="panel">
                                <div className="mb-5 py-2">
                                    <h2 className="text-4xl font-black text-gray-800 dark:text-white ">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Document Request Form</span>
                                    </h2>
                                </div>

                                <div className={''}>
                                    <div className="p-2 text-gray-black  px-20 py-10">
                                        <div className="grid grid-cols-4 gap-4 px-20">
                                            {/* Title */}
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Enter title"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                />
                                            </div>
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Parent's Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter title"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                />
                                            </div>
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Student's Name</label>
                                                <Field
                                                    type="text"
                                                    name="student_name"
                                                    placeholder="Enter title"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                />
                                            </div>
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Grade Level</label>
                                                <Field
                                                    as="select"
                                                    name="grade_level"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                >
                                                    <option value="">Select grade</option>
                                                    <option value="Grade 1">Grade 1</option>
                                                    <option value="Grade 2">Grade 2</option>
                                                    <option value="Grade 3">Grade 3</option>
                                                    <option value="Grade 4">Grade 4</option>
                                                    <option value="Grade 5">Grade 5</option>
                                                    <option value="Grade 6">Grade 6</option>
                                                </Field>
                                            </div>
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Section</label>
                                                <Field
                                                    as="select"
                                                    name="section"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                >
                                                    <option value="">Select section</option>
                                                    <option value="A">A</option>
                                                    <option value="B">B</option>
                                                    <option value="C">C</option>
                                                    <option value="D">D</option>
                                                    <option value="E">E</option>
                                                    <option value="F">F</option>
                                                </Field>
                                            </div>
                                            {/* Description */}
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Address</label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter title"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                />
                                            </div>
                                            <div className="group col-span-2">
                                                <label className="block text-sm font-medium mb-2 text-gray-700">Type Of Document</label>
                                                <Field
                                                    as="select"
                                                    name="document_type"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                >
                                                    <option value="">Select document</option>
                                                    <option value="Report Card">Report Card</option>
                                                    <option value="Good Moral">Good Moral</option>
                                                    <option value="Form 137">Form 137</option>
                                                    <option value="Form 138">Form 138</option>
                                                </Field>
                                            </div>
                                        </div>
                                        {/* Buttons */}
                                        <div className="flex justify-end items-center gap-3 pt-5 mt-4 border-t border-gray-100">
                                            <button
                                                className="px-4 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    close();
                                                }}
                                            >
                                                Cancel
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
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default IssuancePage;
