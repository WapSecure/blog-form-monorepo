import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { twMerge } from 'tailwind-merge';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  className 
}) => {
  return (
    <div className={twMerge('grid grid-cols-1 md:grid-cols-2 gap-4 h-full', className)}>
      <div className="h-full">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your post in Markdown..."
        />
      </div>
      <div className="prose max-w-none p-4 border rounded-lg overflow-auto h-full">
        <ReactMarkdown>{value || '*Nothing to preview*'}</ReactMarkdown>
      </div>
    </div>
  );
};