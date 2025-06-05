import React, { useState, useEffect } from 'react';
import {
  Download, Eye, Search, Grid, List,
  FileText, Calendar, User, X
} from 'lucide-react';
import '../styles/ScannedTestsGallery.css';
import { ExamService } from '../services/examService';
import { Exam } from '../Types';
import axiosInstance from '../utils/axiosInstance';

const ScannedTestsGallery = () => {
  const [selectedImage, setSelectedImage] = useState<Exam | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [testImages, setTestImages] = useState<Exam[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const init = async () => {
    const exams = await ExamService.getAll();
    setTestImages(exams);
    console.log('exams', exams.data);
    const subjectsList: string[] = Array.from(
        new Set(exams.map((img: { subject: string; }) => String(img.subject)))
      );
      setSubjects(['all', ...subjectsList]);
      
    // Fetch image URLs once
    const urlMap: Record<string, string> = {};
    await Promise.all(exams.map(async (exam:Exam) => {
      if (exam.file_Url_Exam) {
        const url = await getUrl(exam.file_Url_Exam);
        if (exam.id) {
          urlMap[exam.id] = url;
        }
      }
    }));
    setImageUrls(urlMap);
  };

  const getUrl = async (imageUrl: string) => {
    const response = await axiosInstance.get("/upload/download-url", {
      params: { url: encodeURIComponent(imageUrl) },
    });
    return response.data.url;
  };

  const downloadImage = async (imageUrl: string, filename: string) => {
    const url = await getUrl(imageUrl);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  const filteredImages = testImages.filter(img => {
    const matchesSearch =
      img.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.dateExam?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || img.subject === filterBy;
    return matchesSearch && matchesFilter;
  });

  const openModal = (image: Exam) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    init();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="gallery-container">
      <div className="glass-background"></div>

      {/* Header */}
      <header className="gallery-header">
        <div className="header-content">
          <h1 className="main-title">
            <FileText className="title-icon" />
            גלריית מבחנים סרוקים
          </h1>
          <p className="subtitle">צפה, הורד וחפש במבחנים שלך בקלות</p>
        </div>
      </header>

      {/* Controls */}
      <div className="controls-section">
        <div className="glass-card controls-card">
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="חפש מבחן או מקצוע..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'כל המקצועות' : subject}
                </option>
              ))}
            </select>
          </div>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className={`gallery-grid ${viewMode}`}>
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="test-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-image-container">
              <img
                src={image.id ? imageUrls[image.id] : ''}
                alt={image.dateExam}
                className="card-image"
                loading="lazy"
              />
              <div className="image-overlay">
                <button
                  onClick={() => openModal(image)}
                  className="overlay-btn view-btn-overlay"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => downloadImage(image.file_Url_Exam, `${image.dateExam}.jpg`)}
                  className="overlay-btn download-btn"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="card-content">
              <h3 className="card-title">{image.dateExam}</h3>
              <div className="card-meta">
                <div className="meta-item">
                  <User size={14} />
                  {/* תוכל להוסיף כאן את שם התלמיד בעתיד */}
                </div>
                <div className="meta-item">
                  <Calendar size={14} />
                  <span>{image.dateCreated}</span>
                </div>
              </div>
              <div className="subject-tag">
                {image.subject}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="no-results">
          <FileText size={64} className="no-results-icon" />
          <h3>לא נמצאו מבחנים</h3>
          <p>נסה לשנות את הסינון או החיפוש</p>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>
              <X />
            </button>
            <img
              src={selectedImage.id ? imageUrls[selectedImage.id] : ''}
              alt={selectedImage.dateExam}
              className="modal-image"
            />
            <div className="modal-details">
              <h2>{selectedImage.dateExam}</h2>
              <p>נוצר בתאריך: {selectedImage.dateCreated}</p>
              <p>מקצוע: {selectedImage.subject}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannedTestsGallery;
