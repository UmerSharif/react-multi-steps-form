import React, { useState, useEffect } from 'react';
import { loadDataService } from './services/loadDataService';
import UserForm from './components/UserForm/UserForm';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { IFormValue } from './interfaces/formValue.interface';
import Ambassador from './components/Ambassador';
import Error404 from './components/Error';
import { loadReCaptcha } from 'react-recaptcha-v3';
import { GoogleReCaptchaSiteKey } from './constant/constants';

const responseToArray = (responseObj: any, prefix: string) => {
  let returnArr: IFormValue[] = [];
  for (const prop in responseObj) {
    returnArr.push({ id: prefix + prop, label: responseObj[prop] });
  }
  return returnArr;
};

function App() {
  const [skills, setSkills] = useState<IFormValue[]>([]);
  const [experiences, setExperiences] = useState<IFormValue[]>([]);
  const [qualifications, setQualifications] = useState<IFormValue[]>([]);
  const [certificates, setCertificates] = useState<IFormValue[]>([]);
  const [inductions, setInductions] = useState<IFormValue[]>([]);
  const [referrerTypes, setReferrerTypes] = useState<IFormValue[]>([]);
  useEffect(() => {
    loadDataService.loadFormValues().then((response: any) => {
      setSkills(responseToArray(response.skills, 'skills'));
      setExperiences(responseToArray(response.experiences, 'experience'));
      setQualifications(
        responseToArray(response.qualifications, 'qualification')
      );
      setCertificates(responseToArray(response.certificates, 'certificate'));
      setInductions(responseToArray(response.inductions, 'induction'));
      setReferrerTypes(responseToArray(response.referrerTypes, 'referrerType'));
      loadReCaptcha(GoogleReCaptchaSiteKey);
    });
  }, []);
  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <UserForm
                  skills={skills}
                  experiences={experiences}
                  qualifications={qualifications}
                  certificates={certificates}
                  inductions={inductions}
                  referrerTypes={referrerTypes}
                />
              );
            }}
          ></Route>

          <Route path="/talent_application">
            <Ambassador
              skills={skills}
              experiences={experiences}
              qualifications={qualifications}
              certificates={certificates}
              inductions={inductions}
              referrerTypes={referrerTypes}
            />
          </Route>

          <Route path="/error_404">
            <Error404/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
