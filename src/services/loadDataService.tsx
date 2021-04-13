import axios from 'axios';

export const loadDataService = {
  loadAddress,
  loadFormValues,
  loadAmbassador,
};

function loadAddress(searchString: string) {
  const endPoint = `https://dev-api.apmaterix.com/api/v1/suburbs?search=${searchString}`;
  return axios
    .get(endPoint)
    .then((response) => response.data)
    .then((data) => {
      return data;
    });
}

function loadFormValues() {
  return loadData('/application_forms/talent_applications/form_values');
}

function loadAmbassador(uuid: string | string[], email: string | string[]) {
  return loadData(
    `/application_forms/talent_applications?uuid=${uuid}&email=${email}`
  );
}

function loadData(apiString: string) {
  const endPoint = `${process.env.REACT_APP_API_HOST}${apiString}`;

  return axios
    .get(endPoint)
    .then((response) => response.data)
    .then((data) => {
      return data;
    });
}
