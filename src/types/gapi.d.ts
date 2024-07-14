declare namespace gapi.client {
    const setToken: (params: {
        access_token: string;
    }) => void;

    // export namespace drive {
    //     const files: {
    //         update: (params: {
    //             fileId: string;
    //             resource: Blob;
    //             fields: string;
    //         }) => Promise<any>;
    //         create: (params: {
    //             resource: {
    //                 name: string;
    //                 mimeType?: string;
    //                 parents?: string[];
    //             };
    //             fields: string;
    //             uploadType?: string;
    //         }) => Promise<any>;
    //         list: (params: {
    //             q: string;
    //             spaces: string;
    //             fields: string;
    //         }) => Promise<any>;
    //     };
    // }
    
}

declare namespace gapi.auth2 {
    const init: (params: {
        clientId: string;
        scope: string;
        }) => Promise<any>;
}