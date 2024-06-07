import { memo } from "react";
import "./App.css";
import NewsPage from './NewsPage';
const App = memo(function App() {
  return <NewsPage />;
});
export default App;