import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import subjectService from '../services/subjectService';

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getSubjects();
        // Add random colors for UI if not present
        const coloredData = data.map((subject, index) => ({
          ...subject,
          color: getRandomColor(index),
        }));
        setSubjects(coloredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const getRandomColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    return colors[index % colors.length];
  };

  if (loading) return <div className="p-10 text-center">Loading subjects...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Browse Subjects
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            to={`/subject/${subject._id}`}
            state={{ subjectName: subject.name }}
            key={subject._id}
            className={`flex h-40 transform flex-col items-center justify-center rounded-xl p-6 text-white shadow-lg transition hover:scale-105 hover:shadow-xl ${subject.color}`}
          >
            <h2 className="text-2xl font-bold">{subject.code}</h2>
            <p className="mt-2 text-lg font-medium">{subject.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Subjects;
