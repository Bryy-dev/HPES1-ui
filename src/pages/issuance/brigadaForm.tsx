import { Fragment, useMemo, useState } from 'react';
import { DocumentModel } from '../../models/documentModel';
import DocumentService from '../../services/documentService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showNotification, showPromiseNotification } from '../../components/notifications/notifications';
import { Field, Form, Formik } from 'formik';
import { brigadaInitialState, documentInitialState } from '../../states/initialStates';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { BrigadaModel } from '../../models/brigadaModel';
import BrigadaService from '../../services/brigadaService';
import Loading from '../../components/loader';
import ErrorMsg from '../../components/ErrorMsg';
interface DocumentsProps {}

const BrigadaForm: React.FC<DocumentsProps> = ({}) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState<BrigadaModel>(brigadaInitialState);
    const [prepareId, setPrepareId] = useState<number>();
    const [rejectId, setRejectId] = useState<number>();
    const [textToSearch, setTextToSearch] = useState<string>('');
    const brigadaService = BrigadaService();

    const {
        mutateAsync: insert,
        isPending,
        isError,
    } = useMutation({
        mutationKey: [''],
        mutationFn: (data: any) => brigadaService.insert(data),
        onSuccess: () => {
            close();
            setFormData(brigadaInitialState);
        },
    });

    const [images2, setImages2] = useState<any>([]);
    const maxNumber = 69;

    const onChange2 = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
        setImages2(imageList as never[]);
    };

    const onRemove = (index: number) => {
        const image = [...images2];
        const removed = image.splice(index, 1)[0]; // get the removed image
        setImages2(image);

        // Access the removed image ID
        const removedId = removed?.id;

        // Optionally: update some state if needed
    };
    const onclear = async () => {
        const removedIds = images2.map((img: { id: any }) => img.id);
        setImages2([]);
    };
    return (
        <>
            <Formik
                // key={data?.id ? data.id : null}
                enableReinitialize
                initialValues={formData}
                // validationSchema={validationSchema}
                onSubmit={async (values, action) => {
                    const formDataFinal = new FormData();

                    const files = images2.map((image: any) => image.file);
                    formDataFinal.append('email', values.email);
                    formDataFinal.append('name', values.name);
                    formDataFinal.append('company', values.company);
                    formDataFinal.append('contact', values.contact);
                    formDataFinal.append('amount', values.amount);
                    // formData.append('pdf', pdfFile);
                    files.forEach((file: any) => {
                        formDataFinal.append('files[]', file); // Using 'files[]' as the key
                    });

                    const result = insert(formDataFinal);

                    showPromiseNotification(result, {
                        pending: 'Sending Form Please wait..',
                        success: 'Form has been submitted, Thank you',
                        error: 'Failed to send request.',
                    });
                }}
            >
                {({ values, setFieldValue, errors, touched, isValid, isSubmitting, resetForm }) => {
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
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Brigada Eskwela Donor Form</span>
                                        </h2>
                                    </div>

                                    <div className={''}>
                                        <div className="p-2 text-gray-black  lg:px-20 py-10 bg-white lg:shadow-none lg:border-none lg:rounded-none shadow-xl border rounded-lg ">
                                            <div className="grid lg:grid-cols-4 gap-4 lg:px-20 px-4 ">
                                                {/* Title */}
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Name of Donor</label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter title"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Company</label>
                                                    <Field
                                                        type="text"
                                                        name="company"
                                                        placeholder="Enter title"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        placeholder="Enter title"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-2">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Contact Number</label>
                                                    <Field
                                                        type="text"
                                                        name="contact"
                                                        placeholder="Enter title"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>
                                                <div className="group lg:col-span-4">
                                                    <label className="block text-sm font-medium mb-2 text-gray-700">Amount Donated</label>
                                                    <Field
                                                        type="text"
                                                        name="amount"
                                                        placeholder="Enter title"
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                                                    />
                                                </div>

                                                <div className="mt-6  lg:col-span-4">
                                                    <label className="block text-sm font-medium mb-3 text-gray-700">Upload Images (screenshot)</label>
                                                    <ImageUploading multiple value={images2} onChange={onChange2} maxNumber={maxNumber}>
                                                        {({ imageList, onImageUpload, onImageRemove }) => (
                                                            <div className="space-y-4">
                                                                {imageList.length > 0 ? (
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <button
                                                                            onClick={onImageUpload}
                                                                            type="button"
                                                                            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                            Add more
                                                                        </button>
                                                                        <button
                                                                            onClick={() => onclear()}
                                                                            type="button"
                                                                            className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                            Clear all
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        onClick={onImageUpload}
                                                                        className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-8 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="h-12 w-12 text-gray-400 mb-3"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                                            />
                                                                        </svg>
                                                                        <p className="text-gray-600 font-medium mb-1">Drag & drop images here</p>
                                                                        <p className="text-gray-500 text-sm">or click to browse</p>
                                                                    </div>
                                                                )}

                                                                {imageList.length > 0 && (
                                                                    <div className="grid gap-4 sm:grid-cols-3 grid-cols-1 pt-2">
                                                                        {imageList.map((image, index) => (
                                                                            <div key={index} className="relative group overflow-hidden rounded-lg shadow-sm border border-gray-200">
                                                                                <img src={image.dataURL} alt={`Upload ${index + 1}`} loading="lazy" className="w-full h-48 object-cover" />
                                                                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            onImageRemove(index);
                                                                                            onRemove(index);
                                                                                        }}
                                                                                        type="button"
                                                                                        className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
                                                                                    >
                                                                                        <svg
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            className="h-5 w-5 text-red-600"
                                                                                            viewBox="0 0 20 20"
                                                                                            fill="currentColor"
                                                                                        >
                                                                                            <path
                                                                                                fillRule="evenodd"
                                                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                                                clipRule="evenodd"
                                                                                            />
                                                                                        </svg>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </ImageUploading>
                                                </div>
                                            </div>
                                            {/* Buttons */}
                                            <div className="flex justify-end items-center gap-3 pt-5 mt-4 border-t border-gray-100 px-5 lg:px-0">
                                                <button
                                                    className="px-4 py-2 text-gray-600 bg-gray-50 border hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm font-medium flex items-center"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFormData(brigadaInitialState);
                                                        setImages2([]);
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
        </>
    );
};
export default BrigadaForm;
