import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import pdfService from '../services/pdfService';
import subjectService from '../services/subjectService';

function SubjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [pdfs, setPdfs] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We need to fetch subject name (optional) and PDFs
    // For now, let's just fetch PDFs. To get subject name, we might need an API or iterate the subjects list again.
    // Ideally, the 'getPdfsBySubject' should return subject details or we fetch subject separately.
    // For MVP, we can fetch all subjects to find name, or just show "Subject Materials".

    // Let's modify getting PDFs to be the primary action
    const fetchData = async () => {
      try {
        if (location.state?.subjectName) {
          setSubjectName(location.state.subjectName);
        }
        const pdfData = await pdfService.getPdfsBySubject(id);
        setPdfs(pdfData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading materials...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        {subjectName ? `${subjectName} ` : ''}Subject Materials
      </h1>

      {pdfs.length === 0 ? (
        <p className="text-gray-600">No PDFs uploaded yet. Be the first to upload!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {pdfs.map((pdf) => (
            <div key={pdf._id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow transition hover:shadow-md">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{pdf.title}</h3>
                <p className="text-sm text-gray-500">Uploaded by: {pdf.user?.name || 'Unknown'}</p>
                <p className="text-xs text-gray-400">{new Date(pdf.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600"
                >
                  Download
                </a>
                <button
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this PDF?')) {
                      try {
                        await pdfService.deletePdf(pdf._id);
                        setPdfs(pdfs.filter(p => p._id !== pdf._id));
                      } catch (err) {
                        alert('Delete failed: ' + err.message);
                      }
                    }
                  }}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubjectDetail;
