import { useContext } from 'react';
import { DownloadContext } from '../App';

export default function DownloadInfo() {
  const { downloadInfo } = useContext(DownloadContext);
  console.log(downloadInfo);

  return <div>this is the download info</div>;
}
