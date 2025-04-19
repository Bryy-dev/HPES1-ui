import { faCancel, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IssuanceProps {}

const IssuancePage: React.FC<IssuanceProps> = ({}) => {
    return (
        <div className="panel">
            <h2 className="header-text mb-5">Document Request Form</h2>
            <form className="space-y-4">
                <div>
                    <label>Your Email</label>
                    <input type="email" placeholder="you@example.com" className="form-input" />
                    <span className="text-white-dark text-[11px] inline-block mt-1">We'll send you an email once your documents are ready for pickup. Thanks for your patience!</span>
                </div>
                <div>
                    <label>Your Name</label>
                    <input type="text" placeholder="Enter your full name" className="form-input" />
                </div>
                <div>
                    <label>Student's Name</label>
                    <input type="text" placeholder="Enter the student's name" className="form-input" />
                </div>

                {/* Separated Grade and Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Grade Level</label>
                        <select className="form-input">
                            <option value="">Select grade</option>
                            <option value="Grade 1">Grade 1</option>
                            <option value="Grade 2">Grade 2</option>
                            <option value="Grade 3">Grade 3</option>
                            <option value="Grade 4">Grade 4</option>
                            <option value="Grade 5">Grade 5</option>
                            <option value="Grade 6">Grade 6</option>
                        </select>
                    </div>
                    <div>
                        <label>Section</label>
                        <select className="form-input">
                            <option value="">Select section</option>
                            <option value="Section A">Section A</option>
                            <option value="Section B">Section B</option>
                            <option value="Section C">Section C</option>
                            <option value="Section D">Section D</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label>Home Address</label>
                    <input type="text" placeholder="Enter address" className="form-input" />
                </div>

                <div>
                    <label>Requested Document</label>
                    <select className="form-input">
                        <option value="">Choose a document</option>
                        <option value="Form 137">Form 137</option>
                        <option value="Handbook">Handbook</option>
                        <option value="Manual">Manual</option>
                        <option value="Report Card">Report Card</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button type="submit" className="btn btn-outline-success btn-sm !mt-6">
                        <FontAwesomeIcon icon={faUpload} size="lg" className="text-green-600 pe-2 pt-0 text-center" /> Submit Request
                    </button>
                    <button type="submit" className="btn btn-outline-dark btn-sm !mt-6 text-center">
                        <FontAwesomeIcon icon={faCancel} size="lg" className="text-gray-600 pe-2 pt-0 text-center" />
                        <span className="text-xs">Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default IssuancePage;
