
import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import useDrive from '../../hooks/gapi/useDrive';
import useWatchThumbnail from '../../hooks/gapi/useWatchThumbnail';

const Gallery: React.FC = () => {
    const { initialized, files, setFiles, loading, listFiles, folderId } = useDrive();
    const [watchFile, setWatchFile] = useState<gapi.client.drive.File | null>(null);
    const defaultThumbnail = 'https://www.jgsc.k12.in.us/components/com_easyblog/themes/wireframe/images/placeholder-video.png';
                            
    useEffect(() => {
        if (folderId) {
            listFiles(folderId);
        }
    }, [folderId]);

    useEffect(() => {
        if(files && files.length > 0) {
            const file = files[0];
            if(!file.thumbnailLink || file.thumbnailLink == defaultThumbnail) {
                setWatchFile(file);
            }
        }
    }, [files]);

    useEffect(() => {
        if(watchFile) {
            const getFile = async () => {
                const response = await gapi.client.drive.files.get({ fileId: watchFile.id!, fields: 'thumbnailLink' });
                const file = response.result;
                if(file.thumbnailLink) {
                    files[0].thumbnailLink = file.thumbnailLink;
                    setFiles([]);
                    setTimeout(() => {
                        setFiles(files);
                    }, 10);
                }else{
                    setTimeout(() => {
                        getFile();
                    }, 1000);
                }
            }
            getFile();
        }
    }, [watchFile]);
    return (
        <div className="gallery-container">
            {loading ? <p>Loading...</p> : (

                files && files.length == 0 ? (
                    <p>You haven't uploaded any files yet</p>
                ) : (
                    <div className='gallery'>{
                        files.map((file) => {
                            if(!file.thumbnailLink) {
                                file.thumbnailLink = defaultThumbnail;
                            }
                            const key = file.id! + Date.now()
                            return (
                                <div key={key} className='gallery-item'>
                                    <a href={file.webViewLink} target='_blank'>
                                        <img 
                                            src={file.thumbnailLink} 
                                            alt={file.name} />
                                    </a>
                                    <div className='gallery-item-info'>
                                        {file.name}
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                )
            )}
        </div>
    );
};

export default Gallery;