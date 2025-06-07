import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

type Props = {
    fileUrl: string;
};

const PDFViewer: React.FC<Props> = ({ fileUrl }: { fileUrl: string }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="h-[80vh] border shadow-sm overflow-hidden">
                <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} theme="light" />
            </div>
        </Worker>
    );
};

export default PDFViewer;
