import { Form, Input } from 'antd'
import CandidateForm from './Components/CandidateForm';
import CandidateTable from './Components/CandidateTable'
import { CandidateProvider } from './CandidateContext';

function App() {
  console.log()
  return (
    <div>
      <CandidateProvider>
        <CandidateForm />
        <CandidateTable />
      </CandidateProvider>
    </div>
  );
}

export default App;
