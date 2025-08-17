import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { importVenues } from '../utils/importVenues';

const ImportVenuesButton: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImport = async () => {
    setIsImporting(true);
    setImportStatus('idle');
    
    try {
      await importVenues();
      setImportStatus('success');
    } catch (error) {
      console.error('Import failed:', error);
      setImportStatus('error');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleImport}
        disabled={isImporting}
        className={`
          inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
          ${isImporting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
          text-white
        `}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isImporting ? 'Importing...' : 'Import Venues Data'}
      </button>
      
      {importStatus === 'success' && (
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-5 w-5 mr-1" />
          <span className="text-sm">Import successful!</span>
        </div>
      )}
      
      {importStatus === 'error' && (
        <div className="flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-1" />
          <span className="text-sm">Import failed. Check console for details.</span>
        </div>
      )}
    </div>
  );
};

export default ImportVenuesButton;