import { useEffect, useState } from "react";

const useWatchThumbnail = (fileId: string) => {
  const [file, setFile] = useState<gapi.client.drive.File | null>(null);

  useEffect(() => {
    const watchFile = async () => {
      const response = await gapi.client.drive.files.get({ fileId });
      const file = response.result;
      if(file.thumbnailLink) {
        setFile(file);
      }else{
        setTimeout(() => {
            watchFile();
        }, 1000);
      }
    };
    watchFile();
  }, [fileId]);

  return { file, setFile };
};

export default useWatchThumbnail;