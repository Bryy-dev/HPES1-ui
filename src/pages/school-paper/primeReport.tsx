import React, { useState } from 'react';

import { EmbedPDF } from '@simplepdf/react-embed-pdf';
import PDFViewer from '../../components/helper/pdfViewer';
interface PrimeReportProps {}

const PrimeReport: React.FC<PrimeReportProps> = ({}) => {
    return (
        <div>
            {/* <iframe src={`https://hpdpes1.uploads-1f3.workers.dev/1749307107690-Pagtugon-sa-Ekonomiya-ng-mga-Lalawigan-sa-Rehiyon`} width="100%" height="600px" title="PDF Viewer" /> */}
            <PDFViewer fileUrl="https://hpdpes1.uploads-1f3.workers.dev/1749307107690-Pagtugon-sa-Ekonomiya-ng-mga-Lalawigan-sa-Rehiyon" />
        </div>
    );
};

export default PrimeReport;
