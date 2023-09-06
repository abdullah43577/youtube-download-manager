import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { SERVER } from './components/helper';
import DownloadInfo from './components/DownloadInfo';
import { createContext } from 'react';

export const DownloadContext = createContext();

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [btnTxt, setBtnTxt] = useState('Download');
  const [delayedInputField, setDelayedInputField] = useState('');
  const [downloadInfo, setDownloadInfo] = useState({});
  let timeout;
  const test = 'https://youtu.be/BWtjgCpMNfA?si=FgCENRuLTyplPKc0';

  useEffect(() => console.log(inputValue), [inputValue]);

  const handleInputChange = async (e) => {
    const url = e.target.value;
    setInputValue(url);

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDelayedInputField(url);
      console.log('this was delayed', delayedInputField);
    }, 5000);
  };

  useEffect(() => {
    fetchVideoDetails();
  }, [delayedInputField]);

  const fetchVideoDetails = async function () {
    try {
      setBtnTxt('Fetching...');
      const res = await fetch(`${SERVER}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: inputValue }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setBtnTxt('Download');
    }
  };

  return (
    <DownloadContext.Provider value={{ downloadInfo }}>
      <main className="max-w-[1000px] h-screen mx-auto">
        <NavBar />
        <h1 className="font-bold text-4xl text-center mt-48">
          Youtube Video <span className="text-[#ff165a]">Downloader</span>
        </h1>
        <h1 className="font-bold text-base my-3 text-center">Downloading Youtube Videos Has Never Been Easier!</h1>
        <form>
          <input type="text" className="w-[700px] flex mx-auto p-3 rounded-md outline-none text-[#242424] my-3" onChange={handleInputChange} />
          <div className="flex justify-center items-center my-3 gap-4">
            <button className="bg-[#ff165a] px-3 py-2 rounded-md" onClick={fetchVideoDetails}>
              {btnTxt}
            </button>
            <button className="bg-[#ffebee] px-3 py-2 rounded-md text-black">Paste from clipboard</button>
          </div>
        </form>
        <DownloadInfo />
      </main>
      <Outlet />
    </DownloadContext.Provider>
  );
}
