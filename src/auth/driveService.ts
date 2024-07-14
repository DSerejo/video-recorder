
// const getDriveClient = () => {
//   const accessToken = localStorage.getItem('access_token');
//   if (!accessToken) {
//     throw new Error('No access token found');
//   }

//   const oAuth2Client = new google.auth.OAuth2();
//   oAuth2Client.setCredentials({ access_token: accessToken });

//   return google.drive({ version: 'v3', auth: oAuth2Client });
// };

// export const uploadFile = async (fileName: string, data: Blob, folderId: string) => {
//   const drive = getDriveClient();
//   const fileMetadata = {
//     name: fileName,
//     parents: [folderId],
//   };
//   const media = {
//     mimeType: 'application/octet-stream',
//     body: data,
//   };
//   const response = await drive.files.create({
//     requestBody: fileMetadata,
//     media: media,
//     fields: 'id',
//   });
//   return response.data.id;
// };

// export const listFiles = async (folderId: string) => {
//   const drive = getDriveClient();
//   const response = await drive.files.list({
//     q: `'${folderId}' in parents`,
//     fields: 'files(id, name)',
//   });
//   return response.data.files;
// };