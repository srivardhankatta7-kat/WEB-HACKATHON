import React, { useState, useRef } from 'react';
import type { FarmAttachment } from '../types/crop';
import { uploadFileToCloudStorage, deleteFileFromCloudStorage } from '../services/firebase';
import {
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Trash2,
  ExternalLink,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface CloudStorageUploaderProps {
  auditId: string;
  attachments?: FarmAttachment[];
  onAttachmentsChange: (updatedAttachments: FarmAttachment[]) => void;
  maxFiles?: number;
}

export const CloudStorageUploader: React.FC<CloudStorageUploaderProps> = ({
  auditId,
  attachments = [],
  onAttachmentsChange,
  maxFiles = 5
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (attachments.length + files.length > maxFiles) {
      setErrorMessage(`Maximum ${maxFiles} attachments allowed per farm audit.`);
      return;
    }

    setErrorMessage(null);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      const newAttachments: FarmAttachment[] = [...attachments];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 10MB limit
        if (file.size > 10 * 1024 * 1024) {
          setErrorMessage(`File "${file.name}" exceeds 10MB limit.`);
          continue;
        }

        const attachment = await uploadFileToCloudStorage(file, auditId, (progress) => {
          setUploadProgress(progress);
        });

        newAttachments.push(attachment);
      }

      onAttachmentsChange(newAttachments);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Failed to upload to Cloud Storage: ${msg}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAttachment = async (attachmentToDelete: FarmAttachment) => {
    try {
      await deleteFileFromCloudStorage(attachmentToDelete);
      const filtered = attachments.filter((att) => att.id !== attachmentToDelete.id);
      onAttachmentsChange(filtered);
    } catch (err) {
      console.error('Failed to remove attachment', err);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-3">
      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center transition cursor-pointer ${
          isUploading
            ? 'border-emerald-400 bg-emerald-50/50'
            : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center justify-center gap-1.5">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-slate-800">
            {isUploading ? 'Uploading to Firebase Cloud Storage...' : 'Upload Soil Report or Field Photo'}
          </div>
          <div className="text-[11px] text-slate-500">
            Attach official Soil Health Card (PDF), drone/leaf photos, or lab certificates (Max 10MB)
          </div>
        </div>

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-3 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="text-[11px] text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-2 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-emerald-600" />
              Cloud Storage Attachments ({attachments.length}/{maxFiles})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map((att) => {
              const isImage = att.mimeType.startsWith('image/');
              return (
                <div
                  key={att.id}
                  className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs hover:border-slate-300 transition"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                      {isImage ? (
                        <ImageIcon className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <FileText className="w-4 h-4 text-blue-700" />
                      )}
                    </div>
                    <div className="truncate text-left">
                      <div className="text-xs font-semibold text-slate-800 truncate" title={att.name}>
                        {att.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                        <span>{formatFileSize(att.size)}</span>
                        <span>•</span>
                        <span className="text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Cloud
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-md transition"
                      title="View / Download from Cloud"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteAttachment(att)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer"
                      title="Delete from Cloud Storage"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
