import { getAccessToken } from "../utils/authUtils";

export const createFolder = async (folderName: string) => {
    const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
    };

    try {

        const file = await gapi.client.drive.files.create({
            resource: fileMetadata,
            fields: 'id',
        });
        console.log('Folder Id:', file.result.id);
        return file.result.id;
    } catch (err) {
        // TODO(developer) - Handle error
        throw err;
    }
};
export const getFile = async (fileId: string) => {
    const file = await gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType',
    });
    return file.result;
};
export const listFolderByName = async (folderName: string) => {
    const file = await gapi.client.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
        spaces: 'drive',
        fields: 'nextPageToken, files(id, name)',
    });
    if (file.result.files!.length === 0) {
        return null;
    }
    return file.result.files![0].id;
};

export const initializeResumableUpload = async (folderId: string, fileName: string, mimeType: string = 'video/webm') => {
    const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`, {
        method: 'POST',
        body: JSON.stringify({
            name: fileName,
            mimeType: mimeType,
            parents: [folderId],
        }),
        mode: 'cors',
        headers: {
            'Content-Range': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`,
        },
    });
    const locationHeader = response.headers.get('Location');
    if (!locationHeader) {
        throw new Error('Location header is missing in the response');
    }
    // await uploadChunk(locationHeader, null, 0, 0);
    return locationHeader!;
    //   const resumable = await gapi.client.drive.files.create({
    //     resource: {
    //       name: fileName,
    //       mimeType: mimeType,
    //       parents: [folderId],
    //     },
    //     uploadType: 'resumable',
    //     fields: 'id',
    //   });
    //   return resumable.result.id!;
};

export const uploadChunk = async (resumableUploadUrl: string, chunk: Blob | null, startByte: number, endByte: number, end: boolean) => {
    let totalSize = '*';
    if (end) {
        totalSize = (endByte + 1).toString();
    }
    let range = `bytes ${startByte}-${endByte}/${totalSize}`;
    let headers: any = {
        'Content-Length': chunk ? chunk.size.toString() : '0',
        'Content-Range': range,
        'Authorization': `Bearer ${getAccessToken()}`,
    };
    return fetch(resumableUploadUrl, {
        method: 'PUT',
        headers: headers,
        body: chunk,
    });
};

export const listFiles = async (folderId: string, fileName?: string ): Promise<gapi.client.drive.File[]> => {
    const file = await gapi.client.drive.files.list({
        q: `'${folderId}' in parents and trashed=false${fileName ? ` and name='${fileName}'` : ''}`,
        spaces: 'drive',
        fields: 'nextPageToken, files(id, name, thumbnailLink, webViewLink)',
    });
    return file.result.files!;
};

export const uploadDummyFile = async (folderId: string) => {
    const fileMetadata = {
        name: 'test.txt',
        parents: [folderId],
    };
    const file = await gapi.client.drive.files.create({
        resource: fileMetadata,
        fields: 'id',
    });
    return file.result.id;
};