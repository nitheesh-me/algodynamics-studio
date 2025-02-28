interface LogPanelProps {
    logs: string[];
  }
  
  const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
    return (
      <div className="w-96 h-40 overflow-auto p-3 bg-gray-800 text-white rounded-md shadow-lg mt-4">
        <h2 className="font-semibold">Algorithm Steps</h2>
        <ul className="text-sm space-y-1">
          {logs.map((log, idx) => (
            <li key={idx}>➜ {log}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default LogPanel;
  