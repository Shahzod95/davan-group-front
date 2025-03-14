import React, { useState, useCallback, useEffect } from 'react';
import { MdUpload, MdClose, MdImage, MdCheckCircle } from 'react-icons/md';

export function ImageUploader({
  onImageUpload,
  maxSizeMB = 5,
  imageSrc=null,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  imageType = 'image_url' // 'image_url' yoki 'logo_url'
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageSrc) {
      setPreview(imageSrc);
    }
  }, [imageSrc]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload a valid image.';
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size too large. Maximum size is ${maxSizeMB}MB.`;
    }
    return null;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      onImageUpload?.(file, imageType);
    }
  }, [onImageUpload, imageType]);

  const handleFileSelect = useCallback((e) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      onImageUpload?.(file, imageType);
    }
  }, [onImageUpload, imageType]);

  const removeImage = useCallback(() => {
    setPreview(null);
    setError(null);
    onImageUpload?.(null, imageType);
  }, [onImageUpload, imageType]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' :
          error ? 'border-red-500 bg-red-50' :
          preview ? 'border-green-500 bg-green-50' :
          'border-gray-300 hover:border-gray-400 bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          id={`file-upload-${imageType}`}
        />
        {preview ? (
          <div className="relative">
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
            <button onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              <MdClose size={16} />
            </button>
            <div className="absolute bottom-2 right-2 p-2 bg-green-500 text-white rounded-full">
              <MdCheckCircle size={20} />
            </div>
          </div>
        ) : (
          <label htmlFor={`file-upload-${imageType}`} className="flex flex-col items-center cursor-pointer">
            {error ? <MdClose className="w-12 h-12 text-red-500 mb-4" /> : <MdImage className="w-12 h-12 text-gray-400 mb-4" />}
            <p className="text-gray-700 font-medium mb-2">Drag and drop your {imageType.replace('_', ' ')} here, or click to select</p>
            <p className="text-sm text-gray-500">Supports: {acceptedTypes.map(type => type.split('/')[1]).join(', ')}</p>
            <p className="text-sm text-gray-500">Max size: {maxSizeMB}MB</p>
          </label>
        )}
      </div>
    </div>
  );
}
