import axios, { AxiosResponse } from 'axios';

export const saveDataService = {
  postFormDataService,
  updateFormDataService,
  uploadFileDataService,
};

function uploadFileDataService(
  formdata: any,
  uuid: string,
  email: string
): Promise<any> {
  const endPoint = `${process.env.REACT_APP_API_HOST}/application_forms/talent_applications?uuid=${uuid}&email=${email}`;
  return axios({
    method: 'patch',
    url: endPoint,
    data: formdata,
  })
    .then((res: AxiosResponse<any>) => {
      // created
      switch (res.status) {
        case 200:
        case 201:
          return res.data;
        case 500:
          throw new Error(
            'Some errors were encountered during save. Please close this dialog and review.'
          );
        case 404:
        case 422:
          throw new Error(res.statusText);
        default:
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      // Todo: log error here
    });
}

function updateFormDataService(
  formdata: any,
  contentType: string,
  uuid: string,
  email: string
): Promise<any> {
  const endPoint = `${process.env.REACT_APP_API_HOST}/application_forms/talent_applications?uuid=${uuid}&email=${email}`;

  return axios({
    method: 'patch',
    url: endPoint,
    data: formdata,
    headers: { 'Content-Type': contentType },
  })
    .then((res: AxiosResponse<any>) => {
      // created
      switch (res.status) {
        case 200:
        case 201:
          return res.data;
        case 500:
          throw new Error(
            'Some errors were encountered during save. Please close this dialog and review.'
          );
        case 404:
        case 422:
          throw new Error(res.statusText);
        default:
      }
    })
    .then((data) => {
      return data;
    });
}

function postFormDataService(formdata: FormData): any {
  const endPoint = `${process.env.REACT_APP_API_HOST}/application_forms/talent_applications`;

  return axios({
    method: 'post',
    url: endPoint,
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res: AxiosResponse<any>) => {
      // created
      switch (res.status) {
        case 200:
        case 201:
          return res.data;
        case 500:
          throw new Error(
            'Some errors were encountered during save. Please close this dialog and review.'
          );
        case 422:
          throw new Error(res.statusText);
        default:
      }
    })
    .then((data) => {
      return data;
    });
}
