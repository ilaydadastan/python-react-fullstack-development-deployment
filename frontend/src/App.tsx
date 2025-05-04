import './App.css'
import CampaignList from "./components/campaign/CampaignList.tsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CampaignDetail from "./components/campaign/CampaignDetail.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<CampaignList/>}/>
                <Route path="/campaign/:id" element={<CampaignDetail/>}/>
            </Routes>
        </Router>
    )
}

export default App
