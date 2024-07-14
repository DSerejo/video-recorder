import { useEffect, useState } from "react";
import credentials from "../../config/credentials.json"
import { getAccessToken } from "../../utils/authUtils";
import { createFolder, initializeResumableUpload, listFiles as driveListFiles, listFolderByName, uploadDummyFile } from "../../drive/driveService";
import { signOut } from "../../auth/googleAuth";
import { useAuthDispatch } from "../../context/AuthContext";
const { api_key } = credentials.web;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const FOLDER_NAME = 'VideoStreaming';
const useDrive = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [folderId, setFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<gapi.client.drive.File[]>([]);
  const [resumableUploadId, setResumableUploadId] = useState<string | null>(null);
  const [resumableUploadUrl, setResumableUploadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const dispatch = useAuthDispatch();

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: api_key,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapi.client.setToken({
      access_token: getAccessToken()!
    });
    setInitialized(true);
  }

  useEffect(() => {
    setLoading(true);
    initializeGapiClient();
  }, [gapi]);

  const onAuthError = (error: any) => {
    setError(error);
    signOut();
    dispatch({ type: 'LOGOUT' });
  }
  useEffect(() => {
    if (initialized) {
      console.log('initialized');
      try {
        listFolderByName(FOLDER_NAME).then((folderId) => {
          if (!folderId) {
            createFolder(FOLDER_NAME).then((folderId) => {
              if (folderId) {
                setFolderId(folderId);
              }
            });
          } else {
            setFolderId(folderId);
          }
        }).catch((error) => {
          onAuthError(error);
        });
      } catch (error) {
        onAuthError(error);
      }

    }
  }, [initialized]);

  const listFiles = async (folderId: string) => {
    const files = await driveListFiles(folderId);
    setFiles(files);
    setLoading(false);
  }

  const initializeUpload = async (folderId: string, fileName: string) => {
    const resumableUploadUrl = await initializeResumableUpload(folderId, fileName);
    // setResumableUploadId(resumableUploadId);
    setResumableUploadUrl(resumableUploadUrl);
  }

  return {
    initialized,
    folderId,
    setFiles,
    files,
    loading,
    initializeUpload,
    listFiles,
    error,
    resumableUploadId,
    resumableUploadUrl
  };
}

export default useDrive;